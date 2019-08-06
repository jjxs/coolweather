import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { LocalStorageService } from 'ngx-webstorage';
import { JhiEventManager, JhiParseLinks, JhiAlertService } from 'ng-jhipster';
import { Subscription } from 'rxjs';
import { IQmsProcess } from 'app/shared/model/qms-process.model';

import { Message } from 'primeng/components/common/api';
import { ProcessInformationsService } from './process-informations.service';
import { IQmsBomTechnology, QmsBomTechnology } from 'app/shared/model/qms-bom-technology.model';
/**
 * 商品列表popup
 */
@Component({
    selector: 'jhi-process-select-popup-component',
    templateUrl: './process-select-popup-component.html',
    styleUrls: ['process-informations.scss']
})
export class ProcessSelectionPopupComponent implements OnInit {

    // message信息
    msgs: Message[] = [];
    // 错误信息
    error: any;
    // 正确信息
    success: any;
    // 返回结果
    qmsBomTechnologies: IQmsBomTechnology;
    // 加载图画
    loading: boolean;
    // 工艺编码
    technologyCd = '';
    // 工艺名称
    technologyName = '';

    // 工艺编码复制
    technologyCdCopy = '';
    // 工艺名称复制
    technologyNameCopy = '';

    eventSubscriber: Subscription;
    // 初始化参数：一览返回数据总条数
    iqmsProcess: IQmsProcess[];
    // 初始化参数：确认返回数据
    iqmsProcessBack: IQmsProcess[];
    val1: string;
    // 接收参数
    paramInfo: { hiddenRightMaterielId?: String };
    links: any;
    totalItems: any;
    // 工艺下拉数据
    selectTechnology: any[];
    copySelectTechnology: any[];

    // 下拉固定
    readonlySelect: boolean;
    // 下拉选中值 
    selectTechnologyCd: any;
    copySelectTechnologyCd: any;

    constructor(
        private processSelectionService: ProcessInformationsService,
        public activeModal: NgbActiveModal,
        private localStorage: LocalStorageService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private parseLinks: JhiParseLinks,
    ) {

    }
    clearInfo() {
        this.technologyCd = '';
        this.technologyName = '';
        this.technologyCdCopy = '';
        this.technologyNameCopy = '';
    }
    /**
     * 初始化
     */
    ngOnInit() {
        // 工艺下拉值取得
        this.processSelectionService.getTechnology({ masterCd: this.paramInfo.hiddenRightMaterielId })
            .subscribe(data => {
                this.selectTechnology = data;
                this.copySelectTechnology = data;
                // 判断是否取到下拉值
                if (data.length === 0) {
                    // 没有取到值 下拉不可选择
                    this.val1 = '1';
                    this.readonlySelect = true;
                } else {
                    this.selectTechnologyCd = this.selectTechnology[0].value;
                    this.copySelectTechnologyCd = this.copySelectTechnology[0].value;
                    this.val1 = '2';
                    this.readonlySelect = false;
                }
            })
        this.loadAll();
        this.registerChangeInQmsVehicleTypeClasses();
    }

    registerChangeInQmsVehicleTypeClasses() {
        this.eventSubscriber = this.eventManager.subscribe('qmsProcessListModification', response => this.loadAll());
    }

    /**
     * 检索数据+模糊查询检索
     */
    loadAll() {
        this.processSelectionService
            .query({
                technologyCd: this.technologyCd,
                technologyName: this.technologyName
            })
            .subscribe(
                (res: HttpResponse<IQmsProcess[]>) => this.paginateQmsVehicleTypeClasses(res.body, res.headers),
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }


    private paginateQmsVehicleTypeClasses(data: any, headers: HttpHeaders) {

        this.iqmsProcess = data;

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
     * 确认
     */
    selected() {
        // 错误消息赋空
        this.msgs = [];

        if (this.val1 === '1') {

            if (this.technologyCd === '') {
                // 错误消息提示
                this.msgs.push({ severity: 'error', summary: 'error', detail: '工艺编码不能为空' });

                return false;
            }
            if (this.technologyName === '') {
                // 错误消息提示
                this.msgs.push({ severity: 'error', summary: 'error', detail: '工艺名称不能为空' });

                return false;
            }
            // 检索该物料下的工艺编码是否存在
            this.processSelectionService.selectExistenceInfo({ masterCd: this.paramInfo.hiddenRightMaterielId, technologyCd: this.technologyCd }).subscribe(data => {
                if (data.id === null) {
                    this.qmsBomTechnologies = new QmsBomTechnology;
                    this.qmsBomTechnologies.technologyCd = this.technologyCd;
                    this.qmsBomTechnologies.technologyName = this.technologyName;
                    this.qmsBomTechnologies.remark = '追加工艺';
                    // 保存返回到上一页
                    this.activeModal.close(this.qmsBomTechnologies);
                } else {
                    // 错误消息提示
                    this.msgs.push({ severity: 'error', summary: 'error', detail: '工艺编码已经存在' });

                    return false;
                }
            })

        } else if (this.val1 === '3') {
            if (this.technologyCdCopy === '') {
                // 错误消息提示
                this.msgs.push({ severity: 'error', summary: 'error', detail: '工艺编码不能为空' });

                return false;
            }
            if (this.technologyNameCopy === '') {
                // 错误消息提示
                this.msgs.push({ severity: 'error', summary: 'error', detail: '工艺名称不能为空' });

                return false;
            }
            // 检索该物料下的工艺编码是否存在
            this.processSelectionService.selectExistenceInfo({ masterCd: this.paramInfo.hiddenRightMaterielId, technologyCd: this.technologyCdCopy }).subscribe(data => {
                if (data.id === null) {
                    // 检索该物料下的工艺编码是否存在
                    this.processSelectionService.selectExistenceInfo({ masterCd: this.paramInfo.hiddenRightMaterielId, technologyCd: this.copySelectTechnologyCd }).subscribe(
                        data1 => {

                            this.qmsBomTechnologies = new QmsBomTechnology;
                            this.qmsBomTechnologies.id = data1.id;
                            this.qmsBomTechnologies.technologyCd = this.technologyCdCopy;
                            this.qmsBomTechnologies.technologyName = this.technologyNameCopy;
                            this.qmsBomTechnologies.orderNo = data1.orderNo;
                            this.qmsBomTechnologies.isDefault = '0';
                            this.qmsBomTechnologies.remark = '复制工艺';
                            this.qmsBomTechnologies.reserveFirst = this.copySelectTechnologyCd;
                            this.qmsBomTechnologies.reserveSecond = data1.technologyCd;
                            // 保存返回到上一页
                            this.activeModal.close(this.qmsBomTechnologies);

                        })

                } else {
                    // 错误消息提示
                    this.msgs.push({ severity: 'error', summary: 'error', detail: '工艺编码已经存在' });

                    return false;
                }
            })
        } else {
            // 检索该物料下的工艺编码是否存在
            this.processSelectionService.selectExistenceInfo({ masterCd: this.paramInfo.hiddenRightMaterielId, technologyCd: this.selectTechnologyCd }).subscribe(data => {

                this.qmsBomTechnologies = data;
                this.qmsBomTechnologies.remark = '选择工艺';
                // 保存返回到上一页
                this.activeModal.close(this.qmsBomTechnologies);

            })
        }

        // 判断是否选择数据
        // if (this.iqmsProcessBack.length === 0) {
        //     // 错误消息提示
        //     this.msgs.push({ severity: 'error', summary: 'error', detail: '请选择数据' });
        // } else {
        //     this.localStorage.store('qmsProcessSession', this.iqmsProcessBack);
        //     // 保存返回到上一页
        //     this.activeModal.close(this.iqmsProcessBack);
        // }
    }
}
