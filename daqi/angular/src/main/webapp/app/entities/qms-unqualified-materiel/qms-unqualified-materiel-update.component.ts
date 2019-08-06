import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { IQmsUnqualifiedMateriel } from 'app/shared/model/qms-unqualified-materiel.model';
import { QmsUnqualifiedMaterielService } from './qms-unqualified-materiel.service';

@Component({
    selector: 'jhi-qms-unqualified-materiel-update',
    templateUrl: './qms-unqualified-materiel-update.component.html'
})
export class QmsUnqualifiedMaterielUpdateComponent implements OnInit {
    qmsUnqualifiedMateriel: IQmsUnqualifiedMateriel;
    isSaving: boolean;
    discoverTime: string;
    makeTime: string;
    modifyTime: string;

    constructor(private qmsUnqualifiedMaterielService: QmsUnqualifiedMaterielService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ qmsUnqualifiedMateriel }) => {
            this.qmsUnqualifiedMateriel = qmsUnqualifiedMateriel;
            this.discoverTime =
                this.qmsUnqualifiedMateriel.discoverTime != null ? this.qmsUnqualifiedMateriel.discoverTime.format(DATE_TIME_FORMAT) : null;
            this.makeTime =
                this.qmsUnqualifiedMateriel.makeTime != null ? this.qmsUnqualifiedMateriel.makeTime.format(DATE_TIME_FORMAT) : null;
            this.modifyTime =
                this.qmsUnqualifiedMateriel.modifyTime != null ? this.qmsUnqualifiedMateriel.modifyTime.format(DATE_TIME_FORMAT) : null;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        this.qmsUnqualifiedMateriel.discoverTime = this.discoverTime != null ? moment(this.discoverTime, DATE_TIME_FORMAT) : null;
        this.qmsUnqualifiedMateriel.makeTime = this.makeTime != null ? moment(this.makeTime, DATE_TIME_FORMAT) : null;
        this.qmsUnqualifiedMateriel.modifyTime = this.modifyTime != null ? moment(this.modifyTime, DATE_TIME_FORMAT) : null;
        if (this.qmsUnqualifiedMateriel.id !== undefined) {
            this.subscribeToSaveResponse(this.qmsUnqualifiedMaterielService.update(this.qmsUnqualifiedMateriel));
        } else {
            this.subscribeToSaveResponse(this.qmsUnqualifiedMaterielService.create(this.qmsUnqualifiedMateriel));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IQmsUnqualifiedMateriel>>) {
        result.subscribe(
            (res: HttpResponse<IQmsUnqualifiedMateriel>) => this.onSaveSuccess(),
            (res: HttpErrorResponse) => this.onSaveError()
        );
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }
}
