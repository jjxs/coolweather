import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { IQmsCarRecordbookDetails } from 'app/shared/model/qms-car-recordbook-details.model';
import { QmsCarRecordbookDetailsService } from './qms-car-recordbook-details.service';

@Component({
    selector: 'jhi-qms-car-recordbook-details-update',
    templateUrl: './qms-car-recordbook-details-update.component.html'
})
export class QmsCarRecordbookDetailsUpdateComponent implements OnInit {
    qmsCarRecordbookDetails: IQmsCarRecordbookDetails;
    isSaving: boolean;
    makeTime: string;
    modifyTime: string;

    constructor(private qmsCarRecordbookDetailsService: QmsCarRecordbookDetailsService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ qmsCarRecordbookDetails }) => {
            this.qmsCarRecordbookDetails = qmsCarRecordbookDetails;
            this.makeTime =
                this.qmsCarRecordbookDetails.makeTime != null ? this.qmsCarRecordbookDetails.makeTime.format(DATE_TIME_FORMAT) : null;
            this.modifyTime =
                this.qmsCarRecordbookDetails.modifyTime != null ? this.qmsCarRecordbookDetails.modifyTime.format(DATE_TIME_FORMAT) : null;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        this.qmsCarRecordbookDetails.makeTime = this.makeTime != null ? moment(this.makeTime, DATE_TIME_FORMAT) : null;
        this.qmsCarRecordbookDetails.modifyTime = this.modifyTime != null ? moment(this.modifyTime, DATE_TIME_FORMAT) : null;
        if (this.qmsCarRecordbookDetails.id !== undefined) {
            this.subscribeToSaveResponse(this.qmsCarRecordbookDetailsService.update(this.qmsCarRecordbookDetails));
        } else {
            this.subscribeToSaveResponse(this.qmsCarRecordbookDetailsService.create(this.qmsCarRecordbookDetails));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IQmsCarRecordbookDetails>>) {
        result.subscribe(
            (res: HttpResponse<IQmsCarRecordbookDetails>) => this.onSaveSuccess(),
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
