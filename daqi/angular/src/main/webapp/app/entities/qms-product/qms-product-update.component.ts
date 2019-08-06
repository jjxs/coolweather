import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { IQmsProduct } from 'app/shared/model/qms-product.model';
import { QmsProductService } from './qms-product.service';

@Component({
    selector: 'jhi-qms-product-update',
    templateUrl: './qms-product-update.component.html'
})
export class QmsProductUpdateComponent implements OnInit {
    qmsProduct: IQmsProduct;
    isSaving: boolean;
    makeTime: string;
    modifyTime: string;

    constructor(private qmsProductService: QmsProductService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ qmsProduct }) => {
            this.qmsProduct = qmsProduct;
            this.makeTime = this.qmsProduct.makeTime != null ? this.qmsProduct.makeTime.format(DATE_TIME_FORMAT) : null;
            this.modifyTime = this.qmsProduct.modifyTime != null ? this.qmsProduct.modifyTime.format(DATE_TIME_FORMAT) : null;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        this.qmsProduct.makeTime = this.makeTime != null ? moment(this.makeTime, DATE_TIME_FORMAT) : null;
        this.qmsProduct.modifyTime = this.modifyTime != null ? moment(this.modifyTime, DATE_TIME_FORMAT) : null;
        if (this.qmsProduct.id !== undefined) {
            this.subscribeToSaveResponse(this.qmsProductService.update(this.qmsProduct));
        } else {
            this.subscribeToSaveResponse(this.qmsProductService.create(this.qmsProduct));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IQmsProduct>>) {
        result.subscribe((res: HttpResponse<IQmsProduct>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }
}
