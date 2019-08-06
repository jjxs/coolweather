import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IQmsUnhealthy } from 'app/shared/model/qms-unhealthy.model';

@Component({
    selector: 'jhi-qms-unhealthy-detail',
    templateUrl: './qms-unhealthy-detail.component.html'
})
export class QmsUnhealthyDetailComponent implements OnInit {
    qmsUnhealthy: IQmsUnhealthy;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ qmsUnhealthy }) => {
            this.qmsUnhealthy = qmsUnhealthy;
        });
    }

    previousState() {
        window.history.back();
    }
}
