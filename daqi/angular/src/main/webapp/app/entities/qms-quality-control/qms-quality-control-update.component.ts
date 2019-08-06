import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { IQmsQualityControl } from 'app/shared/model/qms-quality-control.model';
import { QmsQualityControlService } from './qms-quality-control.service';

@Component({
    selector: 'jhi-qms-quality-control-update',
    templateUrl: './qms-quality-control-update.component.html'
})
export class QmsQualityControlUpdateComponent implements OnInit {
    qmsQualityControl: IQmsQualityControl;
    isSaving: boolean;
    makeTime: string;
    modifyTime: string;

    constructor(private qmsQualityControlService: QmsQualityControlService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ qmsQualityControl }) => {
            this.qmsQualityControl = qmsQualityControl;
            this.makeTime = this.qmsQualityControl.makeTime != null ? this.qmsQualityControl.makeTime.format(DATE_TIME_FORMAT) : null;
            this.modifyTime = this.qmsQualityControl.modifyTime != null ? this.qmsQualityControl.modifyTime.format(DATE_TIME_FORMAT) : null;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        this.qmsQualityControl.makeTime = this.makeTime != null ? moment(this.makeTime, DATE_TIME_FORMAT) : null;
        this.qmsQualityControl.modifyTime = this.modifyTime != null ? moment(this.modifyTime, DATE_TIME_FORMAT) : null;
        if (this.qmsQualityControl.id !== undefined) {
            this.subscribeToSaveResponse(this.qmsQualityControlService.update(this.qmsQualityControl));
        } else {
            this.subscribeToSaveResponse(this.qmsQualityControlService.create(this.qmsQualityControl));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IQmsQualityControl>>) {
        result.subscribe((res: HttpResponse<IQmsQualityControl>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }
}
