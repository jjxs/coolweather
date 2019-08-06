import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { IQmsPartsAssemblyRelation } from 'app/shared/model/qms-parts-assembly-relation.model';
import { QmsPartsAssemblyRelationService } from './qms-parts-assembly-relation.service';

@Component({
    selector: 'jhi-qms-parts-assembly-relation-update',
    templateUrl: './qms-parts-assembly-relation-update.component.html'
})
export class QmsPartsAssemblyRelationUpdateComponent implements OnInit {
    qmsPartsAssemblyRelation: IQmsPartsAssemblyRelation;
    isSaving: boolean;
    makeTime: string;
    modifyTime: string;

    constructor(private qmsPartsAssemblyRelationService: QmsPartsAssemblyRelationService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ qmsPartsAssemblyRelation }) => {
            this.qmsPartsAssemblyRelation = qmsPartsAssemblyRelation;
            this.makeTime =
                this.qmsPartsAssemblyRelation.makeTime != null ? this.qmsPartsAssemblyRelation.makeTime.format(DATE_TIME_FORMAT) : null;
            this.modifyTime =
                this.qmsPartsAssemblyRelation.modifyTime != null ? this.qmsPartsAssemblyRelation.modifyTime.format(DATE_TIME_FORMAT) : null;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        this.qmsPartsAssemblyRelation.makeTime = this.makeTime != null ? moment(this.makeTime, DATE_TIME_FORMAT) : null;
        this.qmsPartsAssemblyRelation.modifyTime = this.modifyTime != null ? moment(this.modifyTime, DATE_TIME_FORMAT) : null;
        if (this.qmsPartsAssemblyRelation.id !== undefined) {
            this.subscribeToSaveResponse(this.qmsPartsAssemblyRelationService.update(this.qmsPartsAssemblyRelation));
        } else {
            this.subscribeToSaveResponse(this.qmsPartsAssemblyRelationService.create(this.qmsPartsAssemblyRelation));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IQmsPartsAssemblyRelation>>) {
        result.subscribe(
            (res: HttpResponse<IQmsPartsAssemblyRelation>) => this.onSaveSuccess(),
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
