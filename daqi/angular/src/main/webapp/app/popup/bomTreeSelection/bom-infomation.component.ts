import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, } from 'ng-jhipster';
import { IBomInformation, BomInformation } from 'app/shared/model/bom-information.model';
import { Principal } from 'app/core';
import { ITEMS_PER_PAGE } from 'app/shared';
import { BomInformationService } from './bom-infomation.service';
import { TreeNode } from 'primeng/api';
import { Observable } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Message } from 'primeng/components/common/api';
import { IQmsMateriel } from 'app/shared/model/qms-materiel.model';
import { MaterialSelectionComponent } from 'app/popup/materialSelection';
import { VehicleTypeSelectionComponent } from 'app/popup/vehicleTypeSelection';
import { VehicleTypeInfoService } from 'app/crrc/basics/vehicle-type-info/vehicle-type-info.service';
import { MessageService } from 'primeng/api';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
class City {
    label: string;
    value: any;
}
@Component({
    selector: 'jhi-bom-infomation',
    templateUrl: './bom-infomation.component.html',
    styleUrls: ['bom-infomation.scss'],
    providers: [MessageService]
})
export class BomInformationComponent1 implements OnInit, OnDestroy {
    currentAccount: any;
    qmsOrganizationInfos: IBomInformation;
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
    // 测试数据
    files4: TreeNode[];
    selectedNode2: TreeNode;
    cols: any[];
    qmsOrganizationInfo: BomInformation;
    // 模糊查询物料编码
    vagueOrganizationCd: String = '';
    // 模糊查询物料名称
    vagueOrganizationName: String = '';
    // 上级物料
    parentMaterielCd: any = 0;
    // 上级物料名称
    parentMaterielName = '';
    // 物料编码
    materielCd: any;
    // 物料名称
    materielName = '';
    // 物料属性
    productMode = '';
    // 车型ID
    carTypeIdHidden: any;
    // 车型
    carType: any;
    // 车型名称
    carTypeName: any;
    // 隐藏查询
    hiddenCarType: any;
    // 隐藏物料ID
    materielIdInfo: any;

    // 备注
    remark = '';
    // 区分
    organizationCdQF: String = '';
    // 区分增加修改
    qfCreaUpda: String = '1';
    // 消息初始化
    msgs: Message[] = [];
    // 物料属性下拉框
    selectedCarType: any;
    // 判断点击添加
    addJudge: String = '0';
    // 车型下拉框初始值
    carTypeSelect: any;
    // 遮盖层
    maskingLayer: any = false;

    constructor(
        private bomInformationService: BomInformationService,
        private principal: Principal,
        private modalsService: NgbModal,
        private qmsVehicleTypeInfoService: VehicleTypeInfoService,
        private messageService: MessageService,
        private eventManager: JhiEventManager,
        public activeModal: NgbActiveModal,
    ) {
        this.itemsPerPage = ITEMS_PER_PAGE;
        this.selectedCarType = null;
        this.hiddenCarType = null;
    }

    /**
     * 一览数据获取
     */
    loadAll() {
        // 模糊查询字段
        const param: any = {
            'organizationCd': this.vagueOrganizationCd, 'organizationName': this.vagueOrganizationName
        };
        // 取得车型下拉框值
        this.bomInformationService.getCarTypeInfo().subscribe(data => {
            this.carTypeSelect = data;
        })
        // 树数据获取
        this.bomInformationService
            .selectAllInfo(param)
            .subscribe(data => {
                // 返回结果集
                this.files4 = data.qmsOrganization;

            });
    }

    loadCarsLazy(event) {
        this.page = event.first / this.itemsPerPage + 1;
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
     * 初始化
     */
    ngOnInit() {
        this.cols = [
            { field: 'organizationName', header: '物料名称' }
        ];
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInQmsOrganizationInfos();
    }
    // 下拉框选择事件
    setCarInfo(event) {
        if (event.value === null) {
            this.productMode = '';
        } else {
            this.productMode = event.value;
        }
    }
    selectVehicle(event) {
        if (event.value === null) {
            this.carType = '';
        } else {
            this.carType = event.value;
        }
    }
    registerChangeInQmsOrganizationInfos() {
        this.eventSubscriber = this.eventManager.subscribe('qmsOrganizationInfoListModification', response => this.loadAll());
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IBomInformation) {
        return item.id;
    }
    /**
     * 物料编码焦点离开取得物料名称
     */
    getMaterielNameInfo() {
        // 取得选中数据
        this.bomInformationService.findMaterielName(this.materielCd)
            .subscribe((materielNameInfoBack: HttpResponse<IQmsMateriel>) => {
                if (materielNameInfoBack.body.id !== null) {
                    this.materielName = materielNameInfoBack.body.materielName;
                    this.materielIdInfo = materielNameInfoBack.body.id;
                    this.productMode = materielNameInfoBack.body.productMode;
                } else {
                    this.msgs.push({ severity: 'error', summary: '提示', detail: '物料编码不存在' });
                    this.materielName = '';
                }
            });
    }
    /**
    * 焦点离开
    */
    getVehicleClassNameInfo() {
        this.bomInformationService.findCarType(this.carType).subscribe(datas => {
            // 判断是否取到值
            if (datas.body.id !== null) {
                this.carTypeIdHidden = datas.body.id;
                this.carType = datas.body.vehicleType;
                this.carTypeName = datas.body.vehicleTypeName;
            } else {
                this.msgs.push({ severity: 'error', summary: '提示', detail: '车型不存在' });
            }

        })
    }
    /**
     * 选中行
     * @param event
     */
    nodeSelect(event) {
        // 取得选中数据
        this.bomInformationService.find(event.node.data.id)
            .subscribe((organizationResponse: HttpResponse<IBomInformation>) => {
                // 详细信息返回
                this.qmsOrganizationInfos = organizationResponse.body;
                // 上级物料赋值
                this.parentMaterielCd = this.qmsOrganizationInfos.parentMaterielID;
                // 上级物料名称赋值
                this.parentMaterielName = this.qmsOrganizationInfos.parentMaterielName;
                // 物料编码
                this.materielCd = this.qmsOrganizationInfos.materielCd;
                // 物料名称
                this.materielName = this.qmsOrganizationInfos.materielName;
                this.materielIdInfo = this.qmsOrganizationInfos.mId;
                this.carType = this.qmsOrganizationInfos.vehicleId;

                // this.selectedCarType = this.qmsOrganizationInfos.vehicleId + '';
                this.hiddenCarType = this.qmsOrganizationInfos.vehicleId;
                this.carTypeName = this.qmsOrganizationInfos.vehicleName;
                this.carTypeIdHidden = this.qmsOrganizationInfos.vId;
                // 备注
                this.remark = this.qmsOrganizationInfos.remark;
                // 判断物料编码是否可编辑
                if (this.materielCd !== '') {
                    this.organizationCdQF = '0';
                }
                // 区分新增还是编辑 1：新增 0：编辑
                this.qfCreaUpda = '0';

                // 复原添加判断
                this.addJudge = '0';

            });

    }

    /**
     * 确认
     */
    selected() {
        // 保存返回到上一页
        if(this.selectedNode2==null){
            this.msgs.push({ severity: 'error', summary: '提示', detail: '请选择一条数据' });
        }else{
            this.activeModal.close(this.qmsOrganizationInfos);
            
        }
        // console.log(this.qmsOrganizationInfos);
        
    }

    /**
     * 去掉选中
     * @param event
     */
    nodeUnselect(event) {
        // alert(event.node.data.name);
        // 数据清空
        this.parentMaterielCd = '';
        this.parentMaterielName = '';
        this.materielCd = '';
        this.materielName = '';
        this.productMode = '';
        this.remark = '';
        this.carType = '';
        this.hiddenCarType = null;
        // 判断物料编码是否可以编辑
        if (this.materielCd === '') {
            this.organizationCdQF = '';
        }
        // 新增和编辑区分 1：新增 0：编辑
        this.qfCreaUpda = '1';
        // 清空下拉框
        this.selectedCarType = null;
        this.carTypeName = '';
        this.carTypeIdHidden = '';
        // 复原添加判断
        this.addJudge = '0';
    }

    /**
     * 点击添加按钮
     */
    addInfo() {

        if (this.addJudge === '0' && this.materielIdInfo !== '' && this.carTypeIdHidden !== '') {
            // 物料编码赋给上级物料
            this.parentMaterielCd = this.materielIdInfo;
            this.parentMaterielName = this.materielName;
            this.addJudge = '1';
        }

        // 其余赋控制
        this.materielCd = '';
        this.materielName = '';
        this.productMode = '';
        this.remark = '';
        // 新增和编辑区分 1：新增 0：编辑
        this.qfCreaUpda = '1';
        if (this.materielCd === '') {
            this.organizationCdQF = '';
        }
    }

    // 清空检索条件
    emptyInfo() {
        this.vagueOrganizationCd = '';
        this.vagueOrganizationName = '';
        this.loadAll();
    }
    /**
     * 保存
     */
    save() {
        // alert(this.parentCd + '+' + this.organizationCd + '+' + this.organizationName + '+' + this.attribute + '+' + this.remark)
        this.msgs = [];
        // 判断物料属性不能为空
        if (this.carType === '') {
            this.msgs.push({ severity: 'error', summary: '提示', detail: '车型不能为空' });
            return false;
        }
        // 判断物料ID不能为空
        if (this.materielCd === '') {
            this.msgs.push({ severity: 'error', summary: '提示', detail: '物料编码不能为空' });
            return false;
        }
        // 判断物料名称不能为空
        // if (this.materielName === '') {
        //     this.msgs.push({ severity: 'error', summary: '提示', detail: '物料名称不能为空' });
        //     return false;
        // }
        // this.qmsOrganizationInfo = this.qmsOrganizationInfos
        this.qmsOrganizationInfo = new BomInformation;

        this.qmsOrganizationInfo.parentMaterielID = this.parentMaterielCd;

        this.qmsOrganizationInfo.materielId = this.materielIdInfo;
        this.qmsOrganizationInfo.materielName = this.materielName;
        this.qmsOrganizationInfo.remark = this.remark;
        this.qmsOrganizationInfo.vehicleId = this.carTypeIdHidden;

        // 判断是新增还是编辑  1：新增 0：编辑
        if (this.qfCreaUpda === '0') {
            this.qmsOrganizationInfo.id = this.qmsOrganizationInfos.id;
            this.qmsOrganizationInfo.makeTime = this.qmsOrganizationInfos.makeTime;
            this.qmsOrganizationInfo.makeUser = this.qmsOrganizationInfos.makeUser;
            this.subscribeToSaveResponse(this.bomInformationService.update(this.qmsOrganizationInfo));
        } else {
            this.qmsOrganizationInfo.id = null;
            this.subscribeToSaveResponse(this.bomInformationService.create(this.qmsOrganizationInfo));
        }

    }
    // 新增和编辑返回信息
    private subscribeToSaveResponse(result: Observable<HttpResponse<IBomInformation>>) {
        result.subscribe((res: HttpResponse<IBomInformation>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError(res));
    }
    /**
     * 更新或新增成功
     */
    private onSaveSuccess() {
        // this.router.navigate(['/']);
        this.clearInfo();
    }

    /**
     * 更新或新增失败
     */
    private onSaveError(res) {
        // 错误信息赋空
        this.msgs = [];
        // 判断返回错误信息
        if (res.error.title === 'codingDuplication') {
            // 打印错误信息
            this.msgs.push({ severity: 'error', summary: '提示', detail: '物料编码已存在请重新输入' });
        }

    }
    /**
     * 删除节点
     */
    deleteNode() {

        this.msgs = [];
        // 判断现象ID不能为空
        if (this.materielCd === '' || this.materielCd === undefined) {
            this.msgs.push({ severity: 'error', summary: '提示', detail: '请选中需要删除的数据' });
            return false;
        }
        this.maskingLayer = true;
        this.messageService.clear();
        this.messageService.add({ key: 'c', sticky: true, severity: 'shibai', summary: '删除提示', detail: '你确定要删除物料' + this.materielName + '吗？' });

    }

    /**
     * 删除确认
     */
    onConfirm() {
        this.messageService.clear('c');
        this.bomInformationService.updateCarType(this.materielIdInfo).subscribe(data => {
            if (data === '0' || data === 0) {
                this.msgs.push({ severity: 'success', summary: '成功', detail: '删除成功' });
            } else {
                this.msgs.push({ severity: 'error', summary: '失败', detail: '删除失败' });
            }
            this.maskingLayer = false;
            this.clearInfo();
        })
    }
    /**
     * 删除取消
     */
    onReject() {
        this.maskingLayer = false;
        this.messageService.clear('c');
    }

    /**
     * 导入
     */
    ImportCSV() {
        document.getElementById('file').click();
    }
    /**
     * 文件上传
     * @param event 
     */
    upload(event: any) {
        // 如果没有文件上传则返回
        if (event.target.files.length === 0) {

            return;
        } else {
            this.bomInformationService.importExcelFile('/upload', event.target.files).subscribe(
                data => {
                    if (data.status === 'success') {
                        if (data.flag === '0') {
                            this.msgs.push({ severity: 'success', summary: '成功', detail: data.message });
                        } else {
                            this.msgs.push({ severity: 'success', summary: '成功', detail: data.message });
                            for (let f = 0; f < data.message.length; f++) {
                                this.msgs.push({ severity: 'error', summary: '', detail: data.message[f] });
                            }
                        }

                    } else {
                        this.msgs.push({ severity: 'error', summary: 'error', detail: data.message });
                    }
                    // 清空excel
                    event.target.value = '';
                    this.clearInfo();
                },
                error => {
                    // 清空excel
                    event.target.value = '';
                }
            );
        }
    }
    // 数据清空
    clearInfo() {
        // 物料编码赋值给上级物料
        this.parentMaterielCd = '';
        this.parentMaterielName = '';
        // 其余赋空值
        this.materielCd = '';
        this.materielName = '';
        this.productMode = '';
        this.remark = '';
        // 新增和编辑区分 1：新增 0：编辑
        this.qfCreaUpda = '0';
        if (this.materielCd === '') {
            this.organizationCdQF = '';
        }
        // 清空下拉框
        this.selectedCarType = null;
        this.carTypeName = '';
        this.carTypeIdHidden = '';
        // 清空选中
        this.selectedNode2 = null;
        // 复原添加判断
        this.addJudge = '0';
        this.carType = '';
        this.hiddenCarType = null;
        this.loadAll();
    }

    // 跳转Popup
    typeMaterielCd() {
        this.modalsService.open(MaterialSelectionComponent as Component, { backdrop: 'static', keyboard: false, size: 'lg' }).result.then(
            (result) => {
                if (result !== undefined) {

                    this.materielIdInfo = result.id;
                    this.materielCd = result.materielCd;
                    this.materielName = result.materielName;
                }
            }
        );
    }

    // 跳转Popup
    typeVehicleClass() {
        this.modalsService.open(VehicleTypeSelectionComponent as Component, { backdrop: 'static', keyboard: false, size: 'lg' }).result.then(
            (result) => {
                if (result !== undefined) {

                    this.carTypeIdHidden = result.id;
                    this.carType = result.vehicleType;
                    this.carTypeName = result.vehicleTypeName;
                }
            }
        );
    }
}
