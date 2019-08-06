import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { IQmsEnclosure } from 'app/shared/model/qms-enclosure.model';
import { QmsEnclosureService } from './qms-enclosure.service';

@Component({
    selector: 'jhi-qms-enclosure-update',
    templateUrl: './qms-enclosure-update.component.html'
})
export class QmsEnclosureUpdateComponent implements OnInit {
    qmsEnclosure: IQmsEnclosure;
    isSaving: boolean;
    makeTime: string;
    modifyTime: string;

    constructor(private qmsEnclosureService: QmsEnclosureService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ qmsEnclosure }) => {
            this.qmsEnclosure = qmsEnclosure;
            this.makeTime = this.qmsEnclosure.makeTime != null ? this.qmsEnclosure.makeTime.format(DATE_TIME_FORMAT) : null;
            this.modifyTime = this.qmsEnclosure.modifyTime != null ? this.qmsEnclosure.modifyTime.format(DATE_TIME_FORMAT) : null;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        this.qmsEnclosure.makeTime = this.makeTime != null ? moment(this.makeTime, DATE_TIME_FORMAT) : null;
        this.qmsEnclosure.modifyTime = this.modifyTime != null ? moment(this.modifyTime, DATE_TIME_FORMAT) : null;
        if (this.qmsEnclosure.id !== undefined) {
            this.subscribeToSaveResponse(this.qmsEnclosureService.update(this.qmsEnclosure));
        } else {
            this.subscribeToSaveResponse(this.qmsEnclosureService.create(this.qmsEnclosure));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IQmsEnclosure>>) {
        result.subscribe((res: HttpResponse<IQmsEnclosure>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }
}
