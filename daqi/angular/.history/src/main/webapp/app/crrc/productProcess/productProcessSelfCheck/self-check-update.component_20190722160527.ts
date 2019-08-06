import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { QmsBomTechnologyComponent } from '../../../popup/bomTechnologySelection/qms-bom-technology.component'

import { IQmsQualityControlDetails } from 'app/shared/model/qms-quality-control-details.model';
import { IQmsProductionInspection } from 'app/shared/model/qms-production-inspection.model';
import { QmsProductionInspectionSelfService } from './qms-production-inspection.self.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Message } from 'primeng/components/common/api';

@Component({
    selector: 'jhi-self-check-update',
    templateUrl: './self-check-update.component.html',
    styleUrls: [
        './productProcessSelf.scss'
    ]
})
export class QmsProductionInspectionUpdateSelfComponent implements OnInit {
    qmsProductionInspection: IQmsProductionInspection;
    qmsQualityControlDetails: IQmsQualityControlDetails[];
    isSaving: boolean;
    makeTime: string;
    modifyTime: string;
    msgs: Message[] = [];
    // label信息
    labelTitle: any;

    makeUser: any

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

    constructor(
        private router: Router, 
        private qmsProductionInspectionService: QmsProductionInspectionSelfService, 
        private activatedRoute: ActivatedRoute,
        private modalsService: NgbModal
        ) {}

    ngOnInit() {
        this.isSaving = false;

        this.labelTitle = {
            'tab1': '质量检验项目',
            'tab2': '装配物料',
            'tab3': '上传附件',
        };

        this.activatedRoute.data.subscribe(({ qmsProductionInspection }) => {
            console.log("111",qmsProductionInspection)
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
            .findQmsQualityControlDetailsByTechId({bomTechnologyId: qmsProductionInspection.bomTechnologyId})
            .subscribe(data => {
                this.qmsQualityControlDetails = data.body;

                console.log('length', this.qmsProductionInspection.length)

                if (this.qmsQualityControlDetails.length > 0 ) {
                    this.makeUser = this.qmsQualityControlDetails[0].makeUser;
                }
                console.log('qmsQualityControlDetails',this.qmsQualityControlDetails)
                
            })
        });

        
    }

    previousState() {
        this.router.navigate(['/productProcessSelfCheck']);
    }

    save() {
        
        
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
