import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { LocalStorageService } from 'ngx-webstorage';
import { Principal } from 'app/core';
import { JhiEventManager, JhiParseLinks, JhiAlertService } from 'ng-jhipster';
import { Subscription } from 'rxjs';

import { Message } from 'primeng/components/common/api';
import { VehicleTypeClassSelectionService } from './vehicleTypeClassSelection.service';
/**
 * 商品列表popup
 */
@Component({
    selector: 'jhi-materialprocedureselection',
    templateUrl: './vehicleTypeClassSelection.html',
    styleUrls: ['vehicleTypeClassSelection.scss']
})
export class VehicleTypeClassSelectionComponent implements OnInit {

    // message信息
    msgs: Message[] = [];
    // 错误信息
    error: any;
    // 正确信息
    success: any;
    // 第几页
    page: any;
    // 商品总数
    queryCount: any;
    // 每页显示条数
    itemsPerPage: any;
    // 排序字段
    predicate: any;
    // 顺序还是倒序
    reverse: boolean;
    // 加载图画
    loading: boolean;
    // 车型分类编码条件检索
    vehicleClass = '';
    // 车型分类名称条件检索
    vehicleClassName = '';
    // 用于判断是否为第一次进来
    routeData: any;
    previousPage: any;
    firstNumber: number = 0;
    currentAccount: any;
    eventSubscriber: Subscription;
    constructor(
        private vehicleTypeClassSelectionService: VehicleTypeClassSelectionService,
        public activeModal: NgbActiveModal,
        private localStorage: LocalStorageService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private activatedRoute: ActivatedRoute,
        private principal: Principal,
    ) {
        this.itemsPerPage = 6;
        this.routeData = this.activatedRoute.data.subscribe(data => {
            this.page = data.pagingParams.page;
            this.previousPage = data.pagingParams.page;
            this.reverse = data.pagingParams.ascending;
            this.predicate = data.pagingParams.predicate;
        });

    }
    /**
     * 初始化
     */
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInQmsVehicleTypeClasses();
    }

    registerChangeInQmsVehicleTypeClasses() {
        this.eventSubscriber = this.eventManager.subscribe('qmsVehicleTypeClassListModification', response => this.loadAll());
    }
   
    // 清空检索条件
    emptyInfo() {
        this.vehicleClass = '';
        this.vehicleClassName = '';
        this.loadAll();
    }

    /**
     * 检索数据 
     */
    searchInfo() {
        // 判断之前是否有数据选中
        if (this.localStorage.retrieve('qmsVehicleTypeSession') !== null) {
            // 取得选中数据的session信息
            this.qmsVehicleTypeBackInfos = this.qmsVehicleTypeBackInfos;
        }
        this.loadAll();
    }
    // 下拉框选择事件
    selectVehicle(event) {

        if (event.value === null) {
            this.carType = '';
        } else {
            this.carType = event.value.vehicleType;
        }
    }
    /**
     * 检索数据+模糊查询检索
     */
    loadAll() {
        this.vehicleTypeClassSelectionService
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

    sort() {
        const result = [this.predicate + ',' + (this.reverse ? 'asc' : 'desc')];
        if (this.predicate !== 'id') {
            result.push('id');
        }
        return result;
    }

    /**
     * 失败弹message
     */
    private onError() {
        this.jhiAlertService.error('服务器连接失败', null, null);
    }

    /**
     * 返回
     * @param record
     */
    goBack(record?: any) {
        this.activeModal.close(record);
    }
    /**
     * 懒加载取数据
     * @param event
     */
    loadCarsLazy(event) {

        // 判断之前是否有数据选中
        if (this.localStorage.retrieve('qmsVehicleTypeSession') !== null && this.firstNumber === 0) {
            // 取得选中数据的session信息
            // this.qmsVehicleTypeBackInfos = this.localStorage.retrieve('qmsVehicleTypeSession');
            this.firstNumber = 1;
        } else if (this.firstNumber !== 0) {
            this.qmsVehicleTypeBackInfos = this.qmsVehicleTypeBackInfos;
        }
        this.loading = true;
        this.itemsPerPage = 6;
        this.page = event.first / this.itemsPerPage + 1;
        this.loadAll();
        this.loading = false;
    }
    /**
     * 确认
     */
    selected() {
        // 错误消息赋空
        this.msgs = [];
        // 判断是否选择数据
        if (this.qmsVehicleTypeBackInfos.length === 0) {
            // 错误消息提示
            this.msgs.push({ severity: 'error', summary: 'error', detail: '请选择数据' });
        } else {
            this.localStorage.store('qmsVehicleTypeSession', this.qmsVehicleTypeBackInfos);
            // 保存返回到上一页
            this.activeModal.close(this.qmsVehicleTypeBackInfos);
        }
    }
}
