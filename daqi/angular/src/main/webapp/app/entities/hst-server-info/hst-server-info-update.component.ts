import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { IHstServerInfo } from 'app/shared/model/hst-server-info.model';
import { HstServerInfoService } from './hst-server-info.service';

@Component({
    selector: 'jhi-hst-server-info-update',
    templateUrl: './hst-server-info-update.component.html'
})
export class HstServerInfoUpdateComponent implements OnInit {
    hstServerInfo: IHstServerInfo;
    isSaving: boolean;
    nodeJoinTime: string;
    insDateTime: string;
    updDateTime: string;
    delDateTime: string;
    triggerDateTime: string;

    constructor(private hstServerInfoService: HstServerInfoService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ hstServerInfo }) => {
            this.hstServerInfo = hstServerInfo;
            this.nodeJoinTime = this.hstServerInfo.nodeJoinTime != null ? this.hstServerInfo.nodeJoinTime.format(DATE_TIME_FORMAT) : null;
            this.insDateTime = this.hstServerInfo.insDateTime != null ? this.hstServerInfo.insDateTime.format(DATE_TIME_FORMAT) : null;
            this.updDateTime = this.hstServerInfo.updDateTime != null ? this.hstServerInfo.updDateTime.format(DATE_TIME_FORMAT) : null;
            this.delDateTime = this.hstServerInfo.delDateTime != null ? this.hstServerInfo.delDateTime.format(DATE_TIME_FORMAT) : null;
            this.triggerDateTime =
                this.hstServerInfo.triggerDateTime != null ? this.hstServerInfo.triggerDateTime.format(DATE_TIME_FORMAT) : null;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        this.hstServerInfo.nodeJoinTime = this.nodeJoinTime != null ? moment(this.nodeJoinTime, DATE_TIME_FORMAT) : null;
        this.hstServerInfo.insDateTime = this.insDateTime != null ? moment(this.insDateTime, DATE_TIME_FORMAT) : null;
        this.hstServerInfo.updDateTime = this.updDateTime != null ? moment(this.updDateTime, DATE_TIME_FORMAT) : null;
        this.hstServerInfo.delDateTime = this.delDateTime != null ? moment(this.delDateTime, DATE_TIME_FORMAT) : null;
        this.hstServerInfo.triggerDateTime = this.triggerDateTime != null ? moment(this.triggerDateTime, DATE_TIME_FORMAT) : null;
        if (this.hstServerInfo.id !== undefined) {
            this.subscribeToSaveResponse(this.hstServerInfoService.update(this.hstServerInfo));
        } else {
            this.subscribeToSaveResponse(this.hstServerInfoService.create(this.hstServerInfo));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IHstServerInfo>>) {
        result.subscribe((res: HttpResponse<IHstServerInfo>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }
}
