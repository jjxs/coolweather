import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { IQmsSupplier } from 'app/shared/model/qms-supplier.model';
import { QmsSupplierService } from './qms-supplier.service';

@Component({
    selector: 'jhi-qms-supplier-update',
    templateUrl: './qms-supplier-update.component.html'
})
export class QmsSupplierUpdateComponent implements OnInit {
    qmsSupplier: IQmsSupplier;
    isSaving: boolean;
    makeTime: string;
    modifyTime: string;

    constructor(private qmsSupplierService: QmsSupplierService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ qmsSupplier }) => {
            this.qmsSupplier = qmsSupplier;
            this.makeTime = this.qmsSupplier.makeTime != null ? this.qmsSupplier.makeTime.format(DATE_TIME_FORMAT) : null;
            this.modifyTime = this.qmsSupplier.modifyTime != null ? this.qmsSupplier.modifyTime.format(DATE_TIME_FORMAT) : null;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        this.qmsSupplier.makeTime = this.makeTime != null ? moment(this.makeTime, DATE_TIME_FORMAT) : null;
        this.qmsSupplier.modifyTime = this.modifyTime != null ? moment(this.modifyTime, DATE_TIME_FORMAT) : null;
        if (this.qmsSupplier.id !== undefined) {
            this.subscribeToSaveResponse(this.qmsSupplierService.update(this.qmsSupplier));
        } else {
            this.subscribeToSaveResponse(this.qmsSupplierService.create(this.qmsSupplier));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IQmsSupplier>>) {
        result.subscribe((res: HttpResponse<IQmsSupplier>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }
}
