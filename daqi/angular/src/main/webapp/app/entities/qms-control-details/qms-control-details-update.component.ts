import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { IQmsControlDetails } from 'app/shared/model/qms-control-details.model';
import { QmsControlDetailsService } from './qms-control-details.service';

@Component({
    selector: 'jhi-qms-control-details-update',
    templateUrl: './qms-control-details-update.component.html'
})
export class QmsControlDetailsUpdateComponent implements OnInit {
    qmsControlDetails: IQmsControlDetails;
    isSaving: boolean;
    makeTime: string;
    modifyTime: string;

    constructor(private qmsControlDetailsService: QmsControlDetailsService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ qmsControlDetails }) => {
            this.qmsControlDetails = qmsControlDetails;
            this.makeTime = this.qmsControlDetails.makeTime != null ? this.qmsControlDetails.makeTime.format(DATE_TIME_FORMAT) : null;
            this.modifyTime = this.qmsControlDetails.modifyTime != null ? this.qmsControlDetails.modifyTime.format(DATE_TIME_FORMAT) : null;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        this.qmsControlDetails.makeTime = this.makeTime != null ? moment(this.makeTime, DATE_TIME_FORMAT) : null;
        this.qmsControlDetails.modifyTime = this.modifyTime != null ? moment(this.modifyTime, DATE_TIME_FORMAT) : null;
        if (this.qmsControlDetails.id !== undefined) {
            this.subscribeToSaveResponse(this.qmsControlDetailsService.update(this.qmsControlDetails));
        } else {
            this.subscribeToSaveResponse(this.qmsControlDetailsService.create(this.qmsControlDetails));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IQmsControlDetails>>) {
        result.subscribe((res: HttpResponse<IQmsControlDetails>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }
}
