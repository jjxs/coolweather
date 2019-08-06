import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IQmsCarRecordbookDetails } from 'app/shared/model/qms-car-recordbook-details.model';

@Component({
    selector: 'jhi-qms-car-recordbook-details-detail',
    templateUrl: './qms-car-recordbook-details-detail.component.html'
})
export class QmsCarRecordbookDetailsDetailComponent implements OnInit {
    qmsCarRecordbookDetails: IQmsCarRecordbookDetails;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ qmsCarRecordbookDetails }) => {
            this.qmsCarRecordbookDetails = qmsCarRecordbookDetails;
        });
    }

    previousState() {
        window.history.back();
    }
}
