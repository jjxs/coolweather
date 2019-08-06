import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { IQmsVehicleTypeInfo } from 'app/shared/model/qms-vehicle-type-info.model';
import { QmsVehicleTypeInfoService } from './qms-vehicle-type-info.service';

@Component({
    selector: 'jhi-qms-vehicle-type-info-update',
    templateUrl: './qms-vehicle-type-info-update.component.html'
})
export class QmsVehicleTypeInfoUpdateComponent implements OnInit {
    qmsVehicleTypeInfo: IQmsVehicleTypeInfo;
    isSaving: boolean;
    makeTime: string;
    modifyTime: string;

    constructor(private qmsVehicleTypeInfoService: QmsVehicleTypeInfoService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ qmsVehicleTypeInfo }) => {
            this.qmsVehicleTypeInfo = qmsVehicleTypeInfo;
            this.makeTime = this.qmsVehicleTypeInfo.makeTime != null ? this.qmsVehicleTypeInfo.makeTime.format(DATE_TIME_FORMAT) : null;
            this.modifyTime =
                this.qmsVehicleTypeInfo.modifyTime != null ? this.qmsVehicleTypeInfo.modifyTime.format(DATE_TIME_FORMAT) : null;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        this.qmsVehicleTypeInfo.makeTime = this.makeTime != null ? moment(this.makeTime, DATE_TIME_FORMAT) : null;
        this.qmsVehicleTypeInfo.modifyTime = this.modifyTime != null ? moment(this.modifyTime, DATE_TIME_FORMAT) : null;
        if (this.qmsVehicleTypeInfo.id !== undefined) {
            this.subscribeToSaveResponse(this.qmsVehicleTypeInfoService.update(this.qmsVehicleTypeInfo));
        } else {
            this.subscribeToSaveResponse(this.qmsVehicleTypeInfoService.create(this.qmsVehicleTypeInfo));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IQmsVehicleTypeInfo>>) {
        result.subscribe((res: HttpResponse<IQmsVehicleTypeInfo>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }
}
