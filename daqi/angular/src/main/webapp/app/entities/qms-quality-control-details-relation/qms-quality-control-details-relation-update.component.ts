import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { IQmsQualityControlDetailsRelation } from 'app/shared/model/qms-quality-control-details-relation.model';
import { QmsQualityControlDetailsRelationService } from './qms-quality-control-details-relation.service';

@Component({
    selector: 'jhi-qms-quality-control-details-relation-update',
    templateUrl: './qms-quality-control-details-relation-update.component.html'
})
export class QmsQualityControlDetailsRelationUpdateComponent implements OnInit {
    qmsQualityControlDetailsRelation: IQmsQualityControlDetailsRelation;
    isSaving: boolean;
    makeTime: string;
    modifyTime: string;

    constructor(
        private qmsQualityControlDetailsRelationService: QmsQualityControlDetailsRelationService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ qmsQualityControlDetailsRelation }) => {
            this.qmsQualityControlDetailsRelation = qmsQualityControlDetailsRelation;
            this.makeTime =
                this.qmsQualityControlDetailsRelation.makeTime != null
                    ? this.qmsQualityControlDetailsRelation.makeTime.format(DATE_TIME_FORMAT)
                    : null;
            this.modifyTime =
                this.qmsQualityControlDetailsRelation.modifyTime != null
                    ? this.qmsQualityControlDetailsRelation.modifyTime.format(DATE_TIME_FORMAT)
                    : null;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        this.qmsQualityControlDetailsRelation.makeTime = this.makeTime != null ? moment(this.makeTime, DATE_TIME_FORMAT) : null;
        this.qmsQualityControlDetailsRelation.modifyTime = this.modifyTime != null ? moment(this.modifyTime, DATE_TIME_FORMAT) : null;
        if (this.qmsQualityControlDetailsRelation.id !== undefined) {
            this.subscribeToSaveResponse(this.qmsQualityControlDetailsRelationService.update(this.qmsQualityControlDetailsRelation));
        } else {
            this.subscribeToSaveResponse(this.qmsQualityControlDetailsRelationService.create(this.qmsQualityControlDetailsRelation));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IQmsQualityControlDetailsRelation>>) {
        result.subscribe(
            (res: HttpResponse<IQmsQualityControlDetailsRelation>) => this.onSaveSuccess(),
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
