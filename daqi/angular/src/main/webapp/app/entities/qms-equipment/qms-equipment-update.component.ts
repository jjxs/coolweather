import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { IQmsEquipment } from 'app/shared/model/qms-equipment.model';
import { QmsEquipmentService } from './qms-equipment.service';

@Component({
    selector: 'jhi-qms-equipment-update',
    templateUrl: './qms-equipment-update.component.html'
})
export class QmsEquipmentUpdateComponent implements OnInit {
    qmsEquipment: IQmsEquipment;
    isSaving: boolean;
    makeTime: string;
    modifyTime: string;

    constructor(private qmsEquipmentService: QmsEquipmentService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ qmsEquipment }) => {
            this.qmsEquipment = qmsEquipment;
            this.makeTime = this.qmsEquipment.makeTime != null ? this.qmsEquipment.makeTime.format(DATE_TIME_FORMAT) : null;
            this.modifyTime = this.qmsEquipment.modifyTime != null ? this.qmsEquipment.modifyTime.format(DATE_TIME_FORMAT) : null;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        this.qmsEquipment.makeTime = this.makeTime != null ? moment(this.makeTime, DATE_TIME_FORMAT) : null;
        this.qmsEquipment.modifyTime = this.modifyTime != null ? moment(this.modifyTime, DATE_TIME_FORMAT) : null;
        if (this.qmsEquipment.id !== undefined) {
            this.subscribeToSaveResponse(this.qmsEquipmentService.update(this.qmsEquipment));
        } else {
            this.subscribeToSaveResponse(this.qmsEquipmentService.create(this.qmsEquipment));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IQmsEquipment>>) {
        result.subscribe((res: HttpResponse<IQmsEquipment>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }
}
