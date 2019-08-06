import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, from } from 'rxjs';
import { JhiEventManager, JhiParseLinks, JhiAlertService } from 'ng-jhipster';
import { MessageService } from 'primeng/api';
import { IQmsProduct } from 'app/shared/model/qms-product.model';
import { Principal } from 'app/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ITEMS_PER_PAGE } from 'app/shared';
import { QmsProductService } from './qms-product.service';
import { QmsProductComponent } from 'app/popup/productSelection/qms-product.component'
import { QmsMaterielService } from 'app/crrc/basics/materiel/qms-materiel.service';
@Component({
    selector: 'jhi-qms-product',
    templateUrl: './qms-product.component.html',
    styleUrls: [
        './product.scss'
    ],
    providers: [MessageService]
})
export class QmsProductComponent1 implements OnInit, OnDestroy {
    currentAccount: any;
    qmsProducts: IQmsProduct[];
    error: any;
    success: any;
    eventSubscriber: Subscription;
    routeData: any;
    links: any;
    totalItems: any;
    queryCount: any;
    itemsPerPage: any;
    page: any;
    predicate: any;
    previousPage: any;
    reverse: any;
    productRelation = '1';
    //物料编码
    tabDataProduct = [];
    tabDataTwoProduct = [];
    tabDataThreeProduct = [];
    //是否LIST
    testList = [];

    constructor(
        private qmsProductService: QmsProductService,
        private parseLinks: JhiParseLinks,
        private jhiAlertService: JhiAlertService,
        private principal: Principal,
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private eventManager: JhiEventManager,
        private modalService: NgbModal,
        private qmsMaterielService: QmsMaterielService
    ) {
        this.itemsPerPage = ITEMS_PER_PAGE;
        this.routeData = this.activatedRoute.data.subscribe(data => {
            this.page = data.pagingParams.page;
            this.previousPage = data.pagingParams.page;
            this.reverse = data.pagingParams.ascending;
            this.predicate = data.pagingParams.predicate;

        });

    }

    loadAll() {
        //正向追溯产品信息
        this.qmsProductService
            .query({
                productRelation: this.productRelation,
                page: this.page - 1,
                size: this.itemsPerPage,
                sort: this.sort()
            })
            .subscribe(
                (res: HttpResponse<IQmsProduct[]>) => this.paginateQmsProducts(res.body, res.headers),
                (res: HttpErrorResponse) => this.onError(res.message)
            );
         //正向追溯生产信息
            this.qmsProductService
            .queryTwo({
                productRelation: this.productRelation,
                page: this.page - 1,
                size: this.itemsPerPage,
                sort: this.sort()
            })
            .subscribe(
                (res: HttpResponse<IQmsProduct[]>) => this.paginateQmsProductsTwo(res.body, res.headers),
                (res: HttpErrorResponse) => this.onError(res.message)
            );

            //正向追溯到货信息
            this.qmsProductService
            .queryThree({
                productRelation: this.productRelation,
                page: this.page - 1,
                size: this.itemsPerPage,
                sort: this.sort()
            })
            .subscribe(
                (res: HttpResponse<IQmsProduct[]>) => this.paginateQmsProductsThree(res.body, res.headers),
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }

    test() {

    }

    loadPage(page: number) {
        if (page !== this.previousPage) {
            this.previousPage = page;
            this.transition();
        }
    }

    transition() {
        this.router.navigate(['/qms-product'], {
            queryParams: {
                page: this.page,
                size: this.itemsPerPage,
                sort: this.predicate + ',' + (this.reverse ? 'asc' : 'desc')
            }
        });
        this.loadAll();
    }

    clear() {
        this.page = 0;
        this.router.navigate([
            '/qms-product',
            {
                page: this.page,
                sort: this.predicate + ',' + (this.reverse ? 'asc' : 'desc')
            }
        ]);
        this.loadAll();
    }

    ngOnInit() {
        //生产方式
        this.qmsMaterielService.getMasterList({ kbnCd: 'M04' })
            .subscribe(data => {
                this.testList = data
            })
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInQmsProducts();
    }

    loadCarsLazy(event) {
        this.page = event.first / this.itemsPerPage + 1;
        this.loadAll();
    }

    // 打开产品批次选择
    goToBatch(batch, sp2) {
        if (batch == undefined) {
            batch = '';
        }
        const toBatch = this.modalService.open(QmsProductComponent as Component, { backdrop: 'static', keyboard: false, size: 'lg' })
        toBatch.componentInstance.productNumIn = batch;
        toBatch.componentInstance.sp = sp2
        toBatch.result.then(
            (result) => {
                if (result !== undefined) {
                    console.log(result)
                }
            }
        );
    }

    // 打开产品编号选择
    goToNo(NO, sp3) {
        if (NO == undefined) {
            NO = '';
        }
        const toBatch = this.modalService.open(QmsProductComponent as Component, { backdrop: 'static', keyboard: false, size: 'lg' })
        toBatch.componentInstance.productBatchIn = NO;
        toBatch.componentInstance.sp = sp3;
        toBatch.result.then(
            (result) => {
                if (result !== undefined) {
                    console.log(result)
                }
            }
        );
    }

    // 打开产品选择SP1.1
    goToSP1(id, sp1) {
        const toBatch = this.modalService.open(QmsProductComponent as Component, { backdrop: 'static', keyboard: false, size: 'lg' })
        toBatch.componentInstance.materielId = id;
        toBatch.componentInstance.sp = sp1
        toBatch.result.then(
            (result) => {
                if (result !== undefined) {
                    console.log(result)
                }
            }
        );
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IQmsProduct) {
        return item.id;
    }

    registerChangeInQmsProducts() {
        this.eventSubscriber = this.eventManager.subscribe('qmsProductListModification', response => this.loadAll());
    }

    sort() {
        const result = [this.predicate + ',' + (this.reverse ? 'asc' : 'desc')];
        if (this.predicate !== 'id') {
            result.push('id');
        }
        return result;
    }

    private paginateQmsProducts(data: any, headers: HttpHeaders) {
        this.links = this.parseLinks.parse(headers.get('link'));
        this.totalItems = parseInt(headers.get('X-Total-Count'), 10);
        this.queryCount = this.totalItems;
        this.qmsProducts = data;
        if (data.length > 0) {
            this.tabDataProduct = data[0];
            
        }
    }

    private paginateQmsProductsTwo(data: any, headers: HttpHeaders) {
        this.links = this.parseLinks.parse(headers.get('link'));
        this.totalItems = parseInt(headers.get('X-Total-Count'), 10);
        this.queryCount = this.totalItems;
        
        if (data.length > 0) {
            this.tabDataTwoProduct = data[0];
            
        }
    }

    private paginateQmsProductsThree(data: any, headers: HttpHeaders) {
        this.links = this.parseLinks.parse(headers.get('link'));
        this.totalItems = parseInt(headers.get('X-Total-Count'), 10);
        this.queryCount = this.totalItems;
        
        if (data.length > 0) {
            this.tabDataThreeProduct = data[0];
            
        }
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
