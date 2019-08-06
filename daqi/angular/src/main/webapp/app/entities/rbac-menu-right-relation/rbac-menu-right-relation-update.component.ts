import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { IRbacMenuRightRelation } from 'app/shared/model/rbac-menu-right-relation.model';
import { RbacMenuRightRelationService } from './rbac-menu-right-relation.service';

@Component({
    selector: 'jhi-rbac-menu-right-relation-update',
    templateUrl: './rbac-menu-right-relation-update.component.html'
})
export class RbacMenuRightRelationUpdateComponent implements OnInit {
    rbacMenuRightRelation: IRbacMenuRightRelation;
    isSaving: boolean;
    insDateTime: string;
    updDateTime: string;
    delDateTime: string;
    triggerDateTime: string;

    constructor(private rbacMenuRightRelationService: RbacMenuRightRelationService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ rbacMenuRightRelation }) => {
            this.rbacMenuRightRelation = rbacMenuRightRelation;
            this.insDateTime =
                this.rbacMenuRightRelation.insDateTime != null ? this.rbacMenuRightRelation.insDateTime.format(DATE_TIME_FORMAT) : null;
            this.updDateTime =
                this.rbacMenuRightRelation.updDateTime != null ? this.rbacMenuRightRelation.updDateTime.format(DATE_TIME_FORMAT) : null;
            this.delDateTime =
                this.rbacMenuRightRelation.delDateTime != null ? this.rbacMenuRightRelation.delDateTime.format(DATE_TIME_FORMAT) : null;
            this.triggerDateTime =
                this.rbacMenuRightRelation.triggerDateTime != null
                    ? this.rbacMenuRightRelation.triggerDateTime.format(DATE_TIME_FORMAT)
                    : null;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        this.rbacMenuRightRelation.insDateTime = this.insDateTime != null ? moment(this.insDateTime, DATE_TIME_FORMAT) : null;
        this.rbacMenuRightRelation.updDateTime = this.updDateTime != null ? moment(this.updDateTime, DATE_TIME_FORMAT) : null;
        this.rbacMenuRightRelation.delDateTime = this.delDateTime != null ? moment(this.delDateTime, DATE_TIME_FORMAT) : null;
        this.rbacMenuRightRelation.triggerDateTime = this.triggerDateTime != null ? moment(this.triggerDateTime, DATE_TIME_FORMAT) : null;
        if (this.rbacMenuRightRelation.id !== undefined) {
            this.subscribeToSaveResponse(this.rbacMenuRightRelationService.update(this.rbacMenuRightRelation));
        } else {
            this.subscribeToSaveResponse(this.rbacMenuRightRelationService.create(this.rbacMenuRightRelation));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IRbacMenuRightRelation>>) {
        result.subscribe(
            (res: HttpResponse<IRbacMenuRightRelation>) => this.onSaveSuccess(),
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
