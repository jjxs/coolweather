import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { IQmsMicSwicthRegulattoTest } from 'app/shared/model/qms-mic-swicth-regulatto-test.model';
import { QmsMicSwicthRegulattoTestService } from './qms-mic-swicth-regulatto-test.service';

@Component({
    selector: 'jhi-qms-mic-swicth-regulatto-test-update',
    templateUrl: './qms-mic-swicth-regulatto-test-update.component.html'
})
export class QmsMicSwicthRegulattoTestUpdateComponent implements OnInit {
    qmsMicSwicthRegulattoTest: IQmsMicSwicthRegulattoTest;
    isSaving: boolean;
    makeTime: string;
    modifyTime: string;

    constructor(private qmsMicSwicthRegulattoTestService: QmsMicSwicthRegulattoTestService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ qmsMicSwicthRegulattoTest }) => {
            this.qmsMicSwicthRegulattoTest = qmsMicSwicthRegulattoTest;
            this.makeTime =
                this.qmsMicSwicthRegulattoTest.makeTime != null ? this.qmsMicSwicthRegulattoTest.makeTime.format(DATE_TIME_FORMAT) : null;
            this.modifyTime =
                this.qmsMicSwicthRegulattoTest.modifyTime != null
                    ? this.qmsMicSwicthRegulattoTest.modifyTime.format(DATE_TIME_FORMAT)
                    : null;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        this.qmsMicSwicthRegulattoTest.makeTime = this.makeTime != null ? moment(this.makeTime, DATE_TIME_FORMAT) : null;
        this.qmsMicSwicthRegulattoTest.modifyTime = this.modifyTime != null ? moment(this.modifyTime, DATE_TIME_FORMAT) : null;
        if (this.qmsMicSwicthRegulattoTest.id !== undefined) {
            this.subscribeToSaveResponse(this.qmsMicSwicthRegulattoTestService.update(this.qmsMicSwicthRegulattoTest));
        } else {
            this.subscribeToSaveResponse(this.qmsMicSwicthRegulattoTestService.create(this.qmsMicSwicthRegulattoTest));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IQmsMicSwicthRegulattoTest>>) {
        result.subscribe(
            (res: HttpResponse<IQmsMicSwicthRegulattoTest>) => this.onSaveSuccess(),
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
