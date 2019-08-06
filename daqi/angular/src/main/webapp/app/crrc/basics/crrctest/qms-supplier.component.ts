import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiParseLinks, JhiAlertService } from 'ng-jhipster';
import { QmsMaterielService } from 'app/crrc/basics/materiel/qms-materiel.service'
import { IQmsSupplier } from 'app/shared/model/qms-supplier.model';
import { Principal } from 'app/core';
import { Message } from 'primeng/components/common/api';
import { ITEMS_PER_PAGE } from 'app/shared';
import { QmsSupplierService } from './qms-supplier.service';

@Component({
    selector: 'jhi-qms-supplier',
    templateUrl: './qms-supplier.component.html',
    styleUrls: [
        './supplierInformation.scss'
    ]
})
export class QmsSupplierComponent implements OnInit, OnDestroy {
    currentAccount: any;
    qmsSuppliers: IQmsSupplier[];
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
    // 供应商编码条件检索
    bianMa = '';
    // 供应商名称条件检索
    gongName = '';
    //删除check
    deletecheck = '';
    msgs: Message[] = [];
    msgs1: Message[] = [];
    urldata = "";
    loading = false;
    //改装过的带换行的字符串
    

    constructor(
        private qmsSupplierService: QmsSupplierService,
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
        this.qmsSupplierService
            .query({
                bianMa: this.bianMa,
                gongName: this.gongName,
                page: this.page - 1,
                size: this.itemsPerPage,
                sort: this.sort()
            })
            .subscribe(
                (res: HttpResponse<IQmsSupplier[]>) => this.paginateQmsSuppliers(res.body, res.headers),
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }

    // 清空检索条件
    emptyInfo() {
        this.bianMa = '';
        this.gongName = '';
        this.loadAll();
    }

    loadPage(page: number) {
        if (page !== this.previousPage) {
            this.previousPage = page;
            this.transition();
        }
    }

    transition() {
        this.router.navigate(['/supplier'], {
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
            '/qms-supplier',
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
        this.registerChangeInQmsSuppliers();
    }
    //点击删除按钮触发时间
    delete(id, supplierCd) {
        this.deletecheck = id;
        this.qmsSupplierService.deleteCheck({ deletecheck: this.deletecheck }).subscribe(data => {
            if (data.body === 1) {
                // alert("不能删除");
                this.msgs1.push({ severity: 'error', summary: '提示', detail: '该数据还在被使用,不能删除!' });
            } else {
                this.router.navigate(['./', { outlets: { popup: 'supplier/' + id + '/delete' } }], { relativeTo: this.activatedRoute });
            }

        });

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
            this.qmsSupplierService.importExcelFile('/upload', event.target.files).subscribe(
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

    openFile() {
        //    console.log(this.urldata);
           window.location.href = this.urldata+'/file/excel/supplier.xls';
        }

    loadCarsLazy(event) {
        this.page = event.first / this.itemsPerPage + 1;
        this.loadAll();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IQmsSupplier) {
        return item.id;
    }

    registerChangeInQmsSuppliers() {
        this.eventSubscriber = this.eventManager.subscribe('qmsSupplierListModification', response => this.loadAll());
    }

    sort() {
        const result = [this.predicate + ',' + (this.reverse ? 'asc' : 'desc')];
        if (this.predicate !== 'id') {
            result.push('id');
        }
        return result;
    }

    private paginateQmsSuppliers(data: IQmsSupplier[], headers: HttpHeaders) {
        this.links = this.parseLinks.parse(headers.get('link'));
        this.totalItems = parseInt(headers.get('X-Total-Count'), 10);
        this.queryCount = this.totalItems;
        this.qmsSuppliers = data;
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
