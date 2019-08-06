import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { IQmsProductionTask } from 'app/shared/model/qms-production-task.model';
import { QmsProductionTaskService } from './qms-production-task.service';

@Component({
    selector: 'jhi-qms-production-task-update',
    templateUrl: './qms-production-task-update.component.html'
})
export class QmsProductionTaskUpdateComponent implements OnInit {
    qmsProductionTask: IQmsProductionTask;
    isSaving: boolean;
    makeTime: string;
    modifyTime: string;

    constructor(private qmsProductionTaskService: QmsProductionTaskService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ qmsProductionTask }) => {
            this.qmsProductionTask = qmsProductionTask;
            this.makeTime = this.qmsProductionTask.makeTime != null ? this.qmsProductionTask.makeTime.format(DATE_TIME_FORMAT) : null;
            this.modifyTime = this.qmsProductionTask.modifyTime != null ? this.qmsProductionTask.modifyTime.format(DATE_TIME_FORMAT) : null;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        this.qmsProductionTask.makeTime = this.makeTime != null ? moment(this.makeTime, DATE_TIME_FORMAT) : null;
        this.qmsProductionTask.modifyTime = this.modifyTime != null ? moment(this.modifyTime, DATE_TIME_FORMAT) : null;
        if (this.qmsProductionTask.id !== undefined) {
            this.subscribeToSaveResponse(this.qmsProductionTaskService.update(this.qmsProductionTask));
        } else {
            this.subscribeToSaveResponse(this.qmsProductionTaskService.create(this.qmsProductionTask));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IQmsProductionTask>>) {
        result.subscribe((res: HttpResponse<IQmsProductionTask>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }
}
