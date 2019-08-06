import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { IHstServerInfoDetails } from 'app/shared/model/hst-server-info-details.model';
import { HstServerInfoDetailsService } from './hst-server-info-details.service';

@Component({
    selector: 'jhi-hst-server-info-details-update',
    templateUrl: './hst-server-info-details-update.component.html'
})
export class HstServerInfoDetailsUpdateComponent implements OnInit {
    hstServerInfoDetails: IHstServerInfoDetails;
    isSaving: boolean;
    insDateTime: string;
    updDateTime: string;
    delDateTime: string;
    triggerDateTime: string;

    constructor(private hstServerInfoDetailsService: HstServerInfoDetailsService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ hstServerInfoDetails }) => {
            this.hstServerInfoDetails = hstServerInfoDetails;
            this.insDateTime =
                this.hstServerInfoDetails.insDateTime != null ? this.hstServerInfoDetails.insDateTime.format(DATE_TIME_FORMAT) : null;
            this.updDateTime =
                this.hstServerInfoDetails.updDateTime != null ? this.hstServerInfoDetails.updDateTime.format(DATE_TIME_FORMAT) : null;
            this.delDateTime =
                this.hstServerInfoDetails.delDateTime != null ? this.hstServerInfoDetails.delDateTime.format(DATE_TIME_FORMAT) : null;
            this.triggerDateTime =
                this.hstServerInfoDetails.triggerDateTime != null
                    ? this.hstServerInfoDetails.triggerDateTime.format(DATE_TIME_FORMAT)
                    : null;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        this.hstServerInfoDetails.insDateTime = this.insDateTime != null ? moment(this.insDateTime, DATE_TIME_FORMAT) : null;
        this.hstServerInfoDetails.updDateTime = this.updDateTime != null ? moment(this.updDateTime, DATE_TIME_FORMAT) : null;
        this.hstServerInfoDetails.delDateTime = this.delDateTime != null ? moment(this.delDateTime, DATE_TIME_FORMAT) : null;
        this.hstServerInfoDetails.triggerDateTime = this.triggerDateTime != null ? moment(this.triggerDateTime, DATE_TIME_FORMAT) : null;
        if (this.hstServerInfoDetails.id !== undefined) {
            this.subscribeToSaveResponse(this.hstServerInfoDetailsService.update(this.hstServerInfoDetails));
        } else {
            this.subscribeToSaveResponse(this.hstServerInfoDetailsService.create(this.hstServerInfoDetails));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IHstServerInfoDetails>>) {
        result.subscribe(
            (res: HttpResponse<IHstServerInfoDetails>) => this.onSaveSuccess(),
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
