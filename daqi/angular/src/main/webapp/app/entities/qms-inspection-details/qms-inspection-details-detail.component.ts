import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IQmsInspectionDetails } from 'app/shared/model/qms-inspection-details.model';

@Component({
    selector: 'jhi-qms-inspection-details-detail',
    templateUrl: './qms-inspection-details-detail.component.html'
})
export class QmsInspectionDetailsDetailComponent implements OnInit {
    qmsInspectionDetails: IQmsInspectionDetails;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ qmsInspectionDetails }) => {
            this.qmsInspectionDetails = qmsInspectionDetails;
        });
    }

    previousState() {
        window.history.back();
    }
}
