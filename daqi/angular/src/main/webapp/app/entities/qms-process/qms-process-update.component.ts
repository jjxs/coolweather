import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { IQmsProcess } from 'app/shared/model/qms-process.model';
import { QmsProcessService } from './qms-process.service';

@Component({
    selector: 'jhi-qms-process-update',
    templateUrl: './qms-process-update.component.html'
})
export class QmsProcessUpdateComponent implements OnInit {
    qmsProcess: IQmsProcess;
    isSaving: boolean;
    makeTime: string;
    modifyTime: string;

    constructor(private qmsProcessService: QmsProcessService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ qmsProcess }) => {
            this.qmsProcess = qmsProcess;
            this.makeTime = this.qmsProcess.makeTime != null ? this.qmsProcess.makeTime.format(DATE_TIME_FORMAT) : null;
            this.modifyTime = this.qmsProcess.modifyTime != null ? this.qmsProcess.modifyTime.format(DATE_TIME_FORMAT) : null;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        this.qmsProcess.makeTime = this.makeTime != null ? moment(this.makeTime, DATE_TIME_FORMAT) : null;
        this.qmsProcess.modifyTime = this.modifyTime != null ? moment(this.modifyTime, DATE_TIME_FORMAT) : null;
        if (this.qmsProcess.id !== undefined) {
            this.subscribeToSaveResponse(this.qmsProcessService.update(this.qmsProcess));
        } else {
            this.subscribeToSaveResponse(this.qmsProcessService.create(this.qmsProcess));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IQmsProcess>>) {
        result.subscribe((res: HttpResponse<IQmsProcess>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }
}
