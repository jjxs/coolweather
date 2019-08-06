import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { IQmsBomTechnology } from 'app/shared/model/qms-bom-technology.model';
import { QmsBomTechnologyService } from './qms-bom-technology.service';

@Component({
    selector: 'jhi-qms-bom-technology-update',
    templateUrl: './qms-bom-technology-update.component.html'
})
export class QmsBomTechnologyUpdateComponent implements OnInit {
    qmsBomTechnology: IQmsBomTechnology;
    isSaving: boolean;
    makeTime: string;
    modifyTime: string;

    constructor(private qmsBomTechnologyService: QmsBomTechnologyService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ qmsBomTechnology }) => {
            this.qmsBomTechnology = qmsBomTechnology;
            this.makeTime = this.qmsBomTechnology.makeTime != null ? this.qmsBomTechnology.makeTime.format(DATE_TIME_FORMAT) : null;
            this.modifyTime = this.qmsBomTechnology.modifyTime != null ? this.qmsBomTechnology.modifyTime.format(DATE_TIME_FORMAT) : null;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        this.qmsBomTechnology.makeTime = this.makeTime != null ? moment(this.makeTime, DATE_TIME_FORMAT) : null;
        this.qmsBomTechnology.modifyTime = this.modifyTime != null ? moment(this.modifyTime, DATE_TIME_FORMAT) : null;
        if (this.qmsBomTechnology.id !== undefined) {
            this.subscribeToSaveResponse(this.qmsBomTechnologyService.update(this.qmsBomTechnology));
        } else {
            this.subscribeToSaveResponse(this.qmsBomTechnologyService.create(this.qmsBomTechnology));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IQmsBomTechnology>>) {
        result.subscribe((res: HttpResponse<IQmsBomTechnology>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }
}
