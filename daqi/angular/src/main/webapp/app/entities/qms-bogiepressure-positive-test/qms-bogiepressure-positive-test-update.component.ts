import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { IQmsBogiepressurePositiveTest } from 'app/shared/model/qms-bogiepressure-positive-test.model';
import { QmsBogiepressurePositiveTestService } from './qms-bogiepressure-positive-test.service';

@Component({
    selector: 'jhi-qms-bogiepressure-positive-test-update',
    templateUrl: './qms-bogiepressure-positive-test-update.component.html'
})
export class QmsBogiepressurePositiveTestUpdateComponent implements OnInit {
    qmsBogiepressurePositiveTest: IQmsBogiepressurePositiveTest;
    isSaving: boolean;
    makeTime: string;
    modifyTime: string;

    constructor(private qmsBogiepressurePositiveTestService: QmsBogiepressurePositiveTestService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ qmsBogiepressurePositiveTest }) => {
            this.qmsBogiepressurePositiveTest = qmsBogiepressurePositiveTest;
            this.makeTime =
                this.qmsBogiepressurePositiveTest.makeTime != null
                    ? this.qmsBogiepressurePositiveTest.makeTime.format(DATE_TIME_FORMAT)
                    : null;
            this.modifyTime =
                this.qmsBogiepressurePositiveTest.modifyTime != null
                    ? this.qmsBogiepressurePositiveTest.modifyTime.format(DATE_TIME_FORMAT)
                    : null;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        this.qmsBogiepressurePositiveTest.makeTime = this.makeTime != null ? moment(this.makeTime, DATE_TIME_FORMAT) : null;
        this.qmsBogiepressurePositiveTest.modifyTime = this.modifyTime != null ? moment(this.modifyTime, DATE_TIME_FORMAT) : null;
        if (this.qmsBogiepressurePositiveTest.id !== undefined) {
            this.subscribeToSaveResponse(this.qmsBogiepressurePositiveTestService.update(this.qmsBogiepressurePositiveTest));
        } else {
            this.subscribeToSaveResponse(this.qmsBogiepressurePositiveTestService.create(this.qmsBogiepressurePositiveTest));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IQmsBogiepressurePositiveTest>>) {
        result.subscribe(
            (res: HttpResponse<IQmsBogiepressurePositiveTest>) => this.onSaveSuccess(),
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
