import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { IQmsNotice } from 'app/shared/model/qms-notice.model';
import { QmsNoticeService } from './qms-notice.service';

@Component({
    selector: 'jhi-qms-notice-update',
    templateUrl: './qms-notice-update.component.html'
})
export class QmsNoticeUpdateComponent implements OnInit {
    qmsNotice: IQmsNotice;
    isSaving: boolean;
    makeTime: string;
    modifyTime: string;

    constructor(private qmsNoticeService: QmsNoticeService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ qmsNotice }) => {
            this.qmsNotice = qmsNotice;
            this.makeTime = this.qmsNotice.makeTime != null ? this.qmsNotice.makeTime.format(DATE_TIME_FORMAT) : null;
            this.modifyTime = this.qmsNotice.modifyTime != null ? this.qmsNotice.modifyTime.format(DATE_TIME_FORMAT) : null;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        this.qmsNotice.makeTime = this.makeTime != null ? moment(this.makeTime, DATE_TIME_FORMAT) : null;
        this.qmsNotice.modifyTime = this.modifyTime != null ? moment(this.modifyTime, DATE_TIME_FORMAT) : null;
        if (this.qmsNotice.id !== undefined) {
            this.subscribeToSaveResponse(this.qmsNoticeService.update(this.qmsNotice));
        } else {
            this.subscribeToSaveResponse(this.qmsNoticeService.create(this.qmsNotice));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IQmsNotice>>) {
        result.subscribe((res: HttpResponse<IQmsNotice>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }
}
