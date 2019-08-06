import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { QmsBomTechnologyComponent } from '../../../popup/bomTechnologySelection/qms-bom-technology.component'

import { IQmsProductionInspection } from 'app/shared/model/qms-production-inspection.model';
import { QmsProductionInspectionService } from './qms-production-inspection.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Message } from 'primeng/components/common/api';

@Component({
    selector: 'jhi-qms-production-inspection-check',
    templateUrl: './qms-production-inspection-check.component.html',
    styleUrls: [
        './productProcess.scss'
    ]
})
export class QmsProductionInspectionCheckComponent implements OnInit {
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
    //中梁号
    workno: ''
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
        });
    }

    previousState() {
        this.router.navigate(['/productProcessCheck']);
    }

    goToMPS() {
        this.modalsService.open(QmsBomTechnologyComponent as Component, { backdrop: 'static', keyboard: false, windowClass: 'modal-xl', size: 'lg' }).result.then(
            (result) => {
                if (result !== undefined) {
                    this.operationType = result.operationType;
                    this.qmsProductionInspection.materielId = result.materielId;
                    this.qmsProductionInspection.bomTechnologyId = result.technologyId;
                    this.materielCd = result.materielCd;
                    this.materielName = result.materielName;
                    // this.workno = result.workno;
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

        if (this.workno == '' || this.workno == undefined) {
            this.msgs.push({ severity: 'error', summary: '提示', detail: '中梁号不能为空!' });
            return
        }

        // Check同一工序ID对应的编号是否重复

        this.qmsProductionInspectionService.repeatCheck({ bomTechnologyId: this.qmsProductionInspection.bomTechnologyId, serialNumber: this.qmsProductionInspection.serialNumber }).subscribe(data => {
            if (data.body === 1) {
                this.msgs.push({ severity: 'error', summary: '提示', detail: '编号重复!' });
                return
            } else {

                // 首工序
                if (this.operationType == "F") {
                    // 编号校验
                    this.qmsProductionInspectionService.serialNumberCheck({materielId: this.qmsProductionInspection.materielId, serialNumber: this.qmsProductionInspection.serialNumber}).subscribe(data => {
                    });
                }
                
                this.qmsProductionInspectionService.doBatchGeneration(this.qmsProductionInspection).subscribe(
                    (res: any) => this.previousState(),
                    (res: HttpErrorResponse) => {
                        this.msgs.push({ severity: 'error', summary: '提示', detail: '批量生成任务失败!' });
                    })
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
