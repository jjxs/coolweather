import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { IQmsQualityControlDetails } from 'app/shared/model/qms-quality-control-details.model';
import { QmsQualityControlDetailsService } from './qms-quality-control-details.service';

@Component({
    selector: 'jhi-qms-quality-control-details-update',
    templateUrl: './qms-quality-control-details-update.component.html'
})
export class QmsQualityControlDetailsUpdateComponent implements OnInit {
    qmsQualityControlDetails: IQmsQualityControlDetails;
    isSaving: boolean;
    makeTime: string;
    modifyTime: string;

    constructor(private qmsQualityControlDetailsService: QmsQualityControlDetailsService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ qmsQualityControlDetails }) => {
            this.qmsQualityControlDetails = qmsQualityControlDetails;
            this.makeTime =
                this.qmsQualityControlDetails.makeTime != null ? this.qmsQualityControlDetails.makeTime.format(DATE_TIME_FORMAT) : null;
            this.modifyTime =
                this.qmsQualityControlDetails.modifyTime != null ? this.qmsQualityControlDetails.modifyTime.format(DATE_TIME_FORMAT) : null;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        this.qmsQualityControlDetails.makeTime = this.makeTime != null ? moment(this.makeTime, DATE_TIME_FORMAT) : null;
        this.qmsQualityControlDetails.modifyTime = this.modifyTime != null ? moment(this.modifyTime, DATE_TIME_FORMAT) : null;
        if (this.qmsQualityControlDetails.id !== undefined) {
            this.subscribeToSaveResponse(this.qmsQualityControlDetailsService.update(this.qmsQualityControlDetails));
        } else {
            this.subscribeToSaveResponse(this.qmsQualityControlDetailsService.create(this.qmsQualityControlDetails));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IQmsQualityControlDetails>>) {
        result.subscribe(
            (res: HttpResponse<IQmsQualityControlDetails>) => this.onSaveSuccess(),
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
