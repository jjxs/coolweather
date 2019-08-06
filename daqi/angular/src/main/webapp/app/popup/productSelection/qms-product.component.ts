import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiParseLinks, JhiAlertService } from 'ng-jhipster';
import { Message } from 'primeng/components/common/api';
import { IQmsProduct } from 'app/shared/model/qms-product.model';
import { Principal } from 'app/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ITEMS_PER_PAGE } from 'app/shared';
import { QmsProductService } from './qms-product.service';
import { LocalStorageService } from 'ngx-webstorage';
@Component({
    selector: 'jhi-qms-product',
    templateUrl: './qms-product.component.html',
    styleUrls: [
        './product.scss'
    ]
})
export class QmsProductComponent implements OnInit, OnDestroy {
    currentAccount: any;
    qmsProducts: IQmsProduct[];
    qmsProductsBack: IQmsProduct[];
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
    msgs: Message[] = [];
    //产品编码
    productNum: any;
    //物料编码
    materielCd: any;
    //物料名称
    materielName: any;
    //备注
    remark: any;

    //输入框产品编号
    productNumIn: any;
    //输入框物料编码
    materielCdIn: any;
    //输入框物料名称
    materielNameIn: any;
    //输入框产品批号
    productBatchIn: any;
    //方正画面的物料id
    materielId="1";
    sp = "";

    constructor(
        private qmsProductService: QmsProductService,
        private parseLinks: JhiParseLinks,
        private jhiAlertService: JhiAlertService,
        private principal: Principal,
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private eventManager: JhiEventManager,
        public activeModal: NgbActiveModal,
        private localStorage: LocalStorageService,

    ) {
        this.page = 1;
        this.queryCount = 0;
        this.itemsPerPage = 6;
        this.predicate = 'id';
        this.productNumIn = "";
        this.materielCdIn = "";
        this.materielNameIn = "";
        this.productBatchIn = "";

    }

    loadAll() {
        this.qmsProductService
            .query({
                productNumIn: this.productNumIn,
                materielCdIn: this.materielCdIn,
                materielNameIn: this.materielNameIn,
                productBatchIn: this.productBatchIn,
                materielId:this.materielId,
                sp:this.sp,
                page: this.page - 1,
                size: this.itemsPerPage,
                sort: this.sort()
            })
            .subscribe(
                (res: HttpResponse<IQmsProduct[]>) => this.paginateQmsProducts(res.body, res.headers),
                (res: HttpErrorResponse) => this.onError(res.message)
            );
            
    }

    // 清空检索条件
    emptyInfo() {
        if (this.sp == 'sp2') {
            this.materielCdIn = '';
            this.materielNameIn = '';
            this.productBatchIn = '';
            this.loadAll();
        }else if (this.sp == 'sp3') {
            this.productNumIn = '';
            this.materielCdIn = '';
            this.materielNameIn = '';
            this.loadAll();
        }else if(this.sp == 'sp1.1'){
            this.productBatchIn = '';
            this.productNumIn = '';
            this.loadAll();
        }else if(this.sp == 'sp1.2'){
            this.productBatchIn = '';
            this.productNumIn = '';
            this.loadAll();
        }else{
            this.productNumIn = '';
            this.materielCdIn = '';
            this.materielNameIn = '';
            this.productBatchIn = '';
            this.loadAll();
        }
        
    }

    //点击删除按钮触发时间
    delete(id, materielId) {
        console.log(materielId);
        this.qmsProductService.deleteCheck({ deletecheck: materielId }).subscribe(data => {
            if (data.body === 1) {
                // alert("不能删除");
                this.msgs.push({ severity: 'error', summary: '提示', detail: '该数据还在被使用,不能删除!' });
            } else {
                this.router.navigate(['./', { outlets: { popup: 'product/' + id + '/delete' } }], { relativeTo: this.activatedRoute });
            }

        });


    }

    loadCarsLazy(event) {
        this.page = event.first / this.itemsPerPage + 1;
        this.loadAll();
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

        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInQmsProducts();
    }

    /**
     * 返回
     * @param record
     */
    goBack(record?: any) {
        this.activeModal.close(record);
    }

    /**
    * 确认
    */
    selected() {
        // 错误消息赋空
        this.msgs = [];
        // 判断是否选择数据
        if (this.qmsProductsBack.length === 0) {
            // 错误消息提示
            this.msgs.push({ severity: 'error', summary: 'error', detail: '请选择数据' });
        } else {
            this.localStorage.store('qmsSupplierClassSession', this.qmsProductsBack);
            // 保存返回到上一页
            this.activeModal.close(this.qmsProductsBack);
        }
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
        console.log(this.qmsProducts);
        if(this.sp=='sp1.1'){
            if(this.qmsProducts.length!=0){
                this.materielNameIn = this.qmsProducts[0]["materielName"]
                this.materielCdIn = this.qmsProducts[0]["materielCd"]
            }
            
        }
        if(this.sp=='sp1.2'){
            if(this.qmsProducts.length!=0){
                this.materielNameIn = this.qmsProducts[0]["materielName"]
                this.materielCdIn = this.qmsProducts[0]["materielCd"]
            }
            
        }
        if (data.length > 0) {
            this.qmsProductsBack = data[0];
        }
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
