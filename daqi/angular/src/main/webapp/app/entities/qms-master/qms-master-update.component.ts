import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { IQmsMaster } from 'app/shared/model/qms-master.model';
import { QmsMasterService } from './qms-master.service';

@Component({
    selector: 'jhi-qms-master-update',
    templateUrl: './qms-master-update.component.html'
})
export class QmsMasterUpdateComponent implements OnInit {
    qmsMaster: IQmsMaster;
    isSaving: boolean;
    makeTime: string;
    modifyTime: string;

    constructor(private qmsMasterService: QmsMasterService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ qmsMaster }) => {
            this.qmsMaster = qmsMaster;
            this.makeTime = this.qmsMaster.makeTime != null ? this.qmsMaster.makeTime.format(DATE_TIME_FORMAT) : null;
            this.modifyTime = this.qmsMaster.modifyTime != null ? this.qmsMaster.modifyTime.format(DATE_TIME_FORMAT) : null;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        this.qmsMaster.makeTime = this.makeTime != null ? moment(this.makeTime, DATE_TIME_FORMAT) : null;
        this.qmsMaster.modifyTime = this.modifyTime != null ? moment(this.modifyTime, DATE_TIME_FORMAT) : null;
        if (this.qmsMaster.id !== undefined) {
            this.subscribeToSaveResponse(this.qmsMasterService.update(this.qmsMaster));
        } else {
            this.subscribeToSaveResponse(this.qmsMasterService.create(this.qmsMaster));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IQmsMaster>>) {
        result.subscribe((res: HttpResponse<IQmsMaster>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }
}
