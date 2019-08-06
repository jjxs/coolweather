import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { IQmsMateriel } from 'app/shared/model/qms-materiel.model';
import { QmsMaterielService } from './qms-materiel.service';

@Component({
    selector: 'jhi-qms-materiel-update',
    templateUrl: './qms-materiel-update.component.html'
})
export class QmsMaterielUpdateComponent implements OnInit {
    qmsMateriel: IQmsMateriel;
    isSaving: boolean;
    makeTime: string;
    modifyTime: string;

    constructor(private qmsMaterielService: QmsMaterielService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ qmsMateriel }) => {
            this.qmsMateriel = qmsMateriel;
            this.makeTime = this.qmsMateriel.makeTime != null ? this.qmsMateriel.makeTime.format(DATE_TIME_FORMAT) : null;
            this.modifyTime = this.qmsMateriel.modifyTime != null ? this.qmsMateriel.modifyTime.format(DATE_TIME_FORMAT) : null;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        this.qmsMateriel.makeTime = this.makeTime != null ? moment(this.makeTime, DATE_TIME_FORMAT) : null;
        this.qmsMateriel.modifyTime = this.modifyTime != null ? moment(this.modifyTime, DATE_TIME_FORMAT) : null;
        if (this.qmsMateriel.id !== undefined) {
            this.subscribeToSaveResponse(this.qmsMaterielService.update(this.qmsMateriel));
        } else {
            this.subscribeToSaveResponse(this.qmsMaterielService.create(this.qmsMateriel));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IQmsMateriel>>) {
        result.subscribe((res: HttpResponse<IQmsMateriel>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }
}
