import { Component, OnInit } from '@angular/core';
import { JhiAlertService } from 'ng-jhipster';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { QmsMaterialProcedureSelection } from 'app/shared/model/qms-material-procedure-selection';
import { IQmsVehicleTypeInfo } from 'app/shared/model/qms-vehicle-type-info.model';
import { LocalStorageService } from 'ngx-webstorage';
import { Message } from 'primeng/components/common/api';
import { MaterialProcedureSelectService } from './vehicleTypeClassSelection.service';
/**
 * 商品列表popup
 */
@Component({
    selector: 'jhi-materialprocedureselection',
    templateUrl: './materialProcedureSelection.component.html',
    styleUrls: ['materialProcedureSelection.scss']
})
export class MaterialProcedureSelectionComponent implements OnInit {

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
    // 数量
    constNumber = 0;
    // 编辑数量判断
    editNumber = 0;
    // 车型条件检索
    carType = '';
    // 车型名称条件检索
    carTypeName = '';
    // 物料编码条件检索
    materialBianma = '';
    // 物料名称条件检索
    materialName = '';
    // 工艺编码条件检索
    processCoding = '';
    // 工艺名称条件检索
    processName = '';
    // 初始化参数：一览返回数据
    qmsVehicleTypeInfos: QmsMaterialProcedureSelection[];
    qmsVehicleTypeInfo: IQmsVehicleTypeInfo = null;
    // 初始化参数：一览返回数据总条数
    qmsVehicleNumberInfos: QmsMaterialProcedureSelection[];
    // 初始化参数：确认返回数据
    qmsVehicleTypeBackInfos: QmsMaterialProcedureSelection[] = [];
    // 初始化参数：车型下拉数据
    VehiTypeSelect: IQmsVehicleTypeInfo[];
    // 用于判断是否为第一次进来
    firstNumber: number = 0;
    constructor(
        private MaterialProcedureSelectService: MaterialProcedureSelectService,
        public activeModal: NgbActiveModal,
        private localStorage: LocalStorageService,
        private jhiAlertService: JhiAlertService
    ) {
    }
    /**
     * 初始化
     */
    ngOnInit() {
        this.page = 1;
        this.queryCount = 0;
        this.itemsPerPage = 6;
        this.predicate = 'id';
        this.reverse = true;
        this.loading = false;
    }
    /**
     * 清空检索条件
     * 
     */
    emptyInfo() {
        this.carType = '';
        this.carTypeName = '';
        this.materialBianma = '';
        this.materialName = '';
        this.processCoding = '';
        this.processName = '';
        this.qmsVehicleTypeInfo = null;
        // 判断之前是否有数据选中
        if (this.localStorage.retrieve('qmsVehicleTypeSession') !== null) {
            // 取得选中数据的session信息
            this.qmsVehicleTypeBackInfos = this.qmsVehicleTypeBackInfos;
        }
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
        const param: any = {
            'carType': this.carType, 'carTypeName': this.carTypeName,
            'materialBianma': this.materialBianma, 'materialName': this.materialName,
            'processCoding': this.processCoding, 'processName': this.processName, 'pageNumber': this.page, 'sizeNumber': this.itemsPerPage,
        };
        this.MaterialProcedureSelectService.getAllVicTypeInfos().subscribe(dataInfo => {

            this.VehiTypeSelect = dataInfo.body
        });
        // 取得总数据
        this.MaterialProcedureSelectService.getHandManAll(param).subscribe(data => {
            this.qmsVehicleTypeInfos = data.materProSelInfo;
            if (data.materProSelInfo.length > 0) {
                this.qmsVehicleTypeBackInfos = data.materProSelInfo[0];
            }
        });
        // 取得总条数
        this.MaterialProcedureSelectService.getHandNumberAll(param).subscribe(data => {
            this.qmsVehicleNumberInfos = data.materProNumberInfo;

            if (data.materProNumberInfo.length === 0) {
                this.queryCount = 0;
            } else {
                this.queryCount = data.materProNumberInfo[0].numberCount;
            }

        });
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
