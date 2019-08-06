import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { LocalStorageService } from 'ngx-webstorage';
import { JhiEventManager, JhiParseLinks, JhiAlertService } from 'ng-jhipster';
import { Subscription } from 'rxjs';
import { IRbacRole } from 'app/shared/model/rbac-role.model';

import { Message } from 'primeng/components/common/api';
import { ProcessSelectionService } from './processSelection.service';
/**
 * 商品列表popup
 */
@Component({
    selector: 'jhi-processSelection',
    templateUrl: './processSelection.html',
    styleUrls: ['processSelection.scss']
})
export class ProcessSelectionComponent implements OnInit {

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
    // 工序编码条件检索
    processCd = '';
    // 工序名称条件检索
    processName = '';

    eventSubscriber: Subscription;
    // 初始化参数：一览返回数据总条数
    iRbacRole: IRbacRole[];
    // 初始化参数：确认返回数据
    iRbacRoleBack: IRbacRole[];
    links: any;
    totalItems: any;

    constructor(
        private processSelectionService: ProcessSelectionService,
        public activeModal: NgbActiveModal,
        private localStorage: LocalStorageService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private parseLinks: JhiParseLinks,
    ) {
    }
    /**
     * 初始化
     */
    ngOnInit() {
        this.page = 1;
        this.queryCount = 0;
        this.itemsPerPage = 1;
        this.loadAll();
        this.registerChangeInQmsVehicleTypeClasses();
    }

    registerChangeInQmsVehicleTypeClasses() {
        this.eventSubscriber = this.eventManager.subscribe('qmsVehicleTypeClassListModification', response => this.loadAll());
    }

   
    // 清空检索条件
    emptyInfo() {
        this.processCd = '';
        this.processName = '';
        this.loadAll();
    }

    /**
     * 检索数据 
     */
    searchInfo() {
        this.loadAll();
    }

    /**
     * 检索数据+模糊查询检索
     */
    loadAll() {
        this.processSelectionService
            .query({
                roleCode: this.roleCode,
                roleName: this.roleName,
                page: this.page - 1,
                size: this.itemsPerPage,
            })
            .subscribe(
                (res: HttpResponse<IRbacRole[]>) => this.paginateQmsVehicleTypeClasses(res.body, res.headers),
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }


    private paginateQmsVehicleTypeClasses(data: any, headers: HttpHeaders) {
        this.links = this.parseLinks.parse(headers.get('link'));
        this.totalItems = parseInt(headers.get('X-Total-Count'), 10);
        this.queryCount = this.totalItems;
        this.iRbacRole = data;
        if (data.length > 0) {
            this.iRbacRoleBack = data[0] ;
        }
    }

    /**
     * 失败弹message
     */
    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
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
        this.page = event.first / this.itemsPerPage + 1;
        this.loadAll();
    }
    /**
     * 确认
     */
    selected() {
        // 错误消息赋空
        this.msgs = [];
        // 判断是否选择数据
        if (this.iRbacRoleBack.length === 0) {
            // 错误消息提示
            this.msgs.push({ severity: 'error', summary: 'error', detail: '请选择数据' });
        } else {
            this.localStorage.store('qmsVehicleTypeClassSession', this.iRbacRoleBack);
            // 保存返回到上一页
            this.activeModal.close(this.iRbacRoleBack);
        }
    }
}
