import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { IQmsCarRecordbookMain } from 'app/shared/model/qms-car-recordbook-main.model';
import { QmsCarRecordbookMainService } from './qms-car-recordbook-main.service';

@Component({
    selector: 'jhi-qms-car-recordbook-main-update',
    templateUrl: './qms-car-recordbook-main-update.component.html'
})
export class QmsCarRecordbookMainUpdateComponent implements OnInit {
    qmsCarRecordbookMain: IQmsCarRecordbookMain;
    isSaving: boolean;
    makeTime: string;
    modifyTime: string;

    constructor(private qmsCarRecordbookMainService: QmsCarRecordbookMainService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ qmsCarRecordbookMain }) => {
            this.qmsCarRecordbookMain = qmsCarRecordbookMain;
            this.makeTime = this.qmsCarRecordbookMain.makeTime != null ? this.qmsCarRecordbookMain.makeTime.format(DATE_TIME_FORMAT) : null;
            this.modifyTime =
                this.qmsCarRecordbookMain.modifyTime != null ? this.qmsCarRecordbookMain.modifyTime.format(DATE_TIME_FORMAT) : null;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        this.qmsCarRecordbookMain.makeTime = this.makeTime != null ? moment(this.makeTime, DATE_TIME_FORMAT) : null;
        this.qmsCarRecordbookMain.modifyTime = this.modifyTime != null ? moment(this.modifyTime, DATE_TIME_FORMAT) : null;
        if (this.qmsCarRecordbookMain.id !== undefined) {
            this.subscribeToSaveResponse(this.qmsCarRecordbookMainService.update(this.qmsCarRecordbookMain));
        } else {
            this.subscribeToSaveResponse(this.qmsCarRecordbookMainService.create(this.qmsCarRecordbookMain));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IQmsCarRecordbookMain>>) {
        result.subscribe(
            (res: HttpResponse<IQmsCarRecordbookMain>) => this.onSaveSuccess(),
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
