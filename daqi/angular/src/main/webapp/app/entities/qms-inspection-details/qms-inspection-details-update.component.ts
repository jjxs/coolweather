import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { IQmsInspectionDetails } from 'app/shared/model/qms-inspection-details.model';
import { QmsInspectionDetailsService } from './qms-inspection-details.service';

@Component({
    selector: 'jhi-qms-inspection-details-update',
    templateUrl: './qms-inspection-details-update.component.html'
})
export class QmsInspectionDetailsUpdateComponent implements OnInit {
    qmsInspectionDetails: IQmsInspectionDetails;
    isSaving: boolean;
    makeTime: string;
    modifyTime: string;

    constructor(private qmsInspectionDetailsService: QmsInspectionDetailsService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ qmsInspectionDetails }) => {
            this.qmsInspectionDetails = qmsInspectionDetails;
            this.makeTime = this.qmsInspectionDetails.makeTime != null ? this.qmsInspectionDetails.makeTime.format(DATE_TIME_FORMAT) : null;
            this.modifyTime =
                this.qmsInspectionDetails.modifyTime != null ? this.qmsInspectionDetails.modifyTime.format(DATE_TIME_FORMAT) : null;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        this.qmsInspectionDetails.makeTime = this.makeTime != null ? moment(this.makeTime, DATE_TIME_FORMAT) : null;
        this.qmsInspectionDetails.modifyTime = this.modifyTime != null ? moment(this.modifyTime, DATE_TIME_FORMAT) : null;
        if (this.qmsInspectionDetails.id !== undefined) {
            this.subscribeToSaveResponse(this.qmsInspectionDetailsService.update(this.qmsInspectionDetails));
        } else {
            this.subscribeToSaveResponse(this.qmsInspectionDetailsService.create(this.qmsInspectionDetails));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IQmsInspectionDetails>>) {
        result.subscribe(
            (res: HttpResponse<IQmsInspectionDetails>) => this.onSaveSuccess(),
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
