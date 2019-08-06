import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { IQmsNrvTelation } from 'app/shared/model/qms-nrv-telation.model';
import { QmsNrvTelationService } from './qms-nrv-telation.service';

@Component({
    selector: 'jhi-qms-nrv-telation-update',
    templateUrl: './qms-nrv-telation-update.component.html'
})
export class QmsNrvTelationUpdateComponent implements OnInit {
    qmsNrvTelation: IQmsNrvTelation;
    isSaving: boolean;
    makeTime: string;
    modifyTime: string;

    constructor(private qmsNrvTelationService: QmsNrvTelationService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ qmsNrvTelation }) => {
            this.qmsNrvTelation = qmsNrvTelation;
            this.makeTime = this.qmsNrvTelation.makeTime != null ? this.qmsNrvTelation.makeTime.format(DATE_TIME_FORMAT) : null;
            this.modifyTime = this.qmsNrvTelation.modifyTime != null ? this.qmsNrvTelation.modifyTime.format(DATE_TIME_FORMAT) : null;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        this.qmsNrvTelation.makeTime = this.makeTime != null ? moment(this.makeTime, DATE_TIME_FORMAT) : null;
        this.qmsNrvTelation.modifyTime = this.modifyTime != null ? moment(this.modifyTime, DATE_TIME_FORMAT) : null;
        if (this.qmsNrvTelation.id !== undefined) {
            this.subscribeToSaveResponse(this.qmsNrvTelationService.update(this.qmsNrvTelation));
        } else {
            this.subscribeToSaveResponse(this.qmsNrvTelationService.create(this.qmsNrvTelation));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IQmsNrvTelation>>) {
        result.subscribe((res: HttpResponse<IQmsNrvTelation>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }
}
