import { Component, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { QmsBomTechnologyComponent } from '../../../popup/bomTechnologySelection/qms-bom-technology.component'

import { IQmsQualityControlDetails } from 'app/shared/model/qms-quality-control-details.model';
import { IQmsProductionInspection } from 'app/shared/model/qms-production-inspection.model';
import { IQmsPartsAssemblyRelation } from 'app/shared/model/qms-parts-assembly-relation.model';
import { QmsProductionInspectionValue } from 'app/shared/model/qms-production-inspection-value.model';

import { QmsProductionInspectionSelfService } from './qms-production-inspection.self.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Message } from 'primeng/components/common/api';
import { isInteger } from '@ng-bootstrap/ng-bootstrap/util/util';
import { isNull } from '@angular/compiler/src/output/output_ast';

@Component({
    selector: 'jhi-self-check-update',
    templateUrl: './self-check-update.component.html',
    styleUrls: [
        './productProcessSelf.scss',
        '.file.scss'
    ]
})
export class QmsProductionInspectionUpdateSelfComponent implements OnInit {
    // 生产检验表数据
    qmsProductionInspection: any;
    // 工序质量控制点详细表
    qmsQualityControlDetails: any[];
    // 工序装配关系表
    qmsPartsAssemblyRelation: IQmsPartsAssemblyRelation[];
    // 生产检验结果表
    qmsProductionInspectionValue: QmsProductionInspectionValue;
    // 工序质量控制点详细 错误集合
    qualityControlDetailsErrorSet = new Set();

    isSaving: boolean;
    // 错误信息
    msgs: Message[] = [];
    // label信息
    labelTitle: any;
    // 管理人
    makeUser: any

    // 不合格品管理表  质量检查项目级别
    controlLevel: string;
    // 检验编号
    checkNumber: number;
    // 合格区分名
    isOkName: string;

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

    constructor(
        private router: Router,
        private qmsProductionInspectionService: QmsProductionInspectionSelfService,
        private activatedRoute: ActivatedRoute,
        private modalsService: NgbModal
    ) {
        this.controlLevel = 'C';
    }

    ngOnInit() {
        this.isSaving = false;

        this.labelTitle = {
            'tab1': '质量检验项目',
            'tab2': '装配物料',
            'tab3': '上传附件',
        };

        this.activatedRoute.data.subscribe(({ qmsProductionInspection }) => {
            console.log("111", qmsProductionInspection)
            this.qmsProductionInspection = qmsProductionInspection;

            if (qmsProductionInspection.isOk == '0') {
                this.isOkName = "未检验"
            } else if (qmsProductionInspection.isOk == '1') {
                this.isOkName = "合格"
            } else if (qmsProductionInspection.isOk == '2') {
                this.isOkName = "不合格"
            }

            // 获取一览数据
            this.qmsProductionInspectionService
                .findQmsQualityControlDetailsByTechId({ pid: qmsProductionInspection.id })
                .subscribe(data => {
                    this.qmsQualityControlDetails = data.body;

                    // 检查人
                    if (this.qmsQualityControlDetails.length > 0) {
                        this.makeUser = this.qmsQualityControlDetails[0].makeUser;
                    }

                    this.qualityInspectionCheck()
                })

            this.qmsProductionInspectionService
                .findAssemblyRelationByTechId({ bomTechnologyId: qmsProductionInspection.bomTechnologyId })
                .subscribe(data => {
                    this.qmsPartsAssemblyRelation = data.body;
                })

        });
    }

    previousState() {
        this.router.navigate(['/productProcessSelfCheck']);
    }


    // 质量检验check
    qualityInspectionCheck() {
        this.qualityControlDetailsErrorSet = new Set()

        // 质量检验项目

        

        // 实测值是否填写
        for (var i = 0; i < this.qmsQualityControlDetails.length; i++) {
            if (this.qmsQualityControlDetails[i].testValue === null || this.qmsQualityControlDetails[i].testValue.toString() == '') {
                this.msgs.push({ severity: 'error', summary: '提示', detail: '实测值不能为空!' });
                return
            }
        }

        // 实测值是否合格
        for (var i = 0; i < this.qmsQualityControlDetails.length; i++) {
            // 数字区分
            if (this.qmsQualityControlDetails[i].inspectionResultDiff == '0') {
                if (this.qmsQualityControlDetails[i].upperDeviation !== null) {
                    if (this.qmsQualityControlDetails[i].testValue > this.qmsQualityControlDetails[i].standard + this.qmsQualityControlDetails[i].upperDeviation) {
                        // this.msgs.push({ severity: 'error', summary: '提示', detail: '存在数据不符合技术要求!' });
                        this.qualityControlDetailsErrorSet.add(i)
                    }
                }

                if (this.qmsQualityControlDetails[i].lowerDeviation !== null) {
                    if (this.qmsQualityControlDetails[i].testValue < this.qmsQualityControlDetails[i].standard - this.qmsQualityControlDetails[i].lowerDeviation) {
                        // this.msgs.push({ severity: 'error', summary: '提示', detail: '存在数据不符合技术要求!' });
                        this.qualityControlDetailsErrorSet.add(i)
                    }
                }

            } else {
                if (this.qmsQualityControlDetails[i].testValue.toString() == 'N') {
                    this.qualityControlDetailsErrorSet.add(i)
                }
            }
        }
    }

    // 获取一览数据
    findQmsQualityControlDetailsByTechId () {
        this.qmsProductionInspectionService
        .findQmsQualityControlDetailsByTechId({ pid: this.qmsProductionInspection.id })
        .subscribe(data => {
            this.qmsQualityControlDetails = data.body;

            // 检查人
            if (this.qmsQualityControlDetails.length > 0) {
                this.makeUser = this.qmsQualityControlDetails[0].makeUser;
            }
            this.qualityInspectionCheck()
        })
    }


    save() {

        // 检验编号check
        if (this.checkNumber == undefined || this.checkNumber == null) {
            this.msgs.push({ severity: 'error', summary: '提示', detail: '请输入检验编号!' });
            return
        }

        if (isNaN(this.checkNumber)) {
            this.msgs.push({ severity: 'error', summary: '提示', detail: '检验编号不正确!' });
            return
        }

        this.qualityInspectionCheck()


        // 存在不合格数据
        if (this.qualityControlDetailsErrorSet.size > 0) {
            this.msgs.push({ severity: 'error', summary: '提示', detail: '存在数据不符合技术要求!' });
            const _this = this;
            this.qualityControlDetailsErrorSet.forEach(function (element : number, sameElement, set) {

                if (_this.controlLevel === 'A') {
                    return
                }

                if (_this.qmsQualityControlDetails[element].abcType === 'B') {
                    _this.controlLevel = 'B'
                }

                if (_this.qmsQualityControlDetails[element].abcType === 'A') {
                    _this.controlLevel = 'A'
                    return
                }
            })

            const params = {
                bomTechnologyId: this.qmsProductionInspection.bomTechnologyId,
                processId: this.qmsProductionInspection.processId,
                materielId: this.qmsProductionInspection.materielId,
                controlLevel: this.controlLevel,
                serialNumber: this.qmsProductionInspection.serialNumber,
                furnace: this.qmsProductionInspection.furnace
            }

            // 新增一条到不合格品管理表		
            this.qmsProductionInspectionService.createQmsUnqualifiedProduct(params).subscribe(data => {

                // 根据返回的ip 批量插入到不合格品明细管理表
                this.qualityControlDetailsErrorSet.forEach(function (element : number, sameElement, set) {
                    const params = {
                        unqualifiedProductId: data.body.unqualifiedProductId,
                        inspectionItem: _this.qmsQualityControlDetails[element].inspectionItem,
                        inspectionInstrument: _this.qmsQualityControlDetails[element].inspectionInstrument,
                        checkResult: _this.qmsQualityControlDetails[element].testValue,
                        upperDeviation: _this.qmsQualityControlDetails[element].upperDeviation,
                        lowerDeviation: _this.qmsQualityControlDetails[element].lowerDeviation,
                        abcType: _this.qmsQualityControlDetails[element].abcType,
                    }
                    _this.qmsProductionInspectionService.createQmsUnqualifiedProductDetails(params).subscribe(data => {
                    })
                })
            })
        } 
        

        if (this.qmsQualityControlDetails.length !== 0) {

            // 判断结果表是否有数据确认是新增还是更新
            if (this.qmsQualityControlDetails[0].resultId === null) {
                // 向结果表插入数据
                this.qmsProductionInspectionService.createQmsProductionInspectionResult({params: this.qmsQualityControlDetails}).subscribe(data => {
                    
                    // 获取一览数据
                    this.findQmsQualityControlDetailsByTechId()
                })

                // 向生产检验结果表插入数据
                this.qmsProductionInspectionValue = new QmsProductionInspectionValue();
                this.qmsProductionInspectionValue.isOk = this.qualityControlDetailsErrorSet.size !== 0? "0": "1"
                this.qmsProductionInspectionValue.inspectionDiff = "C"
                this.qmsProductionInspectionValue.inspectionId = this.qmsProductionInspection.id
                this.qmsProductionInspectionValue.checkNumber = this.checkNumber
                this.qmsProductionInspectionValue.flagStatus = "0"
                this.qmsProductionInspectionService.createQmsProductionInspectionValue(this.qmsProductionInspectionValue).subscribe(data => {})
            }else {


                const params  = {
                    checkNumber: this.checkNumber,
                    inspectionId: this.qmsProductionInspection.id,
                    inspectionDiff: "C",
                    isOk: this.qualityControlDetailsErrorSet.size !== 0? "0": "1"
                }

                this.qmsProductionInspectionService.updateQmsProductionInspectionValues(params).subscribe(data => {})

                this.qmsProductionInspectionService.updateQmsProductionInspectionResult({params: this.qmsQualityControlDetails}).subscribe(data => {
                    
                    // 获取一览数据
                    this.findQmsQualityControlDetailsByTechId()
                })
            }
        }
        

        if (this.qualityControlDetailsErrorSet.size == 0) {
            this.previousState()
        }

        

    }

    test(i) {
        var result = ''
        this.qualityControlDetailsErrorSet.forEach(function (element, sameElement, set) {
            if (i == element) {
                result = '#e20a0ad6'
            }
        })
        return result
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IQmsProductionInspection>>) {
        result.subscribe(
            (res: HttpResponse<IQmsProductionInspection>) => this.onSaveSuccess(),
            (res: HttpErrorResponse) => this.onSaveError()
        );
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }
}
