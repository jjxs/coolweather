import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { IQmsOrganizationInfo } from 'app/shared/model/qms-organization-info.model';
import { QmsOrganizationInfoService } from './qms-organization-info.service';

@Component({
    selector: 'jhi-qms-organization-info-update',
    templateUrl: './qms-organization-info-update.component.html'
})
export class QmsOrganizationInfoUpdateComponent implements OnInit {
    qmsOrganizationInfo: IQmsOrganizationInfo;
    isSaving: boolean;
    makeTime: string;
    modifyTime: string;

    constructor(private qmsOrganizationInfoService: QmsOrganizationInfoService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ qmsOrganizationInfo }) => {
            this.qmsOrganizationInfo = qmsOrganizationInfo;
            this.makeTime = this.qmsOrganizationInfo.makeTime != null ? this.qmsOrganizationInfo.makeTime.format(DATE_TIME_FORMAT) : null;
            this.modifyTime =
                this.qmsOrganizationInfo.modifyTime != null ? this.qmsOrganizationInfo.modifyTime.format(DATE_TIME_FORMAT) : null;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        this.qmsOrganizationInfo.makeTime = this.makeTime != null ? moment(this.makeTime, DATE_TIME_FORMAT) : null;
        this.qmsOrganizationInfo.modifyTime = this.modifyTime != null ? moment(this.modifyTime, DATE_TIME_FORMAT) : null;
        if (this.qmsOrganizationInfo.id !== undefined) {
            this.subscribeToSaveResponse(this.qmsOrganizationInfoService.update(this.qmsOrganizationInfo));
        } else {
            this.subscribeToSaveResponse(this.qmsOrganizationInfoService.create(this.qmsOrganizationInfo));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IQmsOrganizationInfo>>) {
        result.subscribe((res: HttpResponse<IQmsOrganizationInfo>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }
}
