import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { IQmsEntryInspectionResult } from 'app/shared/model/qms-entry-inspection-result.model';
import { QmsEntryInspectionResultService } from './qms-entry-inspection-result.service';

@Component({
    selector: 'jhi-qms-entry-inspection-result-update',
    templateUrl: './qms-entry-inspection-result-update.component.html'
})
export class QmsEntryInspectionResultUpdateComponent implements OnInit {
    qmsEntryInspectionResult: IQmsEntryInspectionResult;
    isSaving: boolean;
    makeTime: string;
    modifyTime: string;

    constructor(private qmsEntryInspectionResultService: QmsEntryInspectionResultService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ qmsEntryInspectionResult }) => {
            this.qmsEntryInspectionResult = qmsEntryInspectionResult;
            this.makeTime =
                this.qmsEntryInspectionResult.makeTime != null ? this.qmsEntryInspectionResult.makeTime.format(DATE_TIME_FORMAT) : null;
            this.modifyTime =
                this.qmsEntryInspectionResult.modifyTime != null ? this.qmsEntryInspectionResult.modifyTime.format(DATE_TIME_FORMAT) : null;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        this.qmsEntryInspectionResult.makeTime = this.makeTime != null ? moment(this.makeTime, DATE_TIME_FORMAT) : null;
        this.qmsEntryInspectionResult.modifyTime = this.modifyTime != null ? moment(this.modifyTime, DATE_TIME_FORMAT) : null;
        if (this.qmsEntryInspectionResult.id !== undefined) {
            this.subscribeToSaveResponse(this.qmsEntryInspectionResultService.update(this.qmsEntryInspectionResult));
        } else {
            this.subscribeToSaveResponse(this.qmsEntryInspectionResultService.create(this.qmsEntryInspectionResult));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IQmsEntryInspectionResult>>) {
        result.subscribe(
            (res: HttpResponse<IQmsEntryInspectionResult>) => this.onSaveSuccess(),
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
