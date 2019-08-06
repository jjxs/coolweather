import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

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
    //工艺名称
    bomTechnologyName: ''
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
            this.makeTime =
                this.qmsProductionInspection.makeTime != null ? this.qmsProductionInspection.makeTime.format(DATE_TIME_FORMAT) : null;
            this.modifyTime =
                this.qmsProductionInspection.modifyTime != null ? this.qmsProductionInspection.modifyTime.format(DATE_TIME_FORMAT) : null;
        });
    }

    previousState() {
        this.router.navigate(['/productProcessCheck']);
    }

    // goToMPS() {
    //     this.modalsService.open(MaterialSelectComponent as Component, { backdrop: 'static', keyboard: false, windowClass: 'modal-xl', size: 'lg' }).result.then(
    //         (result) => {
    //             if (result !== undefined) {
    //                 if (result.supplierCd.length <= 0 || !result.supplierCd) {
    //                     this.qmsEntryInspection.supplierCd = null;
    //                 } else {
    //                     this.qmsEntryInspection.supplierCd = result.supplierCd;
    //                 }
    //                 this.qmsEntryInspection.materielCd = result.materielCd;
    //                 this.qmsEntryInspection.materielName = result.materielName;
    //             }
    //         }
    //     );
    // }

    save() {
        // this.isSaving = true;
        // this.qmsProductionInspection.makeTime = this.makeTime != null ? moment(this.makeTime, DATE_TIME_FORMAT) : null;
        // this.qmsProductionInspection.modifyTime = this.modifyTime != null ? moment(this.modifyTime, DATE_TIME_FORMAT) : null;
        if (this.materielCd == '' || this.materielCd == undefined) {
            this.msgs.push({ severity: 'error', summary: '提示', detail: '物料编码不能为空!' });
            return
        }

        if (this.materielName == '' || this.materielName == undefined) {
            this.msgs.push({ severity: 'error', summary: '提示', detail: '物料名称不能为空!' });
            return
        }

        if (this.bomTechnologyName == '' || this.bomTechnologyName == undefined) {
            this.msgs.push({ severity: 'error', summary: '提示', detail: '工序名称不能为空!' });
            return
        }

        // Check同一工序ID对应的编号是否重复

        this.qmsProductionInspectionService.repeatCheck({ bomTechnologyId: 1, serialNumber: this.qmsProductionInspection.serialNumber }).subscribe(data => {
            if (data.body === 1) {
                this.msgs.push({ severity: 'error', summary: '提示', detail: '该单位已存在!' });
            } else {

            }
        });


        if (this.qmsProductionInspection.id !== undefined) {
            this.subscribeToSaveResponse(this.qmsProductionInspectionService.update(this.qmsProductionInspection));
        } else {
            this.subscribeToSaveResponse(this.qmsProductionInspectionService.create(this.qmsProductionInspection));
        }
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
