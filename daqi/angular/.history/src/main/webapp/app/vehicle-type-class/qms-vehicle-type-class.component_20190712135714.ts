import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiParseLinks, JhiAlertService } from 'ng-jhipster';
import { Message } from 'primeng/components/common/api';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IQmsVehicleTypeClass } from 'app/shared/model/qms-vehicle-type-class.model';
import { Principal } from 'app/core';
import { VehicleTypeClassSelectionComponent } from '../popup/vehicleTypeClassSelection';

import { ITEMS_PER_PAGE } from 'app/shared';
import { QmsVehicleTypeClassService } from './qms-vehicle-type-class.service';

@Component({
    selector: 'jhi-qms-vehicle-type-class',
    templateUrl: './qms-vehicle-type-class.component.html',
    styleUrls: [
        './vehicle-type.scss'
    ]
})
export class QmsVehicleTypeClassComponent implements OnInit, OnDestroy {
    currentAccount: any;
    qmsVehicleTypeClasses: IQmsVehicleTypeClass[];
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
    // 车型分类编码条件检索
    vehicleClass = '';
    // 车型分类名称条件检索
    vehicleClassName = '';
    msgs: Message[] = [];

    constructor(
        private qmsVehicleTypeClassService: QmsVehicleTypeClassService,
        private parseLinks: JhiParseLinks,
        private jhiAlertService: JhiAlertService,
        private principal: Principal,
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private eventManager: JhiEventManager,
        private modalService: NgbModal,
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
        this.vehicleClass = '';
        this.vehicleClassName = '';
        this.loadAll();
    }

    //点击删除按钮触发时间
    delete(id, vehicleClass) {
        this.qmsVehicleTypeClassService.deleteCheck({ deletecheck: vehicleClass }).subscribe(data => {
            if (data.body === 1) {
                // alert("不能删除");
                this.msgs.push({ severity: 'error', summary: '提示', detail: '该数据还在被使用,不能删除!' });
            } else {
                this.router.navigate(['./', { outlets: { popup: 'qms-vehicle-type-class/' + id + '/delete' } }], { relativeTo: this.activatedRoute });
            }

        });

        
    }

    loadAll() {
        this.qmsVehicleTypeClassService
            .query({
                vehicleClass: this.vehicleClass,
                vehicleClassName: this.vehicleClassName,
                page: this.page - 1,
                size: this.itemsPerPage,
                sort: this.sort()
            })
            .subscribe(
                (res: HttpResponse<IQmsVehicleTypeClass[]>) => this.paginateQmsVehicleTypeClasses(res.body, res.headers),
                (res: HttpErrorResponse) => this.onError(res.message)
            );
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
        this.router.navigate(['/qms-vehicle-type-class'], {
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
            '/qms-vehicle-type-class',
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
        this.registerChangeInQmsVehicleTypeClasses();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IQmsVehicleTypeClass) {
        return item.id;
    }

    registerChangeInQmsVehicleTypeClasses() {
        this.eventSubscriber = this.eventManager.subscribe('qmsVehicleTypeClassListModification', response => this.loadAll());
    }

    sort() {
        const result = [this.predicate + ',' + (this.reverse ? 'asc' : 'desc')];
        if (this.predicate !== 'id') {
            result.push('id');
        }
        return result;
    }

    private paginateQmsVehicleTypeClasses(data: IQmsVehicleTypeClass[], headers: HttpHeaders) {
        this.links = this.parseLinks.parse(headers.get('link'));
        this.totalItems = parseInt(headers.get('X-Total-Count'), 10);
        this.queryCount = this.totalItems;
        this.qmsVehicleTypeClasses = data;
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
