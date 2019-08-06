import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { IQmsUnit } from 'app/shared/model/qms-unit.model';
import { QmsUnitService } from './qms-unit.service';

@Component({
    selector: 'jhi-qms-unit-update',
    templateUrl: './qms-unit-update.component.html'
})
export class QmsUnitUpdateComponent implements OnInit {
    qmsUnit: IQmsUnit;
    isSaving: boolean;
    makeTime: string;
    modifyTime: string;

    constructor(private qmsUnitService: QmsUnitService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ qmsUnit }) => {
            this.qmsUnit = qmsUnit;
            this.makeTime = this.qmsUnit.makeTime != null ? this.qmsUnit.makeTime.format(DATE_TIME_FORMAT) : null;
            this.modifyTime = this.qmsUnit.modifyTime != null ? this.qmsUnit.modifyTime.format(DATE_TIME_FORMAT) : null;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        this.qmsUnit.makeTime = this.makeTime != null ? moment(this.makeTime, DATE_TIME_FORMAT) : null;
        this.qmsUnit.modifyTime = this.modifyTime != null ? moment(this.modifyTime, DATE_TIME_FORMAT) : null;
        if (this.qmsUnit.id !== undefined) {
            this.subscribeToSaveResponse(this.qmsUnitService.update(this.qmsUnit));
        } else {
            this.subscribeToSaveResponse(this.qmsUnitService.create(this.qmsUnit));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IQmsUnit>>) {
        result.subscribe((res: HttpResponse<IQmsUnit>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }
}
