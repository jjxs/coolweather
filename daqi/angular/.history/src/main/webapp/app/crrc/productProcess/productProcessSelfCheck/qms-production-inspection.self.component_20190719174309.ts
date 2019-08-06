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
import { QmsProductionInspectionSelfService } from './qms-production-inspection.self.service';

@Component({
    selector: 'jhi-qms-production-inspection-self',
    templateUrl: './qms-production-inspection.self.component.html',
    styleUrls: [
        './productProcessSelf.scss'
    ]
})
export class QmsProductionInspectionSelfComponent implements OnInit, OnDestroy {
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
    // 工序名
    processName = '';
    // 编号
    serialNumber = '';
    // 炉批号
    furnace = '';
    // 备注
    remark = '';
    // 检验状态
    isOk = '1';
    // 中梁号
    workno = '';
    // 检验状态集合
    checkStatus: any;
    msgs: Message[] = [];
    constructor(
        private http: HttpClient,
        private qmsProductionInspectionService: QmsProductionInspectionSelfService,
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
        this.processName = '';
        this.serialNumber = '';
        this.furnace = '';
        this.workno = '';
        this.isOk = '1';
        this.loadAll();
    }

    loadAll() {
        this.qmsProductionInspectionService
            .query({
                materielCd: this.materielCd,
                materielName: this.materielName,
                processName: this.processName,
                serialNumber: this.serialNumber,
                furnace: this.furnace,
                isOK: this.isOk,
                workno: this.workno,
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

    // 检验
    check(productProcess) {
        console.log(productProcess)
        
        // 检验上工序是否合格， 不合格则无法校验
        const params = {
            bomTechnologyId : productProcess.bomTechnologyId,
            serialNumber: productProcess.serialNumber
        }

        this.qmsProductionInspectionService.chackPreProcess(params).subscribe(data => {
            
            if (data.body.code == '1') {
                this.msgs.push({ severity: 'error', summary: '提示', detail: '上工序检验不合格，该工序无法检验!' });
            } else {
                this.router.navigate(['./', { outlets: { popup: 'qms-production-inspection-self/' + productProcess.id + '/edit' } }], { relativeTo: this.activatedRoute });
            }
        })

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
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
