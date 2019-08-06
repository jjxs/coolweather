import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { IQmsEntryControlCriterion } from 'app/shared/model/qms-entry-control-criterion.model';
import { QmsEntryControlCriterionService } from './qms-entry-control-criterion.service';

@Component({
    selector: 'jhi-qms-entry-control-criterion-update',
    templateUrl: './qms-entry-control-criterion-update.component.html'
})
export class QmsEntryControlCriterionUpdateComponent implements OnInit {
    qmsEntryControlCriterion: IQmsEntryControlCriterion;
    isSaving: boolean;
    makeTime: string;
    modifyTime: string;

    constructor(private qmsEntryControlCriterionService: QmsEntryControlCriterionService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ qmsEntryControlCriterion }) => {
            this.qmsEntryControlCriterion = qmsEntryControlCriterion;
            this.makeTime =
                this.qmsEntryControlCriterion.makeTime != null ? this.qmsEntryControlCriterion.makeTime.format(DATE_TIME_FORMAT) : null;
            this.modifyTime =
                this.qmsEntryControlCriterion.modifyTime != null ? this.qmsEntryControlCriterion.modifyTime.format(DATE_TIME_FORMAT) : null;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        this.qmsEntryControlCriterion.makeTime = this.makeTime != null ? moment(this.makeTime, DATE_TIME_FORMAT) : null;
        this.qmsEntryControlCriterion.modifyTime = this.modifyTime != null ? moment(this.modifyTime, DATE_TIME_FORMAT) : null;
        if (this.qmsEntryControlCriterion.id !== undefined) {
            this.subscribeToSaveResponse(this.qmsEntryControlCriterionService.update(this.qmsEntryControlCriterion));
        } else {
            this.subscribeToSaveResponse(this.qmsEntryControlCriterionService.create(this.qmsEntryControlCriterion));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IQmsEntryControlCriterion>>) {
        result.subscribe(
            (res: HttpResponse<IQmsEntryControlCriterion>) => this.onSaveSuccess(),
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
