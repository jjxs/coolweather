import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { IRbacMenu } from 'app/shared/model/rbac-menu.model';
import { RbacMenuService } from './rbac-menu.service';

@Component({
    selector: 'jhi-rbac-menu-update',
    templateUrl: './rbac-menu-update.component.html'
})
export class RbacMenuUpdateComponent implements OnInit {
    rbacMenu: IRbacMenu;
    isSaving: boolean;
    insDateTime: string;
    updDateTime: string;
    delDateTime: string;
    triggerDateTime: string;

    constructor(private rbacMenuService: RbacMenuService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ rbacMenu }) => {
            this.rbacMenu = rbacMenu;
            this.insDateTime = this.rbacMenu.insDateTime != null ? this.rbacMenu.insDateTime.format(DATE_TIME_FORMAT) : null;
            this.updDateTime = this.rbacMenu.updDateTime != null ? this.rbacMenu.updDateTime.format(DATE_TIME_FORMAT) : null;
            this.delDateTime = this.rbacMenu.delDateTime != null ? this.rbacMenu.delDateTime.format(DATE_TIME_FORMAT) : null;
            this.triggerDateTime = this.rbacMenu.triggerDateTime != null ? this.rbacMenu.triggerDateTime.format(DATE_TIME_FORMAT) : null;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        this.rbacMenu.insDateTime = this.insDateTime != null ? moment(this.insDateTime, DATE_TIME_FORMAT) : null;
        this.rbacMenu.updDateTime = this.updDateTime != null ? moment(this.updDateTime, DATE_TIME_FORMAT) : null;
        this.rbacMenu.delDateTime = this.delDateTime != null ? moment(this.delDateTime, DATE_TIME_FORMAT) : null;
        this.rbacMenu.triggerDateTime = this.triggerDateTime != null ? moment(this.triggerDateTime, DATE_TIME_FORMAT) : null;
        if (this.rbacMenu.id !== undefined) {
            this.subscribeToSaveResponse(this.rbacMenuService.update(this.rbacMenu));
        } else {
            this.subscribeToSaveResponse(this.rbacMenuService.create(this.rbacMenu));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IRbacMenu>>) {
        result.subscribe((res: HttpResponse<IRbacMenu>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }
}
