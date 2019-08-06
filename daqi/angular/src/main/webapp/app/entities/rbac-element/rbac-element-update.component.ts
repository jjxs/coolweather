import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { IRbacElement } from 'app/shared/model/rbac-element.model';
import { RbacElementService } from './rbac-element.service';

@Component({
    selector: 'jhi-rbac-element-update',
    templateUrl: './rbac-element-update.component.html'
})
export class RbacElementUpdateComponent implements OnInit {
    rbacElement: IRbacElement;
    isSaving: boolean;
    insDateTime: string;
    updDateTime: string;
    delDateTime: string;
    triggerDateTime: string;

    constructor(private rbacElementService: RbacElementService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ rbacElement }) => {
            this.rbacElement = rbacElement;
            this.insDateTime = this.rbacElement.insDateTime != null ? this.rbacElement.insDateTime.format(DATE_TIME_FORMAT) : null;
            this.updDateTime = this.rbacElement.updDateTime != null ? this.rbacElement.updDateTime.format(DATE_TIME_FORMAT) : null;
            this.delDateTime = this.rbacElement.delDateTime != null ? this.rbacElement.delDateTime.format(DATE_TIME_FORMAT) : null;
            this.triggerDateTime =
                this.rbacElement.triggerDateTime != null ? this.rbacElement.triggerDateTime.format(DATE_TIME_FORMAT) : null;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        this.rbacElement.insDateTime = this.insDateTime != null ? moment(this.insDateTime, DATE_TIME_FORMAT) : null;
        this.rbacElement.updDateTime = this.updDateTime != null ? moment(this.updDateTime, DATE_TIME_FORMAT) : null;
        this.rbacElement.delDateTime = this.delDateTime != null ? moment(this.delDateTime, DATE_TIME_FORMAT) : null;
        this.rbacElement.triggerDateTime = this.triggerDateTime != null ? moment(this.triggerDateTime, DATE_TIME_FORMAT) : null;
        if (this.rbacElement.id !== undefined) {
            this.subscribeToSaveResponse(this.rbacElementService.update(this.rbacElement));
        } else {
            this.subscribeToSaveResponse(this.rbacElementService.create(this.rbacElement));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IRbacElement>>) {
        result.subscribe((res: HttpResponse<IRbacElement>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }
}
