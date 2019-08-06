import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { JhiEventManager, } from 'ng-jhipster';
import { IBomInformation, BomInformation } from 'app/shared/model/bom-information.model';
import { Principal } from 'app/core';
import { ProcessInformationsService } from './process-informations.service';
import { SERVER_API_URL } from 'app/app.constants';
import { TreeNode } from 'primeng/api';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Message } from 'primeng/components/common/api';
import { IQmsMateriel } from 'app/shared/model/qms-materiel.model';
import { MaterialSelectionComponent } from 'app/popup/materialSelection';
import { IQmsProcessInformations } from 'app/shared/model/process-informations';
import { ProcessSelectionPopupComponent } from './process-select-popup-component';
import { MessageService } from 'primeng/api';
import { HttpClient } from '@angular/common/http';
import { QmsMaterielService } from 'app/crrc/basics/materiel/qms-materiel.service'

@Component({
    selector: 'jhi-process-informations',
    templateUrl: './process-informations.component.html',
    styleUrls: ['process-informations.scss'],
    providers: [MessageService]
})
export class ProcessInformationsComponent implements OnInit, OnDestroy {
    currentAccount: any;
    qmsOrganizationInfos: IBomInformation;
    qmsProcessInfosRight: IQmsProcessInformations[];
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
    digiFiles: any;
    digiFilesGet: any;
    onDelete: any;
    startMonth: string;
    startDay: string;
    startHH: string;
    startMM: string;
    startSS: string;
    strs: String[]
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
    // 车型
    carType: any;
    // 车型名称
    carTypeName: any;
    // 隐藏查询
    hiddenCarType: any;
    // 隐藏物料ID
    materielIdInfo: any;
    // 隐藏右半部物料ID
    hiddenRightMaterielId: any = '';
    hiddenRightMaterielCd: any = '';
    hiddenRightMaterielName: any = '';
    // 默认工艺按钮判断
    hiddendefaultProcess: any = '1';
    // 遮盖层
    maskingLayer: any = false;
    maskingLayerLodding = false;
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
    // 页面跳转参数
    paramInfo: any;
    // 工艺编码条件检索
    technologyCd = '';
    // 工艺名称条件检索
    technologyName = '';
    // 删除id
    deleteId = '';
    // 文件地址
    fileAddress = '';
    loading = false;
    constructor(
        private bomInformationService: ProcessInformationsService,
        private principal: Principal,
        private qmsMaterielService: QmsMaterielService,
        private modalsService: NgbModal,
        private http: HttpClient,
        private activatedRoute: ActivatedRoute,
        private messageService: MessageService,
        private eventManager: JhiEventManager
    ) {
        this.itemsPerPage = 7;
        this.selectedCarType = null;
        this.hiddenCarType = null;
        this.digiFiles = [];
        this.digiFilesGet = [];
        this.onDelete = [];
        this.strs = [];
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
        if (this.technologyCd !== '' && this.technologyCd !== undefined) {
            // 检索该物料下的工艺编码是否存在
            this.bomInformationService.selectExistenceInfo({ masterCd: this.hiddenRightMaterielId, technologyCd: this.technologyCd }).subscribe(data => {

                this.hiddendefaultProcess = data.isDefault;
            })
        }
    }

    /**
     * 初始化
     */
    ngOnInit() {

        // 路由跳转 接收参数
        this.eventSubscriber = this.activatedRoute.queryParams.subscribe((params: Params) => {

            // 页面跳转状态参数
            this.hiddenRightMaterielId = params['MId'];
            this.hiddenRightMaterielCd = params['MCd'];
            this.hiddenRightMaterielName = params['MName'];
            this.technologyCd = params['Tcd'];
            this.technologyName = params['TName'];

            // 页面跳转销售发货订单orderId
            // this.loadAll();
        });
        // 文件地址
        this.qmsMaterielService.getMasterList({ kbnCd: 'M18' })
            .subscribe(data => {
                this.fileAddress = data[0].label;
            })
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
    * 懒加载取数据
    * @param event
    */
    loadCarsLazy(event) {
        this.itemsPerPage = 7;
        this.page = event.first / this.itemsPerPage + 1;

        if (this.hiddenRightMaterielId !== '') {
            this.rightListInfo('1');
        }

    }
    rightSelect() {
        const param: any = {
            'materielCd': this.hiddenRightMaterielId, 'pageNumber': this.page, 'sizeNumber': this.itemsPerPage,
        };
        // 取得选中数据
        this.bomInformationService.rightTableInfo(param)
            .subscribe((organizationResponse: HttpResponse<IBomInformation[]>) => {
                // 详细信息返回
                this.qmsProcessInfosRight = organizationResponse.body;
                if (this.qmsProcessInfosRight.length !== 0) {
                    this.queryCount = this.qmsProcessInfosRight[0].numberCount
                } else {
                    this.queryCount = 0;
                }
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
     * 选中行
     * @param event
     */
    nodeSelect(event) {

        this.hiddenRightMaterielId = event.node.data.organizationCd;
        this.hiddenRightMaterielCd = event.node.data.materielCd;
        this.hiddenRightMaterielName = event.node.data.organizationName;

    }

    /**
     * 去掉选中
     * @param event
     */
    nodeUnselect(event) {
        // alert(event.node.data.name);
        // 数据清空
        this.hiddendefaultProcess = '1';
        this.hiddenRightMaterielId = '';
        this.hiddenRightMaterielCd = '';
        this.hiddenRightMaterielName = '';
        this.parentMaterielCd = '';
        this.parentMaterielName = '';
        this.materielCd = '';
        this.materielName = '';
        this.productMode = '';
        this.remark = '';
        this.carType = '';
        this.hiddenCarType = null;
        this.queryCount = 0;
        this.qmsProcessInfosRight = null;
        this.technologyCd = '';
        this.technologyName = '';
        // 判断物料编码是否可以编辑
        if (this.materielCd === '') {
            this.organizationCdQF = '';
        }
        // 新增和编辑区分 1：新增 0：编辑
        this.qfCreaUpda = '1';
        // 清空下拉框
        this.selectedCarType = null;
        // 复原添加判断
        this.addJudge = '0';
    }

    /**
     * 点击添加按钮
     */
    addInfo() {

        if (this.addJudge === '0' && this.materielCd !== '' && this.selectedCarType !== null) {
            // 物料编码赋给上级物料
            this.parentMaterielCd = this.materielCd;
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

    /**
     * 删除节点
     */
    deleteNode() {

        this.msgs = [];
        // 判断现象ID不能为空
        if (this.materielCd === '') {
            this.msgs.push({ severity: 'error', summary: '提示', detail: '请选中需要删除的数据' });
            return false;
        }

        this.bomInformationService.updateCarType(this.materielCd).subscribe(data => {
            if (data === '0' || data === 0) {
                this.msgs.push({ severity: 'success', summary: '成功', detail: '删除成功' });
            } else {
                this.msgs.push({ severity: 'error', summary: '失败', detail: '删除失败' });
            }
            this.clearInfo();
        })
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
        this.hiddenRightMaterielId = '';
        this.hiddenRightMaterielCd = '';
        this.hiddenRightMaterielName = '';
        this.parentMaterielCd = '';
        this.parentMaterielName = '';
        this.hiddendefaultProcess = '1';
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
        // 清空选中
        this.selectedNode2 = null;
        // 复原添加判断
        this.addJudge = '0';
        this.carType = '';
        this.hiddenCarType = null;
        this.queryCount = 0;
        this.qmsProcessInfosRight = null;
        this.technologyCd = '';
        this.technologyName = '';
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
    // 跳转Popup工艺选择
    processSelect() {
        this.msgs = [];
        if (this.hiddenRightMaterielId === undefined || this.hiddenRightMaterielId === '') {
            this.msgs.push({ severity: 'warn', summary: '提示', detail: '请选择一条数据' });
            return false;
        }
        this.paramInfo = { 'hiddenRightMaterielId': this.hiddenRightMaterielId };
        const modalRef = this.modalsService.open(ProcessSelectionPopupComponent as Component, { backdrop: 'static', keyboard: false, size: 'lg' });
        modalRef.componentInstance.paramInfo = this.paramInfo;
        modalRef.result.then(
            (result) => {
                if (result !== null && result !== undefined) {

                    this.technologyCd = result.technologyCd;
                    this.technologyName = result.technologyName;
                    this.hiddendefaultProcess = result.isDefault;

                    if (result.remark === '复制工艺') {
                        this.maskingLayerLodding = true;
                        // 复制更新数据
                        this.bomInformationService.copyProcessInfo({
                            technologyCd: result.technologyCd, technologyName: result.technologyName,
                            hiddenRightMaterielId: this.hiddenRightMaterielId, copyTechnologyCd: result.reserveFirst
                        }).subscribe(data => {
                            if (data.error === '更细失败') {
                                this.maskingLayerLodding = false;
                                this.messageService.add({ severity: 'error', summary: '提示', detail: '数据复制失败' });

                            } else {
                                // 附件信息
                                this.bomInformationService.getEnclosureList(result.id)
                                    .subscribe((backData: HttpResponse<any>) => {
                                        this.digiFilesGet = backData.body.qmsEnclosure;
                                        let backInfo = [];
                                        backInfo = data.success.split(',');
                                        let backInfoOne = [];
                                        backInfoOne = data.successOne.split(',');
                                        let backOrderNo = [];
                                        backOrderNo = data.backStringOrderNo.split(',');
                                        for (let b = 0; b < backInfoOne.length; b++) {

                                            for (let a = 0; a < this.digiFilesGet.length; a++) {
                                                if (Number(backInfoOne[b]) === Number(this.digiFilesGet[a].inspectionInfoId)) {

                                                    this.onDelete.push(this.digiFilesGet[a].enclosureAddress);
                                                    this.strs = [];
                                                    this.strs = this.digiFilesGet[a].enclosureAddress.split('/');
                                                    const delParams = { fileId: this.digiFilesGet[a].enclosureAddress, newwenijan: this.hiddenRightMaterielCd + '/' + result.technologyCd + '/' + backOrderNo[b] };
                                                    this.http.get(this.fileAddress + '/imgServer/copyFile', { params: delParams }).toPromise().then(
                                                        data1 => {

                                                        }
                                                    );
                                                    let params = {}
                                                    params = {
                                                        inspectionInfoId: backInfo[b],
                                                        inspectionKbn: '3',
                                                        enclosureAddress: this.hiddenRightMaterielCd + '/' + result.technologyCd + '/' + backOrderNo[b] + '/' + this.strs[3]
                                                    }

                                                    this.http.get(SERVER_API_URL + 'api/process-informations-infos/uploadFile', { params }).toPromise().then(
                                                        data2 => {
                                                            console.log(data2);
                                                        }
                                                    );
                                                }
                                            }
                                        }

                                        this.maskingLayerLodding = false;
                                        this.rightListInfo('0');
                                    })

                                // this.messageService.add({ severity: 'success', summary: '提示', detail: '数据复制成功' });
                                // this.hiddendefaultProcess = '1';


                            }
                        })
                    } else {
                        this.rightListInfo('0');
                    }

                }

            }
        );
    }
    timeback() {
        const d = new Date();
        if (d.getMonth() + 1 < 10) {
            this.startMonth = '0' + (d.getMonth() + 1);
        } else {
            this.startMonth = '' + (d.getMonth() + 1);
        }
        if (d.getDate() < 10) {
            this.startDay = '0' + d.getDate();
        } else {
            this.startDay = '' + d.getDate();
        }
        if (d.getHours() < 10) {
            this.startHH = '0' + d.getHours();
        } else {
            this.startHH = '' + d.getHours();
        }
        if (d.getMinutes() < 10) {
            this.startMM = '0' + d.getMinutes();
        } else {
            this.startMM = '' + d.getMinutes();
        }
        if (d.getSeconds() < 10) {
            this.startSS = '0' + d.getSeconds();
        } else {
            this.startSS = '' + d.getSeconds();
        }

        const fileName = d.getFullYear() + this.startMonth + this.startDay + this.startHH + this.startMM + this.startSS;

        return fileName;
    }
    /**
     * 数据删除
     */
    delete(bomId, processName) {
        this.deleteId = bomId;
        this.maskingLayer = true;
        this.messageService.clear();
        this.messageService.add({ key: 'c', sticky: true, severity: 'shibai', summary: '确认删除', detail: '你确定要删除工序' + processName + '吗？' });
    }
    /**
     * 删除确认
     */
    onConfirm() {
        this.messageService.clear('c');
        // 删除执行
        // 根据id取得附件表信息
        this.bomInformationService.getEnclosure(this.deleteId)
            .subscribe((backData: HttpResponse<any>) => {
                this.digiFiles = backData.body.qmsEnclosure;
                for (let a = 0; a < this.digiFiles.length; a++) {
                    this.onDelete.push(this.digiFiles[a].enclosureAddress);
                }
                // 数据删除
                this.bomInformationService.deleteAllInfo(Number(this.deleteId)).subscribe(data => {

                    if (data.body === 1) {
                        this.messageService.add({ severity: 'error', summary: '提示', detail: '生产检验表中存在该工艺id，无法删除' });
                    } else if (data.body === 5) {
                        this.messageService.add({ severity: 'error', summary: '提示', detail: '数据插入失败' });
                    } else {

                        if (this.digiFiles.length !== 0) {
                            for (const enclosureAddress of this.onDelete) {
                                const delParams = { fileId: enclosureAddress };
                                this.http.get(this.fileAddress + '/imgServer/deleteFile', { params: delParams }).subscribe(
                                    data => {
                                        console.log(data);


                                    }
                                );
                            }
                        }
                    }
                    this.maskingLayer = false;
                    this.rightListInfo('1');
                })

            })

    }
    /**
     * 删除取消
     */
    onReject() {
        this.deleteId = '';
        this.maskingLayer = false;
        this.messageService.clear('c');
    }
    /**
     * 默认工艺修改
     * 
     */
    changeDefaultProcess() {
        // 修改默认工艺
        this.bomInformationService.updateDefaultProcessInfo({ technologyCd: this.technologyCd, hiddenRightMaterielId: this.hiddenRightMaterielId })
            .subscribe(data => {
                if (data == 2) {
                    this.messageService.add({ severity: 'error', summary: '提示', detail: '默认工艺修改失败' });
                } else if (data == 3) {
                    this.messageService.add({ severity: 'error', summary: '提示', detail: '默认工艺修改失败' });
                } else {

                    this.messageService.add({ severity: 'success', summary: '提示', detail: '默认工艺修改成功' });
                    this.hiddendefaultProcess = '1';
                    this.rightListInfo('0');
                }
            })
    }
    /**
     * 数据获取
     */
    rightListInfo(checkInfo) {
        const param: any = {
            'materielCd': this.hiddenRightMaterielId, 'pageNumber': this.page, 'sizeNumber': this.itemsPerPage, "technologyCd": this.technologyCd
        };
        // 取得选中数据
        this.bomInformationService.rightTableInfo(param)
            .subscribe(datas => {
                // 详细信息返回
                this.qmsProcessInfosRight = datas.entryControlDtailsInfo;
                if (this.qmsProcessInfosRight.length !== 0) {
                    this.queryCount = this.qmsProcessInfosRight[0].numberCount
                } else {
                    this.queryCount = 0;

                    if (checkInfo === '1') {
                        this.clearInfo();
                    }

                }

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
}
