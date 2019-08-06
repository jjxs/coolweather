import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { IQmsEntryInspection } from 'app/shared/model/qms-entry-inspection.model';
import { QmsEntryInspectionService } from './qms-entry-inspection.service';

@Component({
    selector: 'jhi-qms-entry-inspection-update',
    templateUrl: './qms-entry-inspection-update.component.html'
})
export class QmsEntryInspectionUpdateComponent implements OnInit {
    qmsEntryInspection: IQmsEntryInspection;
    isSaving: boolean;
    checkDate: string;
    makeTime: string;
    modifyTime: string;

    constructor(private qmsEntryInspectionService: QmsEntryInspectionService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ qmsEntryInspection }) => {
            this.qmsEntryInspection = qmsEntryInspection;
            this.checkDate = this.qmsEntryInspection.checkDate != null ? this.qmsEntryInspection.checkDate.format(DATE_TIME_FORMAT) : null;
            this.makeTime = this.qmsEntryInspection.makeTime != null ? this.qmsEntryInspection.makeTime.format(DATE_TIME_FORMAT) : null;
            this.modifyTime =
                this.qmsEntryInspection.modifyTime != null ? this.qmsEntryInspection.modifyTime.format(DATE_TIME_FORMAT) : null;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        this.qmsEntryInspection.checkDate = this.checkDate != null ? moment(this.checkDate, DATE_TIME_FORMAT) : null;
        this.qmsEntryInspection.makeTime = this.makeTime != null ? moment(this.makeTime, DATE_TIME_FORMAT) : null;
        this.qmsEntryInspection.modifyTime = this.modifyTime != null ? moment(this.modifyTime, DATE_TIME_FORMAT) : null;
        if (this.qmsEntryInspection.id !== undefined) {
            this.subscribeToSaveResponse(this.qmsEntryInspectionService.update(this.qmsEntryInspection));
        } else {
            this.subscribeToSaveResponse(this.qmsEntryInspectionService.create(this.qmsEntryInspection));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IQmsEntryInspection>>) {
        result.subscribe((res: HttpResponse<IQmsEntryInspection>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }
}
