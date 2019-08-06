import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { IQmsProductionInspection } from 'app/shared/model/qms-production-inspection.model';
import { QmsProductionInspectionService } from './qms-production-inspection.service';

@Component({
    selector: 'jhi-qms-production-inspection-update',
    templateUrl: './qms-production-inspection-update.component.html'
})
export class QmsProductionInspectionUpdateComponent implements OnInit {
    qmsProductionInspection: IQmsProductionInspection;
    isSaving: boolean;
    makeTime: string;
    modifyTime: string;

    constructor(private qmsProductionInspectionService: QmsProductionInspectionService, private activatedRoute: ActivatedRoute) {}

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
        window.history.back();
    }

    save() {
        this.isSaving = true;
        this.qmsProductionInspection.makeTime = this.makeTime != null ? moment(this.makeTime, DATE_TIME_FORMAT) : null;
        this.qmsProductionInspection.modifyTime = this.modifyTime != null ? moment(this.modifyTime, DATE_TIME_FORMAT) : null;
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
