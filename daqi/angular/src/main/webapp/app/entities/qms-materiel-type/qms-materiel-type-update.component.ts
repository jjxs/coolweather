import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { IQmsMaterielType } from 'app/shared/model/qms-materiel-type.model';
import { QmsMaterielTypeService } from './qms-materiel-type.service';

@Component({
    selector: 'jhi-qms-materiel-type-update',
    templateUrl: './qms-materiel-type-update.component.html'
})
export class QmsMaterielTypeUpdateComponent implements OnInit {
    qmsMaterielType: IQmsMaterielType;
    isSaving: boolean;
    makeTime: string;
    modifyTime: string;

    constructor(private qmsMaterielTypeService: QmsMaterielTypeService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ qmsMaterielType }) => {
            this.qmsMaterielType = qmsMaterielType;
            this.makeTime = this.qmsMaterielType.makeTime != null ? this.qmsMaterielType.makeTime.format(DATE_TIME_FORMAT) : null;
            this.modifyTime = this.qmsMaterielType.modifyTime != null ? this.qmsMaterielType.modifyTime.format(DATE_TIME_FORMAT) : null;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        this.qmsMaterielType.makeTime = this.makeTime != null ? moment(this.makeTime, DATE_TIME_FORMAT) : null;
        this.qmsMaterielType.modifyTime = this.modifyTime != null ? moment(this.modifyTime, DATE_TIME_FORMAT) : null;
        if (this.qmsMaterielType.id !== undefined) {
            this.subscribeToSaveResponse(this.qmsMaterielTypeService.update(this.qmsMaterielType));
        } else {
            this.subscribeToSaveResponse(this.qmsMaterielTypeService.create(this.qmsMaterielType));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IQmsMaterielType>>) {
        result.subscribe((res: HttpResponse<IQmsMaterielType>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }
}
