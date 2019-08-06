import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { IQmsUnqualifiedProduct } from 'app/shared/model/qms-unqualified-product.model';
import { QmsUnqualifiedProductService } from './qms-unqualified-product.service';

@Component({
    selector: 'jhi-qms-unqualified-product-update',
    templateUrl: './qms-unqualified-product-update.component.html'
})
export class QmsUnqualifiedProductUpdateComponent implements OnInit {
    qmsUnqualifiedProduct: IQmsUnqualifiedProduct;
    isSaving: boolean;
    approveTime: string;
    makeTime: string;
    modifyTime: string;

    constructor(private qmsUnqualifiedProductService: QmsUnqualifiedProductService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ qmsUnqualifiedProduct }) => {
            this.qmsUnqualifiedProduct = qmsUnqualifiedProduct;
            this.approveTime =
                this.qmsUnqualifiedProduct.approveTime != null ? this.qmsUnqualifiedProduct.approveTime.format(DATE_TIME_FORMAT) : null;
            this.makeTime =
                this.qmsUnqualifiedProduct.makeTime != null ? this.qmsUnqualifiedProduct.makeTime.format(DATE_TIME_FORMAT) : null;
            this.modifyTime =
                this.qmsUnqualifiedProduct.modifyTime != null ? this.qmsUnqualifiedProduct.modifyTime.format(DATE_TIME_FORMAT) : null;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        this.qmsUnqualifiedProduct.approveTime = this.approveTime != null ? moment(this.approveTime, DATE_TIME_FORMAT) : null;
        this.qmsUnqualifiedProduct.makeTime = this.makeTime != null ? moment(this.makeTime, DATE_TIME_FORMAT) : null;
        this.qmsUnqualifiedProduct.modifyTime = this.modifyTime != null ? moment(this.modifyTime, DATE_TIME_FORMAT) : null;
        if (this.qmsUnqualifiedProduct.id !== undefined) {
            this.subscribeToSaveResponse(this.qmsUnqualifiedProductService.update(this.qmsUnqualifiedProduct));
        } else {
            this.subscribeToSaveResponse(this.qmsUnqualifiedProductService.create(this.qmsUnqualifiedProduct));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IQmsUnqualifiedProduct>>) {
        result.subscribe(
            (res: HttpResponse<IQmsUnqualifiedProduct>) => this.onSaveSuccess(),
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
