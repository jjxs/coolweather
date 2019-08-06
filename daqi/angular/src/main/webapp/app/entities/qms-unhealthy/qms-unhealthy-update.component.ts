import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { IQmsUnhealthy } from 'app/shared/model/qms-unhealthy.model';
import { QmsUnhealthyService } from './qms-unhealthy.service';

@Component({
    selector: 'jhi-qms-unhealthy-update',
    templateUrl: './qms-unhealthy-update.component.html'
})
export class QmsUnhealthyUpdateComponent implements OnInit {
    qmsUnhealthy: IQmsUnhealthy;
    isSaving: boolean;
    makeTime: string;
    modifyTime: string;

    constructor(private qmsUnhealthyService: QmsUnhealthyService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ qmsUnhealthy }) => {
            this.qmsUnhealthy = qmsUnhealthy;
            this.makeTime = this.qmsUnhealthy.makeTime != null ? this.qmsUnhealthy.makeTime.format(DATE_TIME_FORMAT) : null;
            this.modifyTime = this.qmsUnhealthy.modifyTime != null ? this.qmsUnhealthy.modifyTime.format(DATE_TIME_FORMAT) : null;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        this.qmsUnhealthy.makeTime = this.makeTime != null ? moment(this.makeTime, DATE_TIME_FORMAT) : null;
        this.qmsUnhealthy.modifyTime = this.modifyTime != null ? moment(this.modifyTime, DATE_TIME_FORMAT) : null;
        if (this.qmsUnhealthy.id !== undefined) {
            this.subscribeToSaveResponse(this.qmsUnhealthyService.update(this.qmsUnhealthy));
        } else {
            this.subscribeToSaveResponse(this.qmsUnhealthyService.create(this.qmsUnhealthy));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IQmsUnhealthy>>) {
        result.subscribe((res: HttpResponse<IQmsUnhealthy>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }
}
