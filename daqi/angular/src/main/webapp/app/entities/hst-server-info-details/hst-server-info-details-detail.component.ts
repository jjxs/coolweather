import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IHstServerInfoDetails } from 'app/shared/model/hst-server-info-details.model';

@Component({
    selector: 'jhi-hst-server-info-details-detail',
    templateUrl: './hst-server-info-details-detail.component.html'
})
export class HstServerInfoDetailsDetailComponent implements OnInit {
    hstServerInfoDetails: IHstServerInfoDetails;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ hstServerInfoDetails }) => {
            this.hstServerInfoDetails = hstServerInfoDetails;
        });
    }

    previousState() {
        window.history.back();
    }
}
