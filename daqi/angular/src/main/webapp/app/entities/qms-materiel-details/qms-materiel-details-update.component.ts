import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { IQmsMaterielDetails } from 'app/shared/model/qms-materiel-details.model';
import { QmsMaterielDetailsService } from './qms-materiel-details.service';

@Component({
    selector: 'jhi-qms-materiel-details-update',
    templateUrl: './qms-materiel-details-update.component.html'
})
export class QmsMaterielDetailsUpdateComponent implements OnInit {
    qmsMaterielDetails: IQmsMaterielDetails;
    isSaving: boolean;
    makeTime: string;
    modifyTime: string;

    constructor(private qmsMaterielDetailsService: QmsMaterielDetailsService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ qmsMaterielDetails }) => {
            this.qmsMaterielDetails = qmsMaterielDetails;
            this.makeTime = this.qmsMaterielDetails.makeTime != null ? this.qmsMaterielDetails.makeTime.format(DATE_TIME_FORMAT) : null;
            this.modifyTime =
                this.qmsMaterielDetails.modifyTime != null ? this.qmsMaterielDetails.modifyTime.format(DATE_TIME_FORMAT) : null;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        this.qmsMaterielDetails.makeTime = this.makeTime != null ? moment(this.makeTime, DATE_TIME_FORMAT) : null;
        this.qmsMaterielDetails.modifyTime = this.modifyTime != null ? moment(this.modifyTime, DATE_TIME_FORMAT) : null;
        if (this.qmsMaterielDetails.id !== undefined) {
            this.subscribeToSaveResponse(this.qmsMaterielDetailsService.update(this.qmsMaterielDetails));
        } else {
            this.subscribeToSaveResponse(this.qmsMaterielDetailsService.create(this.qmsMaterielDetails));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IQmsMaterielDetails>>) {
        result.subscribe((res: HttpResponse<IQmsMaterielDetails>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }
}
