import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { IQmsProductionInspectionValue } from 'app/shared/model/qms-production-inspection-value.model';
import { QmsProductionInspectionValueService } from './qms-production-inspection-value.service';

@Component({
    selector: 'jhi-qms-production-inspection-value-update',
    templateUrl: './qms-production-inspection-value-update.component.html'
})
export class QmsProductionInspectionValueUpdateComponent implements OnInit {
    qmsProductionInspectionValue: IQmsProductionInspectionValue;
    isSaving: boolean;
    makeTime: string;
    modifyTime: string;

    constructor(private qmsProductionInspectionValueService: QmsProductionInspectionValueService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ qmsProductionInspectionValue }) => {
            this.qmsProductionInspectionValue = qmsProductionInspectionValue;
            this.makeTime =
                this.qmsProductionInspectionValue.makeTime != null
                    ? this.qmsProductionInspectionValue.makeTime.format(DATE_TIME_FORMAT)
                    : null;
            this.modifyTime =
                this.qmsProductionInspectionValue.modifyTime != null
                    ? this.qmsProductionInspectionValue.modifyTime.format(DATE_TIME_FORMAT)
                    : null;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        this.qmsProductionInspectionValue.makeTime = this.makeTime != null ? moment(this.makeTime, DATE_TIME_FORMAT) : null;
        this.qmsProductionInspectionValue.modifyTime = this.modifyTime != null ? moment(this.modifyTime, DATE_TIME_FORMAT) : null;
        if (this.qmsProductionInspectionValue.id !== undefined) {
            this.subscribeToSaveResponse(this.qmsProductionInspectionValueService.update(this.qmsProductionInspectionValue));
        } else {
            this.subscribeToSaveResponse(this.qmsProductionInspectionValueService.create(this.qmsProductionInspectionValue));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IQmsProductionInspectionValue>>) {
        result.subscribe(
            (res: HttpResponse<IQmsProductionInspectionValue>) => this.onSaveSuccess(),
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
