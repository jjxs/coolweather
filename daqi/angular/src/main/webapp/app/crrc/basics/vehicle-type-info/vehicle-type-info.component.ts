import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiParseLinks, JhiAlertService } from 'ng-jhipster';

import { IQmsVehicleTypeInfo } from 'app/shared/model/qms-vehicle-type-info.model';
import { Principal } from 'app/core';

import { ITEMS_PER_PAGE } from 'app/shared';
import { VehicleTypeInfoService } from './vehicle-type-info.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
    selector: 'jhi-vehicle-type-info',
    templateUrl: './vehicle-type-info.component.html',
    styleUrls: ['vehicle-type-info.css']
})
export class VehicleTypeInfoComponent implements OnInit, OnDestroy {
    currentAccount: any;
    qmsVehicleTypeInfos: IQmsVehicleTypeInfo[];
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

    // 车型条件检索
    carType = '';
    // 车型名称条件检索
    carTypeName = '';
    constructor(
        private VehicleTypeInfoService: VehicleTypeInfoService,
        private parseLinks: JhiParseLinks,
        private jhiAlertService: JhiAlertService,
        private principal: Principal,
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private modalsService: NgbModal,
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
        this.carType = '';
        this.carTypeName = '';
        this.loadAll();
    }
    // 检索数据+模糊查询检索
    loadAll() {
        this.VehicleTypeInfoService
            .query({
                carType: this.carType,
                carTypeName: this.carTypeName,
                page: this.page - 1,
                size: this.itemsPerPage,
                sort: this.sort()
            })
            .subscribe(
                (res: HttpResponse<IQmsVehicleTypeInfo[]>) => this.paginateQmsVehicleTypeInfos(res.body, res.headers),
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }

    loadPage(page: number) {
        if (page !== this.previousPage) {
            this.previousPage = page;
            this.transition();
        }
    }

    transition() {
        this.router.navigate(['/vehicle-type-info'], {
            queryParams: {
                page: this.page,
                size: this.itemsPerPage,
                sort: 'id' + ',' + (this.reverse ? 'asc' : 'asc')
            }
        });
        this.loadAll();
    }

    clear() {
        this.page = 0;
        this.router.navigate([
            '/vehicle-type-info',
            {
                page: this.page,
                sort: 'id' + ',' + (this.reverse ? 'asc' : 'asc')
            }
        ]);
        this.loadAll();
    }
    // 页面初始化方法
    ngOnInit() {
        // this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInQmsVehicleTypeInfos();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IQmsVehicleTypeInfo) {
        return item.id;
    }

    registerChangeInQmsVehicleTypeInfos() {
        this.eventSubscriber = this.eventManager.subscribe('VehicleTypeInfoListModificationNew', response => this.loadAll());
    }
    // 排序
    sort() {
        const result = ['id' + ',' + (this.reverse ? 'asc' : 'asc')];
        // if (this.predicate !== 'id') {
        //     result.push('id');
        // }
        return result;
    }

    private paginateQmsVehicleTypeInfos(data: IQmsVehicleTypeInfo[], headers: HttpHeaders) {
        this.links = this.parseLinks.parse(headers.get('link'));
        this.totalItems = parseInt(headers.get('X-Total-Count'), 10);
        this.queryCount = this.totalItems;
        this.qmsVehicleTypeInfos = data;
    }
    // 懒加载
    loadCarsLazy(event) {
        // this.loading = true;
        this.page = event.first / this.itemsPerPage + 1;
        this.loadAll();
        // this.loading = false;
    }
    // 删除车型信息
    delete(id) {
        this.router.navigate(['./', { outlets: { popup: 'vehicle-type-info/' + id + '/delete' } }], { relativeTo: this.activatedRoute });
    }
    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
