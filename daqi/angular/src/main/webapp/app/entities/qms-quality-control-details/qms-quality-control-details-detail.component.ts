import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IQmsQualityControlDetails } from 'app/shared/model/qms-quality-control-details.model';

@Component({
    selector: 'jhi-qms-quality-control-details-detail',
    templateUrl: './qms-quality-control-details-detail.component.html'
})
export class QmsQualityControlDetailsDetailComponent implements OnInit {
    qmsQualityControlDetails: IQmsQualityControlDetails;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ qmsQualityControlDetails }) => {
            this.qmsQualityControlDetails = qmsQualityControlDetails;
        });
    }

    previousState() {
        window.history.back();
    }
}
