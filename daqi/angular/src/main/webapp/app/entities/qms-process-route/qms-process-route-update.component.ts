import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { IQmsProcessRoute } from 'app/shared/model/qms-process-route.model';
import { QmsProcessRouteService } from './qms-process-route.service';

@Component({
    selector: 'jhi-qms-process-route-update',
    templateUrl: './qms-process-route-update.component.html'
})
export class QmsProcessRouteUpdateComponent implements OnInit {
    qmsProcessRoute: IQmsProcessRoute;
    isSaving: boolean;
    makeTime: string;
    modifyTime: string;

    constructor(private qmsProcessRouteService: QmsProcessRouteService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ qmsProcessRoute }) => {
            this.qmsProcessRoute = qmsProcessRoute;
            this.makeTime = this.qmsProcessRoute.makeTime != null ? this.qmsProcessRoute.makeTime.format(DATE_TIME_FORMAT) : null;
            this.modifyTime = this.qmsProcessRoute.modifyTime != null ? this.qmsProcessRoute.modifyTime.format(DATE_TIME_FORMAT) : null;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        this.qmsProcessRoute.makeTime = this.makeTime != null ? moment(this.makeTime, DATE_TIME_FORMAT) : null;
        this.qmsProcessRoute.modifyTime = this.modifyTime != null ? moment(this.modifyTime, DATE_TIME_FORMAT) : null;
        if (this.qmsProcessRoute.id !== undefined) {
            this.subscribeToSaveResponse(this.qmsProcessRouteService.update(this.qmsProcessRoute));
        } else {
            this.subscribeToSaveResponse(this.qmsProcessRouteService.create(this.qmsProcessRoute));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IQmsProcessRoute>>) {
        result.subscribe((res: HttpResponse<IQmsProcessRoute>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }
}
