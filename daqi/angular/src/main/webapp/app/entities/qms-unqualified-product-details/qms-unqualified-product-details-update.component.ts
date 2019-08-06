import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { IQmsUnqualifiedProductDetails } from 'app/shared/model/qms-unqualified-product-details.model';
import { QmsUnqualifiedProductDetailsService } from './qms-unqualified-product-details.service';

@Component({
    selector: 'jhi-qms-unqualified-product-details-update',
    templateUrl: './qms-unqualified-product-details-update.component.html'
})
export class QmsUnqualifiedProductDetailsUpdateComponent implements OnInit {
    qmsUnqualifiedProductDetails: IQmsUnqualifiedProductDetails;
    isSaving: boolean;
    makeTime: string;
    modifyTime: string;

    constructor(private qmsUnqualifiedProductDetailsService: QmsUnqualifiedProductDetailsService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ qmsUnqualifiedProductDetails }) => {
            this.qmsUnqualifiedProductDetails = qmsUnqualifiedProductDetails;
            this.makeTime =
                this.qmsUnqualifiedProductDetails.makeTime != null
                    ? this.qmsUnqualifiedProductDetails.makeTime.format(DATE_TIME_FORMAT)
                    : null;
            this.modifyTime =
                this.qmsUnqualifiedProductDetails.modifyTime != null
                    ? this.qmsUnqualifiedProductDetails.modifyTime.format(DATE_TIME_FORMAT)
                    : null;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        this.qmsUnqualifiedProductDetails.makeTime = this.makeTime != null ? moment(this.makeTime, DATE_TIME_FORMAT) : null;
        this.qmsUnqualifiedProductDetails.modifyTime = this.modifyTime != null ? moment(this.modifyTime, DATE_TIME_FORMAT) : null;
        if (this.qmsUnqualifiedProductDetails.id !== undefined) {
            this.subscribeToSaveResponse(this.qmsUnqualifiedProductDetailsService.update(this.qmsUnqualifiedProductDetails));
        } else {
            this.subscribeToSaveResponse(this.qmsUnqualifiedProductDetailsService.create(this.qmsUnqualifiedProductDetails));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IQmsUnqualifiedProductDetails>>) {
        result.subscribe(
            (res: HttpResponse<IQmsUnqualifiedProductDetails>) => this.onSaveSuccess(),
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
