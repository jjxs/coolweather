import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiParseLinks, JhiAlertService } from 'ng-jhipster';
import { SERVER_API_URL } from 'app/app.constants';
import { IQmsProductionInspection } from 'app/shared/model/qms-production-inspection.model';
import { Principal } from 'app/core';
import { HttpClient } from '@angular/common/http';
import { Message } from 'primeng/components/common/api';

import { ITEMS_PER_PAGE } from 'app/shared';
import { QmsProductionInspectionService } from './qms-production-inspection.service';

@Component({
    selector: 'jhi-qms-production-inspection',
    templateUrl: './qms-production-inspection.component.html',
    styleUrls: [
        './productProcess.scss'
    ]
})
export class QmsProductionInspectionComponent implements OnInit, OnDestroy {
    currentAccount: any;
    qmsProductionInspections: IQmsProductionInspection[];
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

    // 物料编码条件检索
    materielCd = '';
    // 物料名称条件检索
    materielName = '';
    // 物料名称条件检索
    describe = '';
    // 物料名称条件检索
    serialNumber = '';
    // 物料名称条件检索
    furnace = '';
    // 物料名称条件检索
    remark = '';
    // 物料名称条件检索
    isOk = '1';
    // 检验状态集合
    checkStatus: any;
    msgs: Message[] = [];
    constructor(
        private http: HttpClient,
        private qmsProductionInspectionService: QmsProductionInspectionService,
        private parseLinks: JhiParseLinks,
        private jhiAlertService: JhiAlertService,
        private principal: Principal,
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private eventManager: JhiEventManager
    ) {
        this.itemsPerPage = ITEMS_PER_PAGE;
        this.routeData = this.activatedRoute.data.subscribe(data => {
            this.page = data.pagingParams.page;
            this.previousPage = data.pagingParams.page;
            this.reverse = data.pagingParams.ascending;
            this.predicate = data.pagingParams.predicate;
        });
    }


    // 清空检索条件
    emptyInfo() {
        this.materielCd = '';
        this.materielName = '';
        this.describe = '';
        this.serialNumber = '';
        this.furnace = '';
        this.isOk = '1';
        this.remark = '';
        this.loadAll();
    }

    loadAll() {
        this.qmsProductionInspectionService
            .query({
                materielCd: this.materielCd,
                materielName: this.materielName,
                describe: this.describe,
                serialNumber: this.serialNumber,
                furnace: this.furnace,
                remark: this.remark,
                isOK: this.isOk,
                page: this.page - 1,
                size: this.itemsPerPage,
            })
            .subscribe(
                (res: HttpResponse<IQmsProductionInspection[]>) => this.paginateQmsProductionInspections(res.body, res.headers),
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }

    loadPage(page: number) {
        if (page !== this.previousPage) {
            this.previousPage = page;
            this.transition();
        }
    }

    // 删除
    delete(productProcess) {
        if (productProcess.isOk != '0') {
            this.msgs.push({ severity: 'error', summary: '提示', detail: '该数据已被检验,不能删除!' });
        } else {
            this.router.navigate(['./', { outlets: { popup: 'qms-production-inspection/' + productProcess.id + '/delete' } }], { relativeTo: this.activatedRoute });
        }
    }

    transition() {
        this.router.navigate(['/qms-production-inspection'], {
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
            '/qms-production-inspection',
            {
                page: this.page,
                sort: this.predicate + ',' + (this.reverse ? 'asc' : 'desc')
            }
        ]);
        this.loadAll();
    }

    // 检验
    getMasterList() {
        const params = {
            kbnCd: "M09"
        }
        this.http.get(SERVER_API_URL + 'api/qms-materiels/master', { params }).subscribe(
            data => {
                this.checkStatus = data;
                this.isOk = '1';
                console.log(data);
            }
        );
    }

    ngOnInit() {
        this.getMasterList();
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInQmsProductionInspections();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    loadCarsLazy(event) {
        this.page = event.first / this.itemsPerPage + 1;
        this.loadAll();
    }

    trackId(index: number, item: IQmsProductionInspection) {
        return item.id;
    }

    registerChangeInQmsProductionInspections() {
        this.eventSubscriber = this.eventManager.subscribe('qmsProductionInspectionListModification', response => this.loadAll());
    }

    sort() {
        const result = [this.predicate + ',' + (this.reverse ? 'asc' : 'desc')];
        if (this.predicate !== 'id') {
            result.push('id');
        }
        return result;
    }

    private paginateQmsProductionInspections(data: IQmsProductionInspection[], headers: HttpHeaders) {
        this.links = this.parseLinks.parse(headers.get('link'));
        this.totalItems = parseInt(headers.get('X-Total-Count'), 10);
        this.queryCount = this.totalItems;
        this.qmsProductionInspections = data;
        console.log('qmp', data)
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
