import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { IQmsBogiepressureTonTest } from 'app/shared/model/qms-bogiepressure-ton-test.model';
import { QmsBogiepressureTonTestService } from './qms-bogiepressure-ton-test.service';

@Component({
    selector: 'jhi-qms-bogiepressure-ton-test-update',
    templateUrl: './qms-bogiepressure-ton-test-update.component.html'
})
export class QmsBogiepressureTonTestUpdateComponent implements OnInit {
    qmsBogiepressureTonTest: IQmsBogiepressureTonTest;
    isSaving: boolean;
    makeTime: string;
    modifyTime: string;

    constructor(private qmsBogiepressureTonTestService: QmsBogiepressureTonTestService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ qmsBogiepressureTonTest }) => {
            this.qmsBogiepressureTonTest = qmsBogiepressureTonTest;
            this.makeTime =
                this.qmsBogiepressureTonTest.makeTime != null ? this.qmsBogiepressureTonTest.makeTime.format(DATE_TIME_FORMAT) : null;
            this.modifyTime =
                this.qmsBogiepressureTonTest.modifyTime != null ? this.qmsBogiepressureTonTest.modifyTime.format(DATE_TIME_FORMAT) : null;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        this.qmsBogiepressureTonTest.makeTime = this.makeTime != null ? moment(this.makeTime, DATE_TIME_FORMAT) : null;
        this.qmsBogiepressureTonTest.modifyTime = this.modifyTime != null ? moment(this.modifyTime, DATE_TIME_FORMAT) : null;
        if (this.qmsBogiepressureTonTest.id !== undefined) {
            this.subscribeToSaveResponse(this.qmsBogiepressureTonTestService.update(this.qmsBogiepressureTonTest));
        } else {
            this.subscribeToSaveResponse(this.qmsBogiepressureTonTestService.create(this.qmsBogiepressureTonTest));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IQmsBogiepressureTonTest>>) {
        result.subscribe(
            (res: HttpResponse<IQmsBogiepressureTonTest>) => this.onSaveSuccess(),
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
