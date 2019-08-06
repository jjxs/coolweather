import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { IQmsDefect } from 'app/shared/model/qms-defect.model';
import { QmsDefectService } from './qms-defect.service';

@Component({
    selector: 'jhi-qms-defect-update',
    templateUrl: './qms-defect-update.component.html'
})
export class QmsDefectUpdateComponent implements OnInit {
    qmsDefect: IQmsDefect;
    isSaving: boolean;
    makeTime: string;
    modifyTime: string;

    constructor(private qmsDefectService: QmsDefectService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ qmsDefect }) => {
            this.qmsDefect = qmsDefect;
            this.makeTime = this.qmsDefect.makeTime != null ? this.qmsDefect.makeTime.format(DATE_TIME_FORMAT) : null;
            this.modifyTime = this.qmsDefect.modifyTime != null ? this.qmsDefect.modifyTime.format(DATE_TIME_FORMAT) : null;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        this.qmsDefect.makeTime = this.makeTime != null ? moment(this.makeTime, DATE_TIME_FORMAT) : null;
        this.qmsDefect.modifyTime = this.modifyTime != null ? moment(this.modifyTime, DATE_TIME_FORMAT) : null;
        if (this.qmsDefect.id !== undefined) {
            this.subscribeToSaveResponse(this.qmsDefectService.update(this.qmsDefect));
        } else {
            this.subscribeToSaveResponse(this.qmsDefectService.create(this.qmsDefect));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IQmsDefect>>) {
        result.subscribe((res: HttpResponse<IQmsDefect>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }
}
