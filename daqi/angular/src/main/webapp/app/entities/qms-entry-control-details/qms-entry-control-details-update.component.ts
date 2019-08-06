import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { IQmsEntryControlDetails } from 'app/shared/model/qms-entry-control-details.model';
import { QmsEntryControlDetailsService } from './qms-entry-control-details.service';

@Component({
    selector: 'jhi-qms-entry-control-details-update',
    templateUrl: './qms-entry-control-details-update.component.html'
})
export class QmsEntryControlDetailsUpdateComponent implements OnInit {
    qmsEntryControlDetails: IQmsEntryControlDetails;
    isSaving: boolean;
    loseTime: string;
    makeTime: string;
    modifyTime: string;

    constructor(private qmsEntryControlDetailsService: QmsEntryControlDetailsService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ qmsEntryControlDetails }) => {
            this.qmsEntryControlDetails = qmsEntryControlDetails;
            this.loseTime =
                this.qmsEntryControlDetails.loseTime != null ? this.qmsEntryControlDetails.loseTime.format(DATE_TIME_FORMAT) : null;
            this.makeTime =
                this.qmsEntryControlDetails.makeTime != null ? this.qmsEntryControlDetails.makeTime.format(DATE_TIME_FORMAT) : null;
            this.modifyTime =
                this.qmsEntryControlDetails.modifyTime != null ? this.qmsEntryControlDetails.modifyTime.format(DATE_TIME_FORMAT) : null;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        this.qmsEntryControlDetails.loseTime = this.loseTime != null ? moment(this.loseTime, DATE_TIME_FORMAT) : null;
        this.qmsEntryControlDetails.makeTime = this.makeTime != null ? moment(this.makeTime, DATE_TIME_FORMAT) : null;
        this.qmsEntryControlDetails.modifyTime = this.modifyTime != null ? moment(this.modifyTime, DATE_TIME_FORMAT) : null;
        if (this.qmsEntryControlDetails.id !== undefined) {
            this.subscribeToSaveResponse(this.qmsEntryControlDetailsService.update(this.qmsEntryControlDetails));
        } else {
            this.subscribeToSaveResponse(this.qmsEntryControlDetailsService.create(this.qmsEntryControlDetails));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IQmsEntryControlDetails>>) {
        result.subscribe(
            (res: HttpResponse<IQmsEntryControlDetails>) => this.onSaveSuccess(),
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
