import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IQmsControlDetails } from 'app/shared/model/qms-control-details.model';

@Component({
    selector: 'jhi-qms-control-details-detail',
    templateUrl: './qms-control-details-detail.component.html'
})
export class QmsControlDetailsDetailComponent implements OnInit {
    qmsControlDetails: IQmsControlDetails;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ qmsControlDetails }) => {
            this.qmsControlDetails = qmsControlDetails;
        });
    }

    previousState() {
        window.history.back();
    }
}
