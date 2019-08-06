import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { HttpResponse, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, Subscription } from 'rxjs';

import { IQmsVehicleTypeInfo, QmsVehicleTypeInfo } from 'app/shared/model/qms-vehicle-type-info.model';
import { ProcessInformationsService } from './process-informations.service';
import { Message } from 'primeng/components/common/api';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { QmsMaterielService } from '../materiel/qms-materiel.service'
import { VehicleTypeInfoService } from '../vehicle-type-info/vehicle-type-info.service'
import { JhiAlertService, JhiParseLinks } from 'ng-jhipster';
import { MessageService } from 'primeng/api';
import { HttpClient } from '@angular/common/http';

import { QmsPartsAssemblyRelationOwner } from 'app/shared/model/qms-parts-assembly-relationOwner..model';

import { ProcessSelectionComponent } from 'app/popup/processSelection/processSelection.component';
import { LocalStorageService } from 'ngx-webstorage';
import { SERVER_API_URL } from 'app/app.constants';
import { Md5 } from "ts-md5/dist/md5";
import { IQmsEntryInspection } from 'app/shared/model/qms-entry-inspection.model';
import { IQmsBomTechnology, QmsBomTechnology } from 'app/shared/model/qms-bom-technology.model';
import { ProcessInfomations } from 'app/shared/model/process-informations.model';


@Component({
    selector: 'jhi-process-informations-detail.component',
    templateUrl: './process-informations-detail.component.html',
    styleUrls: ['./process-informations.scss', './file.scss'],
    providers: [MessageService]
})
export class ProcessInformationsDetailComponent implements OnInit {
    qmsVehicleTypeInfo: IQmsBomTechnology;
    qmsVehicleTypeInfos: IQmsVehicleTypeInfo[];
    qmsEntryInspection: IQmsEntryInspection;
    private eventSubscriber: Subscription;
    // 装配关系
    qmsPartsAssemblyRelationOwner = [];
    isSaving: boolean;
    makeTime: string;
    modifyTime: string;
    vehicleClass: any = '';
    vehicleClassName: any = '';
    qualityControlDetails = [];
    selectedCar3: any;
    // 消息初始化
    msgs: Message[] = [];
    // 工时定额单位
    workTime: any[];
    // 专检角色
    selectInspectionRole: any[];
    // 是否实验工序
    selectTest: any[];
    // 是否检验工序
    selectInspection: any[];
    // 工序特证
    selectProcesssPecific: any[];
    // 结果区分
    selectResultDifferentiation: any[];
    // abc分类
    selecttABCType: any[];
    // 互检角色
    selectMutualRoles: any[];
    // 隶属单位
    selectSubordinateUnits: any[];
    // 作业班组
    selectAllWorkTeam: any[];
    // 编辑区分
    editDistinguish = false;
    // 质检类型
    checkedC: boolean = false;
    checkedM: boolean = false;
    checkedS: boolean = false;
    queryCount: any;
    totalItems: any;
    links: any;
    itemsPerPage: any;
    page: any;
    // label信息
    labelTitle: any;
    materielId = '';
    materielCd = '';
    materielName = '';
    technologyCd = '';
    technologyName = '';
    processId = '';
    processCd = '';
    processName = '';


    // 文件上传以上
    num: any;
    data: any;
    content: any;
    goMaterialSelect: boolean;
    video = new ArrayBuffer(10240);
    startMonth: string;
    startDay: string;
    startHH: string;
    startMM: string;
    startSS: string;
    showModal: boolean;
    docHtml: any;
    digiFiles: any;
    uploading: boolean;
    @Output() closeModal = new EventEmitter<boolean>();

    predicate: any;
    previousPage: any;
    reverse: any;
    queryParams: any;
    acceptFile: any;
    onDelete: any;
    confirmModal: any;
    checkReturn: any;
    infoId: any;
    isEdit: boolean;
    filePath: any;
    tmpFiles: any;
    constructor(private processInformationsService: ProcessInformationsService, private translate: TranslateService,
        private qmsMaterielService: QmsMaterielService,
        private VehicleTypeInfoService: VehicleTypeInfoService,
        private parseLinks: JhiParseLinks,
        private localStorage: LocalStorageService,
        private http: HttpClient,
        private jhiAlertService: JhiAlertService,
        private messageService: MessageService,
        private modalsService: NgbModal,
        private activatedRoute: ActivatedRoute,
        private router: Router) {
        this.tmpFiles = [];
        this.num = 0;
        this.content = '';
        this.goMaterialSelect = false;
        this.showModal = false;
        this.docHtml = '';
        this.digiFiles = [];
        this.uploading = false;
        this.acceptFile = 'image/png, image/jpeg, image/jpg, .doc, .pdf, .mp4';
        this.onDelete = [];
        this.confirmModal = false;
        this.checkReturn = {};
        this.filePath = '';

        this.itemsPerPage = 999;
        this.page = 1;
        this.previousPage = 0;
        this.reverse = 'id,asc';
        this.predicate = 'id';
        this.queryParams = {
            inspectionInfoId: '1',
            inspectionKbn: '2',
            page: this.page,
            limit: this.itemsPerPage,
        };
    }

    ngOnInit() {

        this.labelTitle = {
            'tab1': this.translate.get('fccApp.qmsBomTechnologyInfo.tab.wssentialInformation')['value'],
            'tab2': this.translate.get('fccApp.qmsBomTechnologyInfo.tab.qualituConItemPoint')['value'],
            'tab3': this.translate.get('fccApp.qmsBomTechnologyInfo.tab.assemblyRelationship')['value'],
            'tab4': this.translate.get('fccApp.qmsBomTechnologyInfo.tab.processDocuments')['value']
        };
        this.translate.onLangChange.subscribe((event: LangChangeEvent) => {

            this.labelTitle = {
                'tab1': this.translate.get('fccApp.qmsBomTechnologyInfo.tab.wssentialInformation')['value'],
                'tab2': this.translate.get('fccApp.qmsBomTechnologyInfo.tab.qualituConItemPoint')['value'],
                'tab3': this.translate.get('fccApp.qmsBomTechnologyInfo.tab.assemblyRelationship')['value'],
                'tab4': this.translate.get('fccApp.qmsBomTechnologyInfo.tab.processDocuments')['value']
            };
        });
        // 工时定额单位
        this.qmsMaterielService.getMasterList({ kbnCd: 'M10' })
            .subscribe(data => {
                this.workTime = data
            })

        // 是否试验工序
        this.qmsMaterielService.getMasterList({ kbnCd: 'M04' })
            .subscribe(data => {
                this.selectTest = data

            })
        // 是否检验工序
        this.qmsMaterielService.getMasterList({ kbnCd: 'M04' })
            .subscribe(data => {
                this.selectInspection = data
            })
        // 工序特征
        this.qmsMaterielService.getMasterList({ kbnCd: 'M12' })
            .subscribe(data => {
                this.selectProcesssPecific = data
            })
        // 结果区分
        this.qmsMaterielService.getMasterList({ kbnCd: 'M06' })
            .subscribe(data => {
                this.selectResultDifferentiation = data
            })
        // ABC分类
        this.qmsMaterielService.getMasterList({ kbnCd: 'M16' })
            .subscribe(data => {
                this.selecttABCType = data
            })
        // 专检角色
        this.processInformationsService.getCarTypeInfo()
            .subscribe(data => {
                this.selectInspectionRole = data;
                this.selectMutualRoles = data;
            })
        // 隶属单位
        this.processInformationsService.getSubordinateUnits()
            .subscribe(data => {
                this.selectSubordinateUnits = data
            })
        // 作业班组
        this.processInformationsService.getAllWorkTeam()
            .subscribe(data => {
                this.selectAllWorkTeam = data
            })
        // const item: QmsBomTechnology = new QmsBomTechnology();
        // this.qmsPartsAssemblyRelationOwner.push(item);

        // const itemS: ProcessInfomations = new ProcessInfomations();
        // this.qualityControlDetails.push(itemS);

        this.isSaving = false;
        this.qmsVehicleTypeInfo = new QmsVehicleTypeInfo();
        // this.activatedRoute.data.subscribe(({ qmsVehicleTypeInfo }) => {
        //     this.qmsVehicleTypeInfo = qmsVehicleTypeInfo;
        //     this.qmsVehicleTypeInfo = new QmsVehicleTypeInfo();

        // });
        // 路由跳转 接收参数
        this.eventSubscriber = this.activatedRoute.queryParams.subscribe((params: Params) => {

            // 页面跳转状态参数
            this.qmsVehicleTypeInfo.materielId = params['MId'];
            this.materielCd = params['MCd'];
            this.materielName = params['MName'];
            this.qmsVehicleTypeInfo.technologyCd = params['Tcd'];
            this.qmsVehicleTypeInfo.technologyName = params['TName'];

            if (params['Code'] === '1') {
                this.editDistinguish = true;
                // 根据bomId取得基本信息、质量控制项点信息、装配关系信息和工艺文件信息
                if (undefined !== params['BomId']) {
                    this.getEditInfo(params['BomId'])
                }
            }
            // 页面跳转销售发货订单orderId
            // this.loadAll();
        });
    }

    previousState() {
        // window.history.back();
        this.router.navigate(['/process-informations']);
        this.localStorage.store('oneselect', {})
    }
    /**
     * 焦点离开
     */
    getprocessCdNameInfo() {
        this.processInformationsService.findProcessCd({ "orderNo": '', "processCd": this.processCd }).subscribe(datas => {
            // 判断是否取到值
            if (datas.body !== 0) {
                this.vehicleClass = datas.body.vehicleClass;
                this.vehicleClassName = datas.body.vehicleClassName;
            } else {
                this.msgs.push({ severity: 'error', summary: '提示', detail: '工序编码不存在' });
            }

        })
    }
    /**
     * 取得编辑信息
     * 
     * @param bomIdInfo 
     */
    getEditInfo(bomIdInfo) {
        this.processInformationsService.getBomEditInfo(bomIdInfo)
            .subscribe((backData: HttpResponse<any>) => {

                // 基本信息
                this.qmsVehicleTypeInfo = backData.body.qmsBomTechnology;
                // 质检类型
                const split = this.qmsVehicleTypeInfo.qcType.split(',');
                for (let sp = 0; sp < split.length; sp++) {
                    if (split[sp] === 'C') {
                        this.checkedC = true;
                    }
                    if (split[sp] === 'M') {
                        this.checkedM = true;
                    }
                    if (split[sp] === 'S') {
                        this.checkedS = true;
                    }
                }
                this.processInformationsService.findProcessCd({ "orderNo": backData.body.qmsBomTechnology.processId, "processCd": '' })
                    .subscribe(datas => {

                        this.processCd = datas.processCd;
                        this.processName = datas.processName;

                    })

                // 质量控制项点
                for (let q = 0; q < backData.body.qmsQualityControlDetails.length; q++) {
                    // 判断是否有值
                    if (this.qualityControlDetails.length !== 0) {

                        // 判断上一条是否有值
                        if (this.qualityControlDetails[this.qualityControlDetails.length - 1].inspectionItem !== undefined && this.qualityControlDetails[this.qualityControlDetails.length - 1].inspectionItem !== '') {
                            const item: ProcessInfomations = new ProcessInfomations();
                            this.qualityControlDetails.push(item);
                            // 判断是否检测是否选中
                            if (backData.body.qmsQualityControlDetails[q].isCheckObj === '1') {
                                this.qualityControlDetails[this.qualityControlDetails.length - 1].isCheckObj = true;
                            } else {
                                this.qualityControlDetails[this.qualityControlDetails.length - 1].isCheckObj = false;
                            }
                            this.qualityControlDetails[this.qualityControlDetails.length - 1].bomTechnologyId = backData.body.qmsQualityControlDetails[q].bomTechnologyId;
                            this.qualityControlDetails[this.qualityControlDetails.length - 1].id = backData.body.qmsQualityControlDetails[q].id;
                            this.qualityControlDetails[this.qualityControlDetails.length - 1].inspectionItem = backData.body.qmsQualityControlDetails[q].inspectionItem;
                            this.qualityControlDetails[this.qualityControlDetails.length - 1].technicalRequirement = backData.body.qmsQualityControlDetails[q].technicalRequirement;
                            this.qualityControlDetails[this.qualityControlDetails.length - 1].inspectionInstrument = backData.body.qmsQualityControlDetails[q].inspectionInstrument;
                            this.qualityControlDetails[this.qualityControlDetails.length - 1].placeDiff = backData.body.qmsQualityControlDetails[q].placeDiff;;
                            this.qualityControlDetails[this.qualityControlDetails.length - 1].abcType = backData.body.qmsQualityControlDetails[q].abcType;;
                            this.qualityControlDetails[this.qualityControlDetails.length - 1].standard = backData.body.qmsQualityControlDetails[q].standard;;
                            this.qualityControlDetails[this.qualityControlDetails.length - 1].upperDeviation = backData.body.qmsQualityControlDetails[q].upperDeviation;;
                            this.qualityControlDetails[this.qualityControlDetails.length - 1].lowerDeviation = backData.body.qmsQualityControlDetails[q].lowerDeviation;;
                        } else {
                            // 判断是否检测是否选中
                            if (backData.body.qmsQualityControlDetails[q].isCheckObj === '1') {
                                this.qualityControlDetails[this.qualityControlDetails.length - 1].isCheckObj = true;
                            } else {
                                this.qualityControlDetails[this.qualityControlDetails.length - 1].isCheckObj = false;
                            }
                            this.qualityControlDetails[this.qualityControlDetails.length - 1].bomTechnologyId = backData.body.qmsQualityControlDetails[q].bomTechnologyId;
                            this.qualityControlDetails[this.qualityControlDetails.length - 1].id = backData.body.qmsQualityControlDetails[q].id;
                            this.qualityControlDetails[this.qualityControlDetails.length - 1].inspectionItem = backData.body.qmsQualityControlDetails[q].inspectionItem;
                            this.qualityControlDetails[this.qualityControlDetails.length - 1].technicalRequirement = backData.body.qmsQualityControlDetails[q].technicalRequirement;
                            this.qualityControlDetails[this.qualityControlDetails.length - 1].inspectionInstrument = backData.body.qmsQualityControlDetails[q].inspectionInstrument;
                            this.qualityControlDetails[this.qualityControlDetails.length - 1].placeDiff = backData.body.qmsQualityControlDetails[q].placeDiff;;
                            this.qualityControlDetails[this.qualityControlDetails.length - 1].abcType = backData.body.qmsQualityControlDetails[q].abcType;;
                            this.qualityControlDetails[this.qualityControlDetails.length - 1].standard = backData.body.qmsQualityControlDetails[q].standard;;
                            this.qualityControlDetails[this.qualityControlDetails.length - 1].upperDeviation = backData.body.qmsQualityControlDetails[q].upperDeviation;;
                            this.qualityControlDetails[this.qualityControlDetails.length - 1].lowerDeviation = backData.body.qmsQualityControlDetails[q].lowerDeviation;;
                            // alert(JSON.stringify(this.qualityControlDetails))
                        }
                    } else {
                        const item: ProcessInfomations = new ProcessInfomations();
                        this.qualityControlDetails.push(item);
                        // 判断是否检测是否选中
                        if (backData.body.qmsQualityControlDetails[q].isCheckObj === '1') {
                            this.qualityControlDetails[this.qualityControlDetails.length - 1].isCheckObj = true;
                        } else {
                            this.qualityControlDetails[this.qualityControlDetails.length - 1].isCheckObj = false;
                        }
                        this.qualityControlDetails[this.qualityControlDetails.length - 1].bomTechnologyId = backData.body.qmsQualityControlDetails[q].bomTechnologyId;
                        this.qualityControlDetails[this.qualityControlDetails.length - 1].id = backData.body.qmsQualityControlDetails[q].id;
                        this.qualityControlDetails[this.qualityControlDetails.length - 1].inspectionItem = backData.body.qmsQualityControlDetails[q].inspectionItem;
                        this.qualityControlDetails[this.qualityControlDetails.length - 1].technicalRequirement = backData.body.qmsQualityControlDetails[q].technicalRequirement;
                        this.qualityControlDetails[this.qualityControlDetails.length - 1].inspectionInstrument = backData.body.qmsQualityControlDetails[q].inspectionInstrument;
                        this.qualityControlDetails[this.qualityControlDetails.length - 1].placeDiff = backData.body.qmsQualityControlDetails[q].placeDiff;;
                        this.qualityControlDetails[this.qualityControlDetails.length - 1].abcType = backData.body.qmsQualityControlDetails[q].abcType;;
                        this.qualityControlDetails[this.qualityControlDetails.length - 1].standard = backData.body.qmsQualityControlDetails[q].standard;;
                        this.qualityControlDetails[this.qualityControlDetails.length - 1].upperDeviation = backData.body.qmsQualityControlDetails[q].upperDeviation;;
                        this.qualityControlDetails[this.qualityControlDetails.length - 1].lowerDeviation = backData.body.qmsQualityControlDetails[q].lowerDeviation;;
                    }
                }
                // 装配关系
                for (let p = 0; p < backData.body.qmsPartsAssemblyRelation.length; p++) {
                    // 判断页面是否有空行
                    if (this.qmsPartsAssemblyRelationOwner.length === 0) {
                        const item: QmsPartsAssemblyRelationOwner = new QmsPartsAssemblyRelationOwner();
                        this.qmsPartsAssemblyRelationOwner.push(item);
                    }

                    // 判断是否需要添加空行
                    if (this.qmsPartsAssemblyRelationOwner[this.qmsPartsAssemblyRelationOwner.length - 1].assemblyMaterielId !== undefined) {
                        const item: QmsPartsAssemblyRelationOwner = new QmsPartsAssemblyRelationOwner();
                        this.qmsPartsAssemblyRelationOwner.push(item);
                        this.qmsPartsAssemblyRelationOwner[this.qmsPartsAssemblyRelationOwner.length - 1].id = backData.body.qmsPartsAssemblyRelation[p].id;
                        this.qmsPartsAssemblyRelationOwner[this.qmsPartsAssemblyRelationOwner.length - 1].bomTechnologyId = backData.body.qmsPartsAssemblyRelation[p].bomTechnologyId;
                        this.qmsPartsAssemblyRelationOwner[this.qmsPartsAssemblyRelationOwner.length - 1].assemblyNum = backData.body.qmsPartsAssemblyRelation[p].assemblyNum;
                        this.qmsPartsAssemblyRelationOwner[this.qmsPartsAssemblyRelationOwner.length - 1].assemblyMaterielId = backData.body.qmsPartsAssemblyRelation[p].assemblyMaterielId;
                        this.qmsPartsAssemblyRelationOwner[this.qmsPartsAssemblyRelationOwner.length - 1].assemblyMaterielCd = backData.body.qmsPartsAssemblyRelation[p].assemblyMaterielCd;
                        this.qmsPartsAssemblyRelationOwner[this.qmsPartsAssemblyRelationOwner.length - 1].assemblyMaterielName = backData.body.qmsPartsAssemblyRelation[p].assemblyMaterielName;
                        this.qmsPartsAssemblyRelationOwner[this.qmsPartsAssemblyRelationOwner.length - 1].assemblyCount = backData.body.qmsPartsAssemblyRelation[p].assemblyCount;
                        this.qmsPartsAssemblyRelationOwner[this.qmsPartsAssemblyRelationOwner.length - 1].remark = backData.body.qmsPartsAssemblyRelation[p].remark;
                    } else {
                        this.qmsPartsAssemblyRelationOwner[this.qmsPartsAssemblyRelationOwner.length - 1].id = backData.body.qmsPartsAssemblyRelation[p].id;
                        this.qmsPartsAssemblyRelationOwner[this.qmsPartsAssemblyRelationOwner.length - 1].bomTechnologyId = backData.body.qmsPartsAssemblyRelation[p].bomTechnologyId;
                        this.qmsPartsAssemblyRelationOwner[this.qmsPartsAssemblyRelationOwner.length - 1].assemblyNum = backData.body.qmsPartsAssemblyRelation[p].assemblyNum;
                        this.qmsPartsAssemblyRelationOwner[this.qmsPartsAssemblyRelationOwner.length - 1].assemblyMaterielId = backData.body.qmsPartsAssemblyRelation[p].assemblyMaterielId;
                        this.qmsPartsAssemblyRelationOwner[this.qmsPartsAssemblyRelationOwner.length - 1].assemblyMaterielCd = backData.body.qmsPartsAssemblyRelation[p].assemblyMaterielCd;
                        this.qmsPartsAssemblyRelationOwner[this.qmsPartsAssemblyRelationOwner.length - 1].assemblyMaterielName = backData.body.qmsPartsAssemblyRelation[p].assemblyMaterielName;
                        this.qmsPartsAssemblyRelationOwner[this.qmsPartsAssemblyRelationOwner.length - 1].assemblyCount = backData.body.qmsPartsAssemblyRelation[p].assemblyCount;
                        this.qmsPartsAssemblyRelationOwner[this.qmsPartsAssemblyRelationOwner.length - 1].remark = backData.body.qmsPartsAssemblyRelation[p].remark;
                    }
                }
                // 工艺文件
                this.digiFiles = backData.body.qmsEnclosure;

            })
    }
    save() {
        this.msgs = [];

        // 工序ID空值验证
        if (this.qmsVehicleTypeInfo.processId === undefined) {
            this.msgs.push({ severity: 'error', summary: '提示', detail: '工序ID不能为空' });

            return false
        }
        // 是否试验工序空值验证
        if (this.qmsVehicleTypeInfo.isTest === '' || this.qmsVehicleTypeInfo.isTest === undefined) {
            this.msgs.push({ severity: 'error', summary: '提示', detail: '是否试验工序不能为空' });

            return false
        }
        // 是否检验工序空值验证
        if (this.qmsVehicleTypeInfo.isControlPoint === '' || this.qmsVehicleTypeInfo.isControlPoint === undefined) {
            this.msgs.push({ severity: 'error', summary: '提示', detail: '是否检验工序不能为空' });

            return false
        }
        // 工序特征空值验证
        if (this.qmsVehicleTypeInfo.operationType === '' || this.qmsVehicleTypeInfo.operationType === undefined) {
            this.msgs.push({ severity: 'error', summary: '提示', detail: '工序特征不能为空' });

            return false
        }
        // 作业班组空值验证
        if (this.qmsVehicleTypeInfo.workGroupCd === '' || this.qmsVehicleTypeInfo.workGroupCd === undefined) {
            this.msgs.push({ severity: 'error', summary: '提示', detail: '作业班组不能为空' });

            return false
        }
        //  this.qmsVehicleTypeInfo.makeTime = this.makeTime != null ? moment(this.makeTime) : null;
        //  this.qmsVehicleTypeInfo.modifyTime = this.modifyTime != null ? moment(this.modifyTime) : null;
        // if (this.qmsVehicleTypeInfo.id !== undefined) {
        //     this.subscribeToSaveResponse(this.processInformationsService.update(this.qmsVehicleTypeInfo));
        // } else {
        for (let a = 0; a < this.qualityControlDetails.length; a++) {
            if (this.qualityControlDetails[a].isCheckObj === true) {
                this.qualityControlDetails[a].isCheckObj = '1';
            } else {
                this.qualityControlDetails[a].isCheckObj = '0';
            }
        }
        if (this.editDistinguish) {
            this.processInformationsService.updateInfo({
                qmsBomTechnology: this.qmsVehicleTypeInfo,
                qmsQualityControlDetails: this.qualityControlDetails,
                qmsPartsAssemblyRelation: this.qmsPartsAssemblyRelationOwner,
                qmsEnclosure: this.digiFiles
            }).subscribe((data) => {
                if (data.body === 'MaterielIdTechnologyCd') {
                    this.messageService.add({ severity: 'error', summary: '提示', detail: '物料编码和工艺编码已存在' });
                } else if (data.body === 'dataError') {
                    this.messageService.add({ severity: 'error', summary: '提示', detail: '数据插入失败' });
                } else {
                    // 更新路径
                    this.uploadFlowFiles(data.body)
                }

            })
        } else {
            this.processInformationsService.createInfo({
                qmsBomTechnology: this.qmsVehicleTypeInfo,
                qmsQualityControlDetails: this.qualityControlDetails,
                qmsPartsAssemblyRelation: this.qmsPartsAssemblyRelationOwner,
                qmsEnclosure: this.digiFiles
            }).subscribe((data) => {
                if (data.body === 'MaterielIdTechnologyCd') {
                    this.messageService.add({ severity: 'error', summary: '提示', detail: '物料编码和工艺编码已存在' });
                } else if (data.body === 'dataError') {
                    this.messageService.add({ severity: 'error', summary: '提示', detail: '数据插入失败' });
                } else {
                    // 更新路径
                    this.uploadFlowFiles(data.body)
                }

            })
        }

        // }
    }

    /**
     * 新增和修改返回信息
     *
     * @param result
     * @author DL0733
    */
    private subscribeToSaveResponse(result: Observable<HttpResponse<IQmsVehicleTypeInfo>>) {
        result.subscribe((res: HttpResponse<IQmsVehicleTypeInfo>) =>
            this.onSaveSuccess(), (res: HttpErrorResponse) =>
                this.onSaveError(res)
        );
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError(res) {
        this.isSaving = false;
        if (res.error.title === 'dataModified') {
            this.msgs.push({ severity: 'error', summary: '提示', detail: '该数据已被修改' });

        } else if (res.error.title === 'dataDoesNotExis') {
            this.msgs.push({ severity: 'error', summary: '提示', detail: '该数据不存在' });

        } else if (res.error.title === 'DataAlreadyID') {
            this.msgs.push({ severity: 'error', summary: '提示', detail: '该车型已存在' });
        }
    }
    // 懒加载
    loadCarsLazy(event) {
        // this.loading = true;
        this.page = event.first / this.itemsPerPage + 1;
        this.loadAll();
        // this.loading = false;
    }
    // 检索数据+模糊查询检索
    loadAll() {
        this.VehicleTypeInfoService
            .query({
                carType: '',
                carTypeName: '',
                page: 0,
                size: 7,
                sort: this.sort()
            })
            .subscribe(
                (res: HttpResponse<IQmsVehicleTypeInfo[]>) => this.paginateQmsVehicleTypeInfos(res.body, res.headers),
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }
    // 排序
    sort() {
        const result = ['id' + ',' + 'asc'];
        // if (this.predicate !== 'id') {
        //     result.push('id');
        // }
        return result;
    }
    private paginateQmsVehicleTypeInfos(data: IQmsVehicleTypeInfo[], headers: HttpHeaders) {
        this.links = this.parseLinks.parse(headers.get('link'));
        this.totalItems = parseInt(headers.get('X-Total-Count'), 10);
        this.queryCount = this.totalItems;
        // this.qualityControlDetails = data;
    }
    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
    // 表格行追加
    add() {
        // 判断是否有值
        if (this.qualityControlDetails.length !== 0) {

        }
        const item: ProcessInfomations = new ProcessInfomations();
        this.qualityControlDetails.push(item);
    }
    checkBoxInfo(info) {
        alert(JSON.stringify(info));
    }

    // 跳转Popup工序选择
    typeVehicleClass() {
        this.modalsService.open(ProcessSelectionComponent as Component, { backdrop: 'static', keyboard: false, size: 'lg' }).result.then(
            (result) => {
                if (result !== undefined) {

                    this.qmsVehicleTypeInfo.orderNo = result.id;
                    this.processCd = result.processCd;
                    this.processName = result.processName;
                }
            }
        );
    }
    // 结果区分下拉选择
    changeInfoInspectionResultDiff(eventDiff, inumberDiff) {
        this.qualityControlDetails[inumberDiff].inspectionResultDiffName = "haha";
    }
    // ABC分类下拉选择
    changeInfoABCType(eventABCType, inumberABCType) {
        this.qualityControlDetails[inumberABCType].abcTypeName = "wowo";
    }
    // 以下文件上传
    closePreview() {
        document.getElementById('previewContent').innerHTML = '';
        this.showModal = false;
    }

    viewFile(id) {
        // const id = '1561529455565.doc';
        const imgType = 'jpg,JPG,jpeg,JPEG,png,PNG,bmp,BMP';
        const videoType = 'mp4,rmvb,flv,avi,mkv,MP4,RMVB,FLV,AVI,MKV';
        // const docType = 'doc,docx,DOC,DOCX';
        const pdfType = 'pdf,PDF,doc,docx,DOC,DOCX';
        const fileType = id.substr(id.lastIndexOf('.') + 1);
        let mediaNode = null;
        const params = { fileId: id };
        this.showModal = true;
        document.getElementById('previewTitle').innerText = id;
        if (imgType.indexOf(fileType) >= 0 || videoType.indexOf(fileType) >= 0 || pdfType.indexOf(fileType) >= 0) {
            if (imgType.indexOf(fileType) >= 0) {
                mediaNode = document.createElement('img');
                mediaNode['style'] = 'width:60%;margin-left:20%;';
            } else if (videoType.indexOf(fileType) >= 0) {
                mediaNode = document.createElement('video');
                mediaNode['controls'] = 'controls';
                mediaNode['style'] = 'height:100%;margin-left:20%;';
            } else if (pdfType.indexOf(fileType) >= 0) {
                mediaNode = document.createElement('embed');
                mediaNode['style'] = 'width:100%;height:100%;';
            }
            this.http.get('http://192.168.86.165:8082/imgServer/viewFile', { responseType: 'blob', params }).subscribe(
                data => {
                    console.log(data);
                    mediaNode.src = URL.createObjectURL(data);
                    document.getElementById('previewContent').appendChild(mediaNode);
                }
            );
        }
        // else if (docType.indexOf(fileType) >= 0) {
        //   this.http.get('http://localhost:8082/imgServer/viewFile', { responseType: 'text', params }).subscribe(
        //     vdata => {
        //       const docNode = document.createElement('div');
        //       docNode.innerHTML = vdata;
        //       document.getElementById('previewContent').appendChild(docNode);
        //     }
        //   );
        // } 
        else {
            return;
        }
        // const params = { fileId: '"C:/Users/DL0787/Desktop/12345.docx"' };
    }

    uploadFlowFiles(id) {
        console.log('开始上传文件')
        const files = this.tmpFiles;
        if (files.length <= 0)
            this.router.navigate(['/process-informations']);
        else if (files.length > 5) {
            this.messageService.add({ severity: 'error', summary: '最多上传5个文件', detail: '' });
            return;
        }
        // this.messageService.clear();
        this.messageService.add({ severity: 'info', summary: '正在上传...', detail: '' });
        this.uploading = true;
        // console.log(e.target.files);
        // const files = e.target.files;
        for (const file of files) {
            if (file.size > 1204 * 1024 * 30) {
                alert('File oversize!');
                return;
            }
        }
        // // const body = {data: files};
        // this.uploadData = new FormData();
        // this.uploadData.append('file', files);
        // return this.http.put('http://123.59.250.196:8181/imgServer/upLoadAllImage', this.uploadData, { responseType: 'text' });
        // 设置数据
        const formData: FormData = new FormData();
        const fileLength = files.length;
        for (let index = 0; index < fileLength; index++) {
            const singleFile = files[index];
            formData.append('picture', singleFile);
        }
        //  formData.append('picture', files[0]);

        const options = {
            filePath: '',
            width: 500,
            height: 500
        };
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
        const newDate = d.getFullYear() + '-' + this.startMonth + '-' + this.startDay + ' ' + this.startHH + ':' + this.startMM + ':' + this.startSS;

        const jsonParam = JSON.stringify({
            date: newDate,
            token: Md5.hashStr(newDate + 'reqhtl' + 'reqhtlp'),
            param: options
        });
        formData.append('jsonParam', jsonParam);

        const param = { picture: files, jsonParam: jsonParam };
        // Padding.zeroPadding.add(to: "Cncsys".bytes, blockSize: 16)
        // formData.append('subPath', location.hash.slice(location.hash.indexOf('/') + 1, -1) + '/');
        formData.append('subPath', this.filePath);

        this.http.post('http://192.168.86.165:8082/imgServer/upLoadAllImage', formData).subscribe(
            data => {
                console.log(data);
                if (data['errCode'] == '0000') {
                    data['id'] = id;
                    this.updateEnclosureDB(data);
                }
                else
                    alert('Upload Failed');
                this.uploading = false;
            }
        );
    }
    async updateEnclosureDB(data) {

        // id = '1561037665794.docx';
        // this.digiFiles.splice(index, 1);
        // const params = { fileId: location.hash.slice(location.hash.indexOf('/') + 1, -1) + '/' + id };
        // console.log(params);
        let params = {}
        for (let i = 0; i < data['retMsg'].length; i++) {
            let file = data['retMsg'][i]['Url'].substr(data['retMsg'][i]['Url'].lastIndexOf('/') + 1);
            params = {
                inspectionInfoId: data['id'],
                inspectionKbn: '3',
                enclosureAddress: this.filePath + file
            }
            try {
                await this.http.get(SERVER_API_URL + 'api/process-informations-infos/uploadFile', { params }).subscribe(
                    data => {
                        console.log(data);
                        this.previousState();
                        // this.getFileList();
                        // this.messageService.clear();
                        this.messageService.add({ severity: 'success', summary: '上传成功', detail: file });
                    }
                );
            } catch (error) {
                // this.messageService.clear();
                this.messageService.add({ severity: 'error', summary: '上传失败', detail: file });
                continue;
            }
        }
    }
}
