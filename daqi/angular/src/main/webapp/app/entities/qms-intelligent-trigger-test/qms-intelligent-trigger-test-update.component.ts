import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { IQmsIntelligentTriggerTest } from 'app/shared/model/qms-intelligent-trigger-test.model';
import { QmsIntelligentTriggerTestService } from './qms-intelligent-trigger-test.service';

@Component({
    selector: 'jhi-qms-intelligent-trigger-test-update',
    templateUrl: './qms-intelligent-trigger-test-update.component.html'
})
export class QmsIntelligentTriggerTestUpdateComponent implements OnInit {
    qmsIntelligentTriggerTest: IQmsIntelligentTriggerTest;
    isSaving: boolean;
    makeTime: string;
    modifyTime: string;

    constructor(private qmsIntelligentTriggerTestService: QmsIntelligentTriggerTestService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ qmsIntelligentTriggerTest }) => {
            this.qmsIntelligentTriggerTest = qmsIntelligentTriggerTest;
            this.makeTime =
                this.qmsIntelligentTriggerTest.makeTime != null ? this.qmsIntelligentTriggerTest.makeTime.format(DATE_TIME_FORMAT) : null;
            this.modifyTime =
                this.qmsIntelligentTriggerTest.modifyTime != null
                    ? this.qmsIntelligentTriggerTest.modifyTime.format(DATE_TIME_FORMAT)
                    : null;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        this.qmsIntelligentTriggerTest.makeTime = this.makeTime != null ? moment(this.makeTime, DATE_TIME_FORMAT) : null;
        this.qmsIntelligentTriggerTest.modifyTime = this.modifyTime != null ? moment(this.modifyTime, DATE_TIME_FORMAT) : null;
        if (this.qmsIntelligentTriggerTest.id !== undefined) {
            this.subscribeToSaveResponse(this.qmsIntelligentTriggerTestService.update(this.qmsIntelligentTriggerTest));
        } else {
            this.subscribeToSaveResponse(this.qmsIntelligentTriggerTestService.create(this.qmsIntelligentTriggerTest));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IQmsIntelligentTriggerTest>>) {
        result.subscribe(
            (res: HttpResponse<IQmsIntelligentTriggerTest>) => this.onSaveSuccess(),
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
