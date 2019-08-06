import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiParseLinks, JhiAlertService } from 'ng-jhipster';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { IQmsBomTechnology } from 'app/shared/model/qms-bom-technology.model';
import { Principal } from 'app/core';
import { Message } from 'primeng/components/common/api';
import { ITEMS_PER_PAGE } from 'app/shared';
import { QmsBomTechnologyService } from './qms-bom-technology.service';
import { LocalStorageService } from 'ngx-webstorage';
@Component({
    selector: 'jhi-qms-bom-technology',
    templateUrl: './qms-bom-technology.component.html',
    styleUrls: ['bomTechnology.scss']
})
export class QmsBomTechnologyComponent implements OnInit, OnDestroy {
    currentAccount: any;
    qmsBomTechnologies: IQmsBomTechnology[];
    qmsBomTechnologiesBack:IQmsBomTechnology[];
    msgs: Message[] = [];
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
    // 工物料编码条件检索
    materielCdIn = '';
    // 物料名称条件检索
    materielNameIn = '';
    //工序名称
    technologyNameIn='';

    constructor(
        private qmsBomTechnologyService: QmsBomTechnologyService,
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
        this.qmsBomTechnologyService
            .query({
                materielCdIn: this.materielCdIn,
                materielNameIn: this.materielNameIn,
                technologyNameIn: this.technologyNameIn,
                page: this.page - 1,
                size: this.itemsPerPage,
                sort: this.sort()
            })
            .subscribe(
                (res: HttpResponse<IQmsBomTechnology[]>) => this.paginateQmsBomTechnologies(res.body, res.headers),
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }

    // 清空检索条件
    emptyInfo() {
        this.materielCdIn = '';
        this.materielNameIn = '';
        this.technologyNameIn = '';
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
        // 判断是否选择数据
        if (this.qmsBomTechnologiesBack.length === 0) {
            // 错误消息提示
            this.msgs.push({ severity: 'error', summary: 'error', detail: '请选择数据' });
        } else {
            this.localStorage.store('qmsSupplierClassSession', this.qmsBomTechnologiesBack);
            // 保存返回到上一页
            this.activeModal.close(this.qmsBomTechnologiesBack);
        }
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
        this.router.navigate(['/qms-bom-technology'], {
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
            '/qms-bom-technology',
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
        this.materielCdIn = "";
        this.materielNameIn = "";
        this.technologyNameIn = "";
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInQmsBomTechnologies();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IQmsBomTechnology) {
        return item.id;
    }

    registerChangeInQmsBomTechnologies() {
        this.eventSubscriber = this.eventManager.subscribe('qmsBomTechnologyListModification', response => this.loadAll());
    }

    sort() {
        const result = [this.predicate + ',' + (this.reverse ? 'asc' : 'desc')];
        if (this.predicate !== 'id') {
            result.push('id');
        }
        return result;
    }

    private paginateQmsBomTechnologies(data: any, headers: HttpHeaders) {
        this.links = this.parseLinks.parse(headers.get('link'));
        this.totalItems = parseInt(headers.get('X-Total-Count'), 10);
        this.queryCount = this.totalItems;
        this.qmsBomTechnologies = data;
        if (data.length > 0) {
            this.qmsBomTechnologiesBack = data[0] ;
        }
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
