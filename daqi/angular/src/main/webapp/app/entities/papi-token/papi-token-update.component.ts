import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { IPapiToken } from 'app/shared/model/papi-token.model';
import { PapiTokenService } from './papi-token.service';

@Component({
    selector: 'jhi-papi-token-update',
    templateUrl: './papi-token-update.component.html'
})
export class PapiTokenUpdateComponent implements OnInit {
    papiToken: IPapiToken;
    isSaving: boolean;
    apiDate: string;
    insDateTime: string;
    updDateTime: string;
    delDateTime: string;
    triggerDateTime: string;

    constructor(private papiTokenService: PapiTokenService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ papiToken }) => {
            this.papiToken = papiToken;
            this.apiDate = this.papiToken.apiDate != null ? this.papiToken.apiDate.format(DATE_TIME_FORMAT) : null;
            this.insDateTime = this.papiToken.insDateTime != null ? this.papiToken.insDateTime.format(DATE_TIME_FORMAT) : null;
            this.updDateTime = this.papiToken.updDateTime != null ? this.papiToken.updDateTime.format(DATE_TIME_FORMAT) : null;
            this.delDateTime = this.papiToken.delDateTime != null ? this.papiToken.delDateTime.format(DATE_TIME_FORMAT) : null;
            this.triggerDateTime = this.papiToken.triggerDateTime != null ? this.papiToken.triggerDateTime.format(DATE_TIME_FORMAT) : null;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        this.papiToken.apiDate = this.apiDate != null ? moment(this.apiDate, DATE_TIME_FORMAT) : null;
        this.papiToken.insDateTime = this.insDateTime != null ? moment(this.insDateTime, DATE_TIME_FORMAT) : null;
        this.papiToken.updDateTime = this.updDateTime != null ? moment(this.updDateTime, DATE_TIME_FORMAT) : null;
        this.papiToken.delDateTime = this.delDateTime != null ? moment(this.delDateTime, DATE_TIME_FORMAT) : null;
        this.papiToken.triggerDateTime = this.triggerDateTime != null ? moment(this.triggerDateTime, DATE_TIME_FORMAT) : null;
        if (this.papiToken.id !== undefined) {
            this.subscribeToSaveResponse(this.papiTokenService.update(this.papiToken));
        } else {
            this.subscribeToSaveResponse(this.papiTokenService.create(this.papiToken));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IPapiToken>>) {
        result.subscribe((res: HttpResponse<IPapiToken>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }
}
