import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { IQmsApproveResult } from 'app/shared/model/qms-approve-result.model';
import { QmsApproveResultService } from './qms-approve-result.service';

@Component({
    selector: 'jhi-qms-approve-result-update',
    templateUrl: './qms-approve-result-update.component.html'
})
export class QmsApproveResultUpdateComponent implements OnInit {
    qmsApproveResult: IQmsApproveResult;
    isSaving: boolean;
    approveTime: string;
    makeTime: string;
    modifyTime: string;

    constructor(private qmsApproveResultService: QmsApproveResultService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ qmsApproveResult }) => {
            this.qmsApproveResult = qmsApproveResult;
            this.approveTime =
                this.qmsApproveResult.approveTime != null ? this.qmsApproveResult.approveTime.format(DATE_TIME_FORMAT) : null;
            this.makeTime = this.qmsApproveResult.makeTime != null ? this.qmsApproveResult.makeTime.format(DATE_TIME_FORMAT) : null;
            this.modifyTime = this.qmsApproveResult.modifyTime != null ? this.qmsApproveResult.modifyTime.format(DATE_TIME_FORMAT) : null;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        this.qmsApproveResult.approveTime = this.approveTime != null ? moment(this.approveTime, DATE_TIME_FORMAT) : null;
        this.qmsApproveResult.makeTime = this.makeTime != null ? moment(this.makeTime, DATE_TIME_FORMAT) : null;
        this.qmsApproveResult.modifyTime = this.modifyTime != null ? moment(this.modifyTime, DATE_TIME_FORMAT) : null;
        if (this.qmsApproveResult.id !== undefined) {
            this.subscribeToSaveResponse(this.qmsApproveResultService.update(this.qmsApproveResult));
        } else {
            this.subscribeToSaveResponse(this.qmsApproveResultService.create(this.qmsApproveResult));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IQmsApproveResult>>) {
        result.subscribe((res: HttpResponse<IQmsApproveResult>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }
}
