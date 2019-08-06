import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { QmsBomTechnologyComponent } from '../../../popup/bomTechnologySelection/qms-bom-technology.component'

import { IQmsQualityControlDetails } from 'app/shared/model/qms-quality-control-details.model';
import { IQmsProductionInspection } from 'app/shared/model/qms-production-inspection.model';
import { IQmsPartsAssemblyRelation } from 'app/shared/model/qms-parts-assembly-relation.model';

import { QmsProductionInspectionSelfService } from './qms-production-inspection.self.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Message } from 'primeng/components/common/api';
import { isInteger } from '@ng-bootstrap/ng-bootstrap/util/util';

@Component({
    selector: 'jhi-self-check-update',
    templateUrl: './self-check-update.component.html',
    styleUrls: [
        './productProcessSelf.scss'
    ]
})
export class QmsProductionInspectionUpdateSelfComponent implements OnInit {
    qmsProductionInspection: any;
    qmsQualityControlDetails: IQmsQualityControlDetails[];
    qmsPartsAssemblyRelation: IQmsPartsAssemblyRelation[];

    isSaving: boolean;
    makeTime: string;
    modifyTime: string;
    msgs: Message[] = [];
    // label信息
    labelTitle: any;

    makeUser: any
    qualityControlDetailsErrorSet = new Set();

    // 不合格品管理表  质量检查项目级别
    controlLevel: string;
    // // 物料编码
    // materielCd: ''
    // // 物料名称
    // materielName: ''
    // // 物料Id
    // materielId: ''
    // //工艺Id
    // bomTechnologyId: ''
    // //工艺名称
    // processName: ''
    // // 工序特征
    // operationType: any
    // // 编号
    // serialNumber: ''
    // // 炉批号
    // furnace: ''
    // // 备注
    // remark: ''
    isOkName: string;
    diffType: boolean;


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
            console.log(this.activatedRoute)

            this.qmsProductionInspectionService
                .findQmsQualityControlDetailsByTechId({ bomTechnologyId: qmsProductionInspection.bomTechnologyId })
                .subscribe(data => {
                    this.qmsQualityControlDetails = data.body;

                    // 为上下偏差设置初始值
                    for (var i = 0; i < this.qmsQualityControlDetails.length; i++) {
                        if (this.qmsQualityControlDetails[i].inspectionResultDiff == '0' && this.qmsQualityControlDetails[i].upperDeviation !== null) {
                            this.qmsQualityControlDetails[i].upperDeviation = this.qmsQualityControlDetails[i].standard + this.qmsQualityControlDetails[i].upperDeviation
                        }
                        if (this.qmsQualityControlDetails[i].inspectionResultDiff == '0' && this.qmsQualityControlDetails[i].lowerDeviation !== null) {
                            this.qmsQualityControlDetails[i].lowerDeviation = this.qmsQualityControlDetails[i].standard - this.qmsQualityControlDetails[i].lowerDeviation
                        }
                    }

                    // 检查人
                    if (this.qmsQualityControlDetails.length > 0) {
                        this.makeUser = this.qmsQualityControlDetails[0].makeUser;
                    }
                    console.log('qmsQualityControlDetails', this.qmsQualityControlDetails)

                })

            this.qmsProductionInspectionService
                .findAssemblyRelationByTechId({ bomTechnologyId: qmsProductionInspection.bomTechnologyId })
                .subscribe(data => {
                    this.qmsPartsAssemblyRelation = data.body;

                    console.log('qmsQualityControlDetails', this.qmsQualityControlDetails)

                })
        });
    }

    previousState() {
        this.router.navigate(['/productProcessSelfCheck']);
    }

    // @ts-nocheck
    save() {
        // 质量检验项目

        // 实测值是否填写
        for (var i = 0; i < this.qmsQualityControlDetails.length; i++) {
            if (this.qmsQualityControlDetails[i].standard === null || this.qmsQualityControlDetails[i].standard.toString() == '') {
                this.msgs.push({ severity: 'error', summary: '提示', detail: '实测值不能为空!' });
                return
            }
        }

        // 实测值是否合格
        for (var i = 0; i < this.qmsQualityControlDetails.length; i++) {
            // 数字区分
            if (this.qmsQualityControlDetails[i].inspectionResultDiff == '0') {
                if (this.qmsQualityControlDetails[i].upperDeviation !== null) {
                    if (this.qmsQualityControlDetails[i].standard > this.qmsQualityControlDetails[i].upperDeviation) {
                        // this.msgs.push({ severity: 'error', summary: '提示', detail: '存在数据不符合技术要求!' });
                        this.qualityControlDetailsErrorSet.add(i)
                    }
                }

                if (this.qmsQualityControlDetails[i].lowerDeviation !== null) {
                    if (this.qmsQualityControlDetails[i].standard < this.qmsQualityControlDetails[i].lowerDeviation) {
                        // this.msgs.push({ severity: 'error', summary: '提示', detail: '存在数据不符合技术要求!' });
                        this.qualityControlDetailsErrorSet.add(i)
                    }
                }

            } else {
                if (this.qmsQualityControlDetails[i].standard.toString() == 'N') {
                    this.qualityControlDetailsErrorSet.add(i)
                }
            }
        }

        // 存在不合格数据
        if (this.qualityControlDetailsErrorSet.size > 0) {
            this.msgs.push({ severity: 'error', summary: '提示', detail: '存在数据不符合技术要求!' });
            const _this = this;
            this.qualityControlDetailsErrorSet.forEach(function (element, sameElement, set) {

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

            console.log(this.controlLevel)
            const params = {
                bomTechnologyId: this.qmsProductionInspection.bomTechnologyId,
                processId: this.qmsProductionInspection.processId,
                materielId: this.qmsProductionInspection.materielId,
                controlLevel: this.controlLevel,
                serialNumber: this.qmsProductionInspection.serialNumber,
                furnace: this.qmsProductionInspection.furnace
            }


            this.qmsProductionInspectionService.createQmsUnqualifiedProduct(params).subscribe(data => {
                console.log(data.body.unqualifiedProductId)

                this.qualityControlDetailsErrorSet.forEach(function (element, sameElement, set) {
                    const params = {
                        unqualifiedProductId: data.body.unqualifiedProductId,
                        inspectionItem: _this.qmsQualityControlDetails[element].inspectionItem,
                        inspectionInstrument: _this.qmsQualityControlDetails[element].inspectionInstrument,
                        standard: _this.qmsQualityControlDetails[element].standard,
                        upperDeviation: _this.qmsQualityControlDetails[element].upperDeviation,
                        lowerDeviation: _this.qmsQualityControlDetails[element].lowerDeviation,
                        abcType: _this.qmsQualityControlDetails[element].abcType,
                    }
                    _this.qmsProductionInspectionService.createQmsUnqualifiedProductDetails(params).subscribe(data => {
                        
                    })
                    
                })
            })
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
