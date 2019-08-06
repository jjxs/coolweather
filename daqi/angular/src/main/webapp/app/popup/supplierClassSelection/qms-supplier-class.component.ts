import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiParseLinks, JhiAlertService } from 'ng-jhipster';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { IQmsSupplierClass } from 'app/shared/model/qms-supplier-class.model';
import { Principal } from 'app/core';
import { Message } from 'primeng/components/common/api';
import { ITEMS_PER_PAGE } from 'app/shared';
import { LocalStorageService } from 'ngx-webstorage';
import { QmsSupplierClassService } from './qms-supplier-class.service';
@Component({
    selector: 'jhi-qms-supplier-class',
    templateUrl: './qms-supplier-class.component.html',
    styleUrls: [
        './supplierClassSelection.scss'
    ]
})
export class QmsSupplierClassComponent implements OnInit, OnDestroy {
    currentAccount: any;
    qmsSupplierClasses: IQmsSupplierClass[];
    qmsSupplierClassesBack: IQmsSupplierClass[];
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
    // 供应商分类编码条件检索
    bianMa = '';
    // 供应商分类名称条件检索
    gongName = '';
    deletecheck = '';
    msgs: Message[] = [];
    constructor(
        private qmsSupplierClassService: QmsSupplierClassService,
        private parseLinks: JhiParseLinks,
        private jhiAlertService: JhiAlertService,
        private principal: Principal,
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private eventManager: JhiEventManager,
        public activeModal: NgbActiveModal,
        private localStorage: LocalStorageService,
    ) {
       
    }

    loadAll() {
        this.qmsSupplierClassService
            .query({
                bianMa: this.bianMa,
                gongName: this.gongName,
                page: this.page - 1,
                size: this.itemsPerPage,
                // sort: this.sort()
            })
            .subscribe(
                (res: HttpResponse<IQmsSupplierClass[]>) => this.paginateQmsSupplierClasses(res.body, res.headers),
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }
     // 清空检索条件
     emptyInfo() {
        this.bianMa = '';
        this.gongName = '';
        this.loadAll();
    }

    //点击删除按钮触发时间
    delete(id) {
        this.deletecheck = id;
        this.qmsSupplierClassService.deleteCheck({ deletecheck: this.deletecheck }).subscribe(data => {
            if (data.body === 1) {
                // alert("不能删除");
                this.msgs.push({ severity: 'error', summary: '提示', detail: '该数据还在被使用,不能删除!' });
            } else {
                this.router.navigate(['./', { outlets: { popup: 'supplierClass/' + id + '/delete' } }], { relativeTo: this.activatedRoute });
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
        this.router.navigate(['/qms-supplier-class'], {
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
            '/qms-supplier-class',
            {
                page: this.page,
                sort: this.predicate + ',' + (this.reverse ? 'asc' : 'desc')
            }
        ]);
        this.loadAll();
    }

    ngOnInit() {
        this.page = 1;
        this.queryCount = 0;
        this.itemsPerPage = 6;
        this.predicate = 'id';
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInQmsSupplierClasses();
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
        if (this.qmsSupplierClassesBack.length === 0) {
            // 错误消息提示
            this.msgs.push({ severity: 'error', summary: 'error', detail: '请选择数据' });
        } else {
            this.localStorage.store('qmsSupplierClassSession', this.qmsSupplierClassesBack);
            // 保存返回到上一页
            this.activeModal.close(this.qmsSupplierClassesBack);
        }
    }
    

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IQmsSupplierClass) {
        return item.id;
    }

    registerChangeInQmsSupplierClasses() {
        this.eventSubscriber = this.eventManager.subscribe('qmsSupplierClassListModification', response => this.loadAll());
    }

    sort() {
        const result = [this.predicate + ',' + (this.reverse ? 'asc' : 'desc')];
        if (this.predicate !== 'id') {
            result.push('id');
        }
        return result;
    }

    private paginateQmsSupplierClasses(data: any, headers: HttpHeaders) {
        this.links = this.parseLinks.parse(headers.get('link'));
        this.totalItems = parseInt(headers.get('X-Total-Count'), 10);
        this.queryCount = this.totalItems;
        this.qmsSupplierClasses = data;
        if (data.length > 0) {
            this.qmsSupplierClassesBack = data[0] ;
        }
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
