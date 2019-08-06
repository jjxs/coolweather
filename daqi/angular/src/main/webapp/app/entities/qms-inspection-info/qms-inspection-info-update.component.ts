import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { IQmsInspectionInfo } from 'app/shared/model/qms-inspection-info.model';
import { QmsInspectionInfoService } from './qms-inspection-info.service';

@Component({
    selector: 'jhi-qms-inspection-info-update',
    templateUrl: './qms-inspection-info-update.component.html'
})
export class QmsInspectionInfoUpdateComponent implements OnInit {
    qmsInspectionInfo: IQmsInspectionInfo;
    isSaving: boolean;
    makeTime: string;
    modifyTime: string;

    constructor(private qmsInspectionInfoService: QmsInspectionInfoService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ qmsInspectionInfo }) => {
            this.qmsInspectionInfo = qmsInspectionInfo;
            this.makeTime = this.qmsInspectionInfo.makeTime != null ? this.qmsInspectionInfo.makeTime.format(DATE_TIME_FORMAT) : null;
            this.modifyTime = this.qmsInspectionInfo.modifyTime != null ? this.qmsInspectionInfo.modifyTime.format(DATE_TIME_FORMAT) : null;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        this.qmsInspectionInfo.makeTime = this.makeTime != null ? moment(this.makeTime, DATE_TIME_FORMAT) : null;
        this.qmsInspectionInfo.modifyTime = this.modifyTime != null ? moment(this.modifyTime, DATE_TIME_FORMAT) : null;
        if (this.qmsInspectionInfo.id !== undefined) {
            this.subscribeToSaveResponse(this.qmsInspectionInfoService.update(this.qmsInspectionInfo));
        } else {
            this.subscribeToSaveResponse(this.qmsInspectionInfoService.create(this.qmsInspectionInfo));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IQmsInspectionInfo>>) {
        result.subscribe((res: HttpResponse<IQmsInspectionInfo>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }
}
