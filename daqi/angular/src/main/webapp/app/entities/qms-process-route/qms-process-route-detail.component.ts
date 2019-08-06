import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IQmsProcessRoute } from 'app/shared/model/qms-process-route.model';

@Component({
    selector: 'jhi-qms-process-route-detail',
    templateUrl: './qms-process-route-detail.component.html'
})
export class QmsProcessRouteDetailComponent implements OnInit {
    qmsProcessRoute: IQmsProcessRoute;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ qmsProcessRoute }) => {
            this.qmsProcessRoute = qmsProcessRoute;
        });
    }

    previousState() {
        window.history.back();
    }
}
