import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { IQmsBom } from 'app/shared/model/qms-bom.model';
import { QmsBomService } from './qms-bom.service';

@Component({
    selector: 'jhi-qms-bom-update',
    templateUrl: './qms-bom-update.component.html'
})
export class QmsBomUpdateComponent implements OnInit {
    qmsBom: IQmsBom;
    isSaving: boolean;
    makeTime: string;
    modifyTime: string;

    constructor(private qmsBomService: QmsBomService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ qmsBom }) => {
            this.qmsBom = qmsBom;
            this.makeTime = this.qmsBom.makeTime != null ? this.qmsBom.makeTime.format(DATE_TIME_FORMAT) : null;
            this.modifyTime = this.qmsBom.modifyTime != null ? this.qmsBom.modifyTime.format(DATE_TIME_FORMAT) : null;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        this.qmsBom.makeTime = this.makeTime != null ? moment(this.makeTime, DATE_TIME_FORMAT) : null;
        this.qmsBom.modifyTime = this.modifyTime != null ? moment(this.modifyTime, DATE_TIME_FORMAT) : null;
        if (this.qmsBom.id !== undefined) {
            this.subscribeToSaveResponse(this.qmsBomService.update(this.qmsBom));
        } else {
            this.subscribeToSaveResponse(this.qmsBomService.create(this.qmsBom));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IQmsBom>>) {
        result.subscribe((res: HttpResponse<IQmsBom>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }
}
