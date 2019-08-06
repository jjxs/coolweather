import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiParseLinks, JhiAlertService } from 'ng-jhipster';
import { Message } from 'primeng/components/common/api';
import { IQmsMaterielType } from 'app/shared/model/qms-materiel-type.model';
import { Principal } from 'app/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { MaterielDetailsSelectionService } from './materielDetailsSelection.service';
import { LocalStorageService } from 'ngx-webstorage';
import { IQmsMaterielDetailsPopup } from 'app/shared/model/QmsMaterielDetailsPopup.model';
@Component({
    selector: 'jhi-materielDetailsSelection',
    templateUrl: './materielDetailsSelection.component.html',
    styleUrls: [
        './materielDetailsSelection.scss'
    ]
})
export class MaterielDetailsSelectionComponent implements OnInit, OnDestroy {
    currentAccount: any;
    qmsMaterielTypes: IQmsMaterielDetailsPopup[];
    qmsMaterielTypeBack: IQmsMaterielDetailsPopup[];
    error: any;
    success: any;
    eventSubscriber: Subscription;
    routeData: any;
    links: any;
    totalItems: any;
    queryCount: any;
    itemsPerPage: any;

    // 接收参数
    paramInfo: { materielId?: String };
    page: any;
    predicate: any;
    previousPage: any;
    reverse: any;
    msgs: Message[] = [];
    // 工序编码条件检索
    bianMa = '';
    // 工序名称条件检索
    gongName = '';
    // 供应商名 
    supplierName = '';
    constructor(
        private qmsMaterielTypeService: MaterielDetailsSelectionService,
        private parseLinks: JhiParseLinks,
        private jhiAlertService: JhiAlertService,
        private principal: Principal,
        private activatedRoute: ActivatedRoute,
        private router: Router,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager,
        private localStorage: LocalStorageService,
    ) {

    }

    loadAll() {
        // 根据id取得表信息
        this.qmsMaterielTypeService.find(this.paramInfo.materielId)
            .subscribe((backData: HttpResponse<any>) => {
                this.bianMa = backData.body.materielCd;
                this.gongName = backData.body.materielName;
            })

        this.qmsMaterielTypeService
            .query({
                materielId: this.paramInfo.materielId,
                supplierName: this.supplierName,
                page: this.page - 1,
                size: this.itemsPerPage,
                sort: this.sort()
            })
            .subscribe(
                (res: HttpResponse<IQmsMaterielDetailsPopup[]>) => this.paginateQmsMaterielTypes(res.body, res.headers),
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }

    loadCarsLazy(event) {
        this.page = event.first / this.itemsPerPage + 1;
        this.loadAll();
    }

    // 清空检索条件
    emptyInfo() {

        this.supplierName = '';
        this.loadAll();
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
        if (this.qmsMaterielTypeBack === undefined) {
            // 错误消息提示
            this.msgs.push({ severity: 'error', summary: 'error', detail: '请选择数据' });
            return false;
        }
        // 判断是否选择数据
        if (this.qmsMaterielTypeBack.length === 0) {
            // 错误消息提示
            this.msgs.push({ severity: 'error', summary: 'error', detail: '请选择数据' });
        } else {
            this.localStorage.store('qmsMaterielTypeBackSession', this.qmsMaterielTypeBack);
            // 保存返回到上一页
            this.activeModal.close(this.qmsMaterielTypeBack);
        }
    }

    loadPage(page: number) {
        if (page !== this.previousPage) {
            this.previousPage = page;
            this.transition();
        }
    }

    transition() {
        this.router.navigate(['/qms-materiel-type'], {
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
            '/qms-materiel-type',
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
        // this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInQmsMaterielTypes();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IQmsMaterielDetailsPopup) {
        return item.id;
    }

    registerChangeInQmsMaterielTypes() {
        this.eventSubscriber = this.eventManager.subscribe('qmsMaterielTypeListModification', response => this.loadAll());
    }

    sort() {
        const result = [this.predicate + ',' + (this.reverse ? 'asc' : 'desc')];
        if (this.predicate !== 'id') {
            result.push('id');
        }
        return result;
    }

    private paginateQmsMaterielTypes(data: any, headers: HttpHeaders) {
        this.links = this.parseLinks.parse(headers.get('link'));
        this.totalItems = parseInt(headers.get('X-Total-Count'), 10);
        this.queryCount = this.totalItems;
        this.qmsMaterielTypes = data;
        if (data.length > 0) {

            this.qmsMaterielTypeBack = data[0];
        }
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
