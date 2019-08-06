import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { IQmsBreathingSafetyTest } from 'app/shared/model/qms-breathing-safety-test.model';
import { QmsBreathingSafetyTestService } from './qms-breathing-safety-test.service';

@Component({
    selector: 'jhi-qms-breathing-safety-test-update',
    templateUrl: './qms-breathing-safety-test-update.component.html'
})
export class QmsBreathingSafetyTestUpdateComponent implements OnInit {
    qmsBreathingSafetyTest: IQmsBreathingSafetyTest;
    isSaving: boolean;
    makeTime: string;
    modifyTime: string;

    constructor(private qmsBreathingSafetyTestService: QmsBreathingSafetyTestService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ qmsBreathingSafetyTest }) => {
            this.qmsBreathingSafetyTest = qmsBreathingSafetyTest;
            this.makeTime =
                this.qmsBreathingSafetyTest.makeTime != null ? this.qmsBreathingSafetyTest.makeTime.format(DATE_TIME_FORMAT) : null;
            this.modifyTime =
                this.qmsBreathingSafetyTest.modifyTime != null ? this.qmsBreathingSafetyTest.modifyTime.format(DATE_TIME_FORMAT) : null;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        this.qmsBreathingSafetyTest.makeTime = this.makeTime != null ? moment(this.makeTime, DATE_TIME_FORMAT) : null;
        this.qmsBreathingSafetyTest.modifyTime = this.modifyTime != null ? moment(this.modifyTime, DATE_TIME_FORMAT) : null;
        if (this.qmsBreathingSafetyTest.id !== undefined) {
            this.subscribeToSaveResponse(this.qmsBreathingSafetyTestService.update(this.qmsBreathingSafetyTest));
        } else {
            this.subscribeToSaveResponse(this.qmsBreathingSafetyTestService.create(this.qmsBreathingSafetyTest));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IQmsBreathingSafetyTest>>) {
        result.subscribe(
            (res: HttpResponse<IQmsBreathingSafetyTest>) => this.onSaveSuccess(),
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
