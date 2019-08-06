import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiParseLinks, JhiAlertService } from 'ng-jhipster';
import { Message } from 'primeng/components/common/api';
import { IQmsProduct } from 'app/shared/model/qms-product.model';
import { Principal } from 'app/core';
import { QmsMaterielService } from 'app/crrc/basics/materiel/qms-materiel.service'
import { ITEMS_PER_PAGE } from 'app/shared';
import { QmsProductService } from './qms-product.service';

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
    msgs1: Message[] = [];
    urldata = "";
    //产品编码
    productNum:any;
    //物料编码
    materielCd:any;
    //物料名称
    materielName:any;
    //备注
    remark:any;

    //输入框产品编号
    productNumIn:any;
    //输入框物料编码
    materielCdIn:any;
    //输入框物料名称
    materielNameIn:any;
    loading = false;

    constructor(
        private qmsProductService: QmsProductService,
        private parseLinks: JhiParseLinks,
        private jhiAlertService: JhiAlertService,
        private principal: Principal,
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private eventManager: JhiEventManager,
        private qmsMaterielService:QmsMaterielService,
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
        this.qmsMaterielService.getMasterList({ kbnCd: 'M14' })
        .subscribe(data => {
            this.urldata = data[0]["label"]
        });
        this.qmsProductService
            .query({
                productNumIn: this.productNumIn,
                materielCdIn: this.materielCdIn,
                materielNameIn: this.materielNameIn,
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
        this.productNumIn = '';
        this.materielCdIn = '';
        this.materielNameIn = '';
        this.loadAll();
    }

    //点击删除按钮触发时间
    delete(id,materielId,productNum) {
        console.log(materielId);
        this.qmsProductService.deleteCheck({ deletecheck: materielId, productNum:productNum}).subscribe(data => {
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

    openFile() {
        //    console.log(this.urldata);
           window.location.href = this.urldata+'/file/excel/product.xls';
        }

    //Excel数据导入
    ImportExcel() {
        this.msgs1 = [];
        this.msgs = [];
        document.getElementById('file').click();
    }
    //数据导入
    upload(event: any) {
        this.loading = true;
        
        // 如果没有文件上传则返回
        if (event.target.files.length === 0) {

            return;
        } else {
            this.qmsProductService.importExcelFile('/upload', event.target.files).subscribe(
                data => {
                    this.loading = false;
                    if (data.status === 'success') {
                        if (data.flag === "1") {
                            this.msgs1.push({ severity: 'success', summary: '成功', detail: data.message });
                        } else {
                            this.msgs.push({ severity: 'error', summary: '', detail: data.message1 });
                            this.msgs.push({ severity: 'error', summary: '', detail: data.message2 });
                        }

                    } else {
                        this.msgs.push({ severity: 'error', summary: 'error', detail: data.message });
                    }
                    // 清空excel
                    event.target.value = '';
                    this.loadAll();
                },
                error => {
                    // 清空excel
                    event.target.value = '';
                }
            );
        }
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
        this.productNumIn = "";
        this.materielCdIn = "";
        this.materielNameIn = "";
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInQmsProducts();
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

    private paginateQmsProducts(data: IQmsProduct[], headers: HttpHeaders) {
        this.links = this.parseLinks.parse(headers.get('link'));
        this.totalItems = parseInt(headers.get('X-Total-Count'), 10);
        this.queryCount = this.totalItems;
        this.qmsProducts = data;
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
