import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { QmsBomTechnologyComponent } from '../../popup/bomTechnologySelection/qms-bom-technology.component'

import { IQmsProductionInspection } from 'app/shared/model/qms-production-inspection.model';
import { QmsProductionInspectionService } from './qms-production-inspection.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Message } from 'primeng/components/common/api';

@Component({
    selector: 'jhi-qms-production-inspection-update',
    templateUrl: './qms-production-inspection-update.component.html',
    styleUrls: [
        './productProcess.scss'
    ]
})
export class QmsProductionInspectionUpdateComponent implements OnInit {
    qmsProductionInspection: IQmsProductionInspection;
    isSaving: boolean;
    makeTime: string;
    modifyTime: string;
    msgs: Message[] = [];


    // 物料编码
    materielCd: ''
    // 物料名称
    materielName: ''
    // 物料Id
    materielId: ''
    //工艺Id
    bomTechnologyId: ''
    //工艺描述
    jhiDescribe: ''
    // 工序特征
    operationType: any
    // 编号
    serialNumber: ''
    // 炉批号
    furnace: ''
    // 备注
    remark: ''


    constructor(
        private router: Router, 
        private qmsProductionInspectionService: QmsProductionInspectionService, 
        private activatedRoute: ActivatedRoute,
        private modalsService: NgbModal
        ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ qmsProductionInspection }) => {
            this.qmsProductionInspection = qmsProductionInspection;
            this.materielCd = qmsProductionInspection.materielCd;
            this.materielName = qmsProductionInspection.materielName;
            this.jhiDescribe = qmsProductionInspection.jhiDescribe;
        });
    }

    previousState() {
        this.router.navigate(['/productProcessCheck']);
    }

    goToMPS() {
        this.modalsService.open(QmsBomTechnologyComponent as Component, { backdrop: 'static', keyboard: false, windowClass: 'modal-xl', size: 'lg' }).result.then(
            (result) => {
                if (result !== undefined) {
                    console.log(result)
                    this.qmsProductionInspection.materielId = result.materielId;
                    this.qmsProductionInspection.bomTechnologyId = result.technologyId;
                    this.operationType = result.operationType;
                    this.materielCd = result.materielCd;
                    this.materielName = result.materielName;
                    this.jhiDescribe = result.jhiDescribe;
                }
            }
        );
    }

    save() {
        
        if (this.materielCd == '' || this.materielCd == undefined) {
            this.msgs.push({ severity: 'error', summary: '提示', detail: '物料编码不能为空!' });
            return
        }

        if (this.materielName == '' || this.materielName == undefined) {
            this.msgs.push({ severity: 'error', summary: '提示', detail: '物料名称不能为空!' });
            return
        }

        if (this.jhiDescribe == '' || this.jhiDescribe == undefined) {
            this.msgs.push({ severity: 'error', summary: '提示', detail: '工序名称不能为空!' });
            return
        }

        // Check同一工序ID对应的编号是否重复

        this.qmsProductionInspectionService.repeatCheck({ bomTechnologyId: this.qmsProductionInspection.bomTechnologyId, serialNumber: this.qmsProductionInspection.serialNumber }).subscribe(data => {
            if (data.body === 1) {
                this.msgs.push({ severity: 'error', summary: '提示', detail: '编号重复!' });
                return
            } else {

                // 首工序

                if (this.operationType = 7) {
                    // 编号校验
                    this.qmsProductionInspectionService.serialNumberCheck({materielId: this.qmsProductionInspection.materielId, serialNumber: this.qmsProductionInspection.serialNumber}).subscribe(data => {
                    });
                }

                if (this.qmsProductionInspection.id !== undefined) {
                    this.subscribeToSaveResponse(this.qmsProductionInspectionService.update(this.qmsProductionInspection));
                } else {
                    this.subscribeToSaveResponse(this.qmsProductionInspectionService.create(this.qmsProductionInspection));
                }
            }
        });
        

        
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
