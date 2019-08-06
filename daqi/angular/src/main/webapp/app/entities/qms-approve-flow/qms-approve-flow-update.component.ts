import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { IQmsApproveFlow } from 'app/shared/model/qms-approve-flow.model';
import { QmsApproveFlowService } from './qms-approve-flow.service';

@Component({
    selector: 'jhi-qms-approve-flow-update',
    templateUrl: './qms-approve-flow-update.component.html'
})
export class QmsApproveFlowUpdateComponent implements OnInit {
    qmsApproveFlow: IQmsApproveFlow;
    isSaving: boolean;
    makeTime: string;
    modifyTime: string;

    constructor(private qmsApproveFlowService: QmsApproveFlowService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ qmsApproveFlow }) => {
            this.qmsApproveFlow = qmsApproveFlow;
            this.makeTime = this.qmsApproveFlow.makeTime != null ? this.qmsApproveFlow.makeTime.format(DATE_TIME_FORMAT) : null;
            this.modifyTime = this.qmsApproveFlow.modifyTime != null ? this.qmsApproveFlow.modifyTime.format(DATE_TIME_FORMAT) : null;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        this.qmsApproveFlow.makeTime = this.makeTime != null ? moment(this.makeTime, DATE_TIME_FORMAT) : null;
        this.qmsApproveFlow.modifyTime = this.modifyTime != null ? moment(this.modifyTime, DATE_TIME_FORMAT) : null;
        if (this.qmsApproveFlow.id !== undefined) {
            this.subscribeToSaveResponse(this.qmsApproveFlowService.update(this.qmsApproveFlow));
        } else {
            this.subscribeToSaveResponse(this.qmsApproveFlowService.create(this.qmsApproveFlow));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IQmsApproveFlow>>) {
        result.subscribe((res: HttpResponse<IQmsApproveFlow>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }
}
