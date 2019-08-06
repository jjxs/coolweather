import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiParseLinks, JhiAlertService } from 'ng-jhipster';
import { IQmsEntryInspection, MyEntryInspection } from 'app/shared/model/qms-entry-inspection.model';
import { Principal } from 'app/core';
import { ITEMS_PER_PAGE } from 'app/shared';
import { QmsEntryInspectionService } from './qms-entry-inspection.service';

@Component({
    selector: 'jhi-qms-entry-inspection',
    templateUrl: './qms-entry-inspection.component.html',
    styleUrls: [
        'purchase-info.scss'
    ]
})
export class QmsEntryInspectionComponent implements OnInit {
    currentAccount: any;
    qmsEntryInspections: IQmsEntryInspection[];
    error: any;
    success: any;
    // eventSubscriber: Subscription;
    routeData: any;
    links: any;
    totalItems: any;
    // queryCount: any;
    // itemsPerPage: any;
    // page: any;
    // predicate: any;
    previousPage: any;
    reverse: any;

    materielCd = '';   //物料编码检索条件
    materielName = ''; //物料名称检索条件
    serialNumber = ''; //编号检索条件
    fileNumber = ''; // 车号/转向架号 

    loading: boolean;
    itemsPerPage: any;
    page: any;
    predicate: any;
    isDisplay = false
    productProcessList: MyEntryInspection[];
    queryCount: any;
    eventSubscriber: Subscription;

    constructor(
        private qmsEntryInspectionService: QmsEntryInspectionService,
        private parseLinks: JhiParseLinks,
        private jhiAlertService: JhiAlertService,
        private principal: Principal,
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private eventManager: JhiEventManager
    ) {
        this.routeData = this.activatedRoute.data.subscribe(data => {
        });
    }


    delete(data) {
        this.router.navigate(['./', { outlets: { popup: 'purchase/' + data.id + '/delete' }, dto: data }], { relativeTo: this.activatedRoute });
    }

    loadAll() {
        const param: any = {
            'materielCd': this.materielCd,
            'materielName': this.materielName, 'serialNumber': this.serialNumber, 'fileNumber': this.fileNumber,
            'pageNumber': this.page, 'sizeNumber': this.itemsPerPage,
        };
        this.qmsEntryInspectionService.getPurchaseInfoList(param).subscribe(data => {
            this.productProcessList = data

            if (data.length === 0) {
                this.queryCount = 0;
            } else {
                this.queryCount = data[0].numberCount;
            }
        })
    }

    loadPage(page: number) {
        if (page !== this.previousPage) {
            this.previousPage = page;
            this.transition();
        }
    }

    transition() {
        this.router.navigate(['/qms-entry-inspection'], {
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
            '/qms-entry-inspection',
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
        this.itemsPerPage = ITEMS_PER_PAGE;
        this.loading = false;

        // this.principal.identity().then(account => {
        //     this.currentAccount = account;
        // });
        this.registerChangeInQmsEntryInspections();
    }

    loadCarsLazy(event) {
        this.loading = true;
        this.itemsPerPage = ITEMS_PER_PAGE;
        this.page = event.first / this.itemsPerPage + 1;    
        this.loadAll();
        this.loading = false;
    }

    // ngOnDestroy() {
    //     this.eventManager.destroy(this.eventSubscriber);
    // }

    trackId(index: number, item: IQmsEntryInspection) {
        return item.id;
    }

    registerChangeInQmsEntryInspections() {
        this.eventSubscriber = this.eventManager.subscribe('qmsEntryInspectionListModification', response => this.loadAll());
    }

    sort() {
        const result = [this.predicate + ',' + (this.reverse ? 'asc' : 'desc')];
        if (this.predicate !== 'id') {
            result.push('id');
        }
        return result;
    }

    // private paginateQmsEntryInspections(data: MyEntryInspection[], headers: HttpHeaders) {
    //     console.log("11",data)
    //     // this.links = this.parseLinks.parse(headers.get('link'));
    //     // this.totalItems = parseInt(headers.get('X-Total-Count'), 10);
    //     this.queryCount = this.totalItems;
    //     this.productProcessList = data;
    // }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    // 清空检索条件
    emptyInfo() {
        this.materielCd = '';
        this.serialNumber = '';
        this.materielName = '';
        this.fileNumber = '';
        this.loadAll();
    }
}
