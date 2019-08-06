import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { IQmsMaterielSupplier } from 'app/shared/model/qms-materiel-supplier.model';
import { QmsMaterielSupplierService } from './qms-materiel-supplier.service';

@Component({
    selector: 'jhi-qms-materiel-supplier-update',
    templateUrl: './qms-materiel-supplier-update.component.html'
})
export class QmsMaterielSupplierUpdateComponent implements OnInit {
    qmsMaterielSupplier: IQmsMaterielSupplier;
    isSaving: boolean;
    makeTime: string;
    modifyTime: string;

    constructor(private qmsMaterielSupplierService: QmsMaterielSupplierService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ qmsMaterielSupplier }) => {
            this.qmsMaterielSupplier = qmsMaterielSupplier;
            this.makeTime = this.qmsMaterielSupplier.makeTime != null ? this.qmsMaterielSupplier.makeTime.format(DATE_TIME_FORMAT) : null;
            this.modifyTime =
                this.qmsMaterielSupplier.modifyTime != null ? this.qmsMaterielSupplier.modifyTime.format(DATE_TIME_FORMAT) : null;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        this.qmsMaterielSupplier.makeTime = this.makeTime != null ? moment(this.makeTime, DATE_TIME_FORMAT) : null;
        this.qmsMaterielSupplier.modifyTime = this.modifyTime != null ? moment(this.modifyTime, DATE_TIME_FORMAT) : null;
        if (this.qmsMaterielSupplier.id !== undefined) {
            this.subscribeToSaveResponse(this.qmsMaterielSupplierService.update(this.qmsMaterielSupplier));
        } else {
            this.subscribeToSaveResponse(this.qmsMaterielSupplierService.create(this.qmsMaterielSupplier));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IQmsMaterielSupplier>>) {
        result.subscribe((res: HttpResponse<IQmsMaterielSupplier>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }
}
