import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { IRbacUserRightRelation } from 'app/shared/model/rbac-user-right-relation.model';
import { RbacUserRightRelationService } from './rbac-user-right-relation.service';

@Component({
    selector: 'jhi-rbac-user-right-relation-update',
    templateUrl: './rbac-user-right-relation-update.component.html'
})
export class RbacUserRightRelationUpdateComponent implements OnInit {
    rbacUserRightRelation: IRbacUserRightRelation;
    isSaving: boolean;
    insDateTime: string;
    updDateTime: string;
    delDateTime: string;
    triggerDateTime: string;

    constructor(private rbacUserRightRelationService: RbacUserRightRelationService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ rbacUserRightRelation }) => {
            this.rbacUserRightRelation = rbacUserRightRelation;
            this.insDateTime =
                this.rbacUserRightRelation.insDateTime != null ? this.rbacUserRightRelation.insDateTime.format(DATE_TIME_FORMAT) : null;
            this.updDateTime =
                this.rbacUserRightRelation.updDateTime != null ? this.rbacUserRightRelation.updDateTime.format(DATE_TIME_FORMAT) : null;
            this.delDateTime =
                this.rbacUserRightRelation.delDateTime != null ? this.rbacUserRightRelation.delDateTime.format(DATE_TIME_FORMAT) : null;
            this.triggerDateTime =
                this.rbacUserRightRelation.triggerDateTime != null
                    ? this.rbacUserRightRelation.triggerDateTime.format(DATE_TIME_FORMAT)
                    : null;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        this.rbacUserRightRelation.insDateTime = this.insDateTime != null ? moment(this.insDateTime, DATE_TIME_FORMAT) : null;
        this.rbacUserRightRelation.updDateTime = this.updDateTime != null ? moment(this.updDateTime, DATE_TIME_FORMAT) : null;
        this.rbacUserRightRelation.delDateTime = this.delDateTime != null ? moment(this.delDateTime, DATE_TIME_FORMAT) : null;
        this.rbacUserRightRelation.triggerDateTime = this.triggerDateTime != null ? moment(this.triggerDateTime, DATE_TIME_FORMAT) : null;
        if (this.rbacUserRightRelation.id !== undefined) {
            this.subscribeToSaveResponse(this.rbacUserRightRelationService.update(this.rbacUserRightRelation));
        } else {
            this.subscribeToSaveResponse(this.rbacUserRightRelationService.create(this.rbacUserRightRelation));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IRbacUserRightRelation>>) {
        result.subscribe(
            (res: HttpResponse<IRbacUserRightRelation>) => this.onSaveSuccess(),
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
