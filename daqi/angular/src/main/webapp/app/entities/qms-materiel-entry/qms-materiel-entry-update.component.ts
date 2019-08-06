import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { IQmsMaterielEntry } from 'app/shared/model/qms-materiel-entry.model';
import { QmsMaterielEntryService } from './qms-materiel-entry.service';

@Component({
    selector: 'jhi-qms-materiel-entry-update',
    templateUrl: './qms-materiel-entry-update.component.html'
})
export class QmsMaterielEntryUpdateComponent implements OnInit {
    qmsMaterielEntry: IQmsMaterielEntry;
    isSaving: boolean;
    entryDate: string;
    inspectionTime: string;
    inspectionCompletedTime: string;
    makeTime: string;
    modifyTime: string;

    constructor(private qmsMaterielEntryService: QmsMaterielEntryService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ qmsMaterielEntry }) => {
            this.qmsMaterielEntry = qmsMaterielEntry;
            this.entryDate = this.qmsMaterielEntry.entryDate != null ? this.qmsMaterielEntry.entryDate.format(DATE_TIME_FORMAT) : null;
            this.inspectionTime =
                this.qmsMaterielEntry.inspectionTime != null ? this.qmsMaterielEntry.inspectionTime.format(DATE_TIME_FORMAT) : null;
            this.inspectionCompletedTime =
                this.qmsMaterielEntry.inspectionCompletedTime != null
                    ? this.qmsMaterielEntry.inspectionCompletedTime.format(DATE_TIME_FORMAT)
                    : null;
            this.makeTime = this.qmsMaterielEntry.makeTime != null ? this.qmsMaterielEntry.makeTime.format(DATE_TIME_FORMAT) : null;
            this.modifyTime = this.qmsMaterielEntry.modifyTime != null ? this.qmsMaterielEntry.modifyTime.format(DATE_TIME_FORMAT) : null;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        this.qmsMaterielEntry.entryDate = this.entryDate != null ? moment(this.entryDate, DATE_TIME_FORMAT) : null;
        this.qmsMaterielEntry.inspectionTime = this.inspectionTime != null ? moment(this.inspectionTime, DATE_TIME_FORMAT) : null;
        this.qmsMaterielEntry.inspectionCompletedTime =
            this.inspectionCompletedTime != null ? moment(this.inspectionCompletedTime, DATE_TIME_FORMAT) : null;
        this.qmsMaterielEntry.makeTime = this.makeTime != null ? moment(this.makeTime, DATE_TIME_FORMAT) : null;
        this.qmsMaterielEntry.modifyTime = this.modifyTime != null ? moment(this.modifyTime, DATE_TIME_FORMAT) : null;
        if (this.qmsMaterielEntry.id !== undefined) {
            this.subscribeToSaveResponse(this.qmsMaterielEntryService.update(this.qmsMaterielEntry));
        } else {
            this.subscribeToSaveResponse(this.qmsMaterielEntryService.create(this.qmsMaterielEntry));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IQmsMaterielEntry>>) {
        result.subscribe((res: HttpResponse<IQmsMaterielEntry>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }
}
