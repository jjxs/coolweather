import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { IRbacRoleRightRelation } from 'app/shared/model/rbac-role-right-relation.model';
import { RbacRoleRightRelationService } from './rbac-role-right-relation.service';

@Component({
    selector: 'jhi-rbac-role-right-relation-update',
    templateUrl: './rbac-role-right-relation-update.component.html'
})
export class RbacRoleRightRelationUpdateComponent implements OnInit {
    rbacRoleRightRelation: IRbacRoleRightRelation;
    isSaving: boolean;
    insDateTime: string;
    updDateTime: string;
    delDateTime: string;
    triggerDateTime: string;

    constructor(private rbacRoleRightRelationService: RbacRoleRightRelationService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ rbacRoleRightRelation }) => {
            this.rbacRoleRightRelation = rbacRoleRightRelation;
            this.insDateTime =
                this.rbacRoleRightRelation.insDateTime != null ? this.rbacRoleRightRelation.insDateTime.format(DATE_TIME_FORMAT) : null;
            this.updDateTime =
                this.rbacRoleRightRelation.updDateTime != null ? this.rbacRoleRightRelation.updDateTime.format(DATE_TIME_FORMAT) : null;
            this.delDateTime =
                this.rbacRoleRightRelation.delDateTime != null ? this.rbacRoleRightRelation.delDateTime.format(DATE_TIME_FORMAT) : null;
            this.triggerDateTime =
                this.rbacRoleRightRelation.triggerDateTime != null
                    ? this.rbacRoleRightRelation.triggerDateTime.format(DATE_TIME_FORMAT)
                    : null;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        this.rbacRoleRightRelation.insDateTime = this.insDateTime != null ? moment(this.insDateTime, DATE_TIME_FORMAT) : null;
        this.rbacRoleRightRelation.updDateTime = this.updDateTime != null ? moment(this.updDateTime, DATE_TIME_FORMAT) : null;
        this.rbacRoleRightRelation.delDateTime = this.delDateTime != null ? moment(this.delDateTime, DATE_TIME_FORMAT) : null;
        this.rbacRoleRightRelation.triggerDateTime = this.triggerDateTime != null ? moment(this.triggerDateTime, DATE_TIME_FORMAT) : null;
        if (this.rbacRoleRightRelation.id !== undefined) {
            this.subscribeToSaveResponse(this.rbacRoleRightRelationService.update(this.rbacRoleRightRelation));
        } else {
            this.subscribeToSaveResponse(this.rbacRoleRightRelationService.create(this.rbacRoleRightRelation));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IRbacRoleRightRelation>>) {
        result.subscribe(
            (res: HttpResponse<IRbacRoleRightRelation>) => this.onSaveSuccess(),
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
