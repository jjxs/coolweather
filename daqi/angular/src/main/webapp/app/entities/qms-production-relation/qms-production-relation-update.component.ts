import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { IQmsProductionRelation } from 'app/shared/model/qms-production-relation.model';
import { QmsProductionRelationService } from './qms-production-relation.service';

@Component({
    selector: 'jhi-qms-production-relation-update',
    templateUrl: './qms-production-relation-update.component.html'
})
export class QmsProductionRelationUpdateComponent implements OnInit {
    qmsProductionRelation: IQmsProductionRelation;
    isSaving: boolean;
    confirmTime1: string;
    confirmTime2: string;
    makeTime: string;
    modifyTime: string;

    constructor(private qmsProductionRelationService: QmsProductionRelationService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ qmsProductionRelation }) => {
            this.qmsProductionRelation = qmsProductionRelation;
            this.confirmTime1 =
                this.qmsProductionRelation.confirmTime1 != null ? this.qmsProductionRelation.confirmTime1.format(DATE_TIME_FORMAT) : null;
            this.confirmTime2 =
                this.qmsProductionRelation.confirmTime2 != null ? this.qmsProductionRelation.confirmTime2.format(DATE_TIME_FORMAT) : null;
            this.makeTime =
                this.qmsProductionRelation.makeTime != null ? this.qmsProductionRelation.makeTime.format(DATE_TIME_FORMAT) : null;
            this.modifyTime =
                this.qmsProductionRelation.modifyTime != null ? this.qmsProductionRelation.modifyTime.format(DATE_TIME_FORMAT) : null;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        this.qmsProductionRelation.confirmTime1 = this.confirmTime1 != null ? moment(this.confirmTime1, DATE_TIME_FORMAT) : null;
        this.qmsProductionRelation.confirmTime2 = this.confirmTime2 != null ? moment(this.confirmTime2, DATE_TIME_FORMAT) : null;
        this.qmsProductionRelation.makeTime = this.makeTime != null ? moment(this.makeTime, DATE_TIME_FORMAT) : null;
        this.qmsProductionRelation.modifyTime = this.modifyTime != null ? moment(this.modifyTime, DATE_TIME_FORMAT) : null;
        if (this.qmsProductionRelation.id !== undefined) {
            this.subscribeToSaveResponse(this.qmsProductionRelationService.update(this.qmsProductionRelation));
        } else {
            this.subscribeToSaveResponse(this.qmsProductionRelationService.create(this.qmsProductionRelation));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IQmsProductionRelation>>) {
        result.subscribe(
            (res: HttpResponse<IQmsProductionRelation>) => this.onSaveSuccess(),
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
