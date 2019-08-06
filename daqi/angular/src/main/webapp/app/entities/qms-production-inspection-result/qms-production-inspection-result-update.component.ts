import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { IQmsProductionInspectionResult } from 'app/shared/model/qms-production-inspection-result.model';
import { QmsProductionInspectionResultService } from './qms-production-inspection-result.service';

@Component({
    selector: 'jhi-qms-production-inspection-result-update',
    templateUrl: './qms-production-inspection-result-update.component.html'
})
export class QmsProductionInspectionResultUpdateComponent implements OnInit {
    qmsProductionInspectionResult: IQmsProductionInspectionResult;
    isSaving: boolean;
    makeTime: string;
    modifyTime: string;

    constructor(
        private qmsProductionInspectionResultService: QmsProductionInspectionResultService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ qmsProductionInspectionResult }) => {
            this.qmsProductionInspectionResult = qmsProductionInspectionResult;
            this.makeTime =
                this.qmsProductionInspectionResult.makeTime != null
                    ? this.qmsProductionInspectionResult.makeTime.format(DATE_TIME_FORMAT)
                    : null;
            this.modifyTime =
                this.qmsProductionInspectionResult.modifyTime != null
                    ? this.qmsProductionInspectionResult.modifyTime.format(DATE_TIME_FORMAT)
                    : null;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        this.qmsProductionInspectionResult.makeTime = this.makeTime != null ? moment(this.makeTime, DATE_TIME_FORMAT) : null;
        this.qmsProductionInspectionResult.modifyTime = this.modifyTime != null ? moment(this.modifyTime, DATE_TIME_FORMAT) : null;
        if (this.qmsProductionInspectionResult.id !== undefined) {
            this.subscribeToSaveResponse(this.qmsProductionInspectionResultService.update(this.qmsProductionInspectionResult));
        } else {
            this.subscribeToSaveResponse(this.qmsProductionInspectionResultService.create(this.qmsProductionInspectionResult));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IQmsProductionInspectionResult>>) {
        result.subscribe(
            (res: HttpResponse<IQmsProductionInspectionResult>) => this.onSaveSuccess(),
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
