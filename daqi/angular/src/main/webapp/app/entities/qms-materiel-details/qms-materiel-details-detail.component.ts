import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IQmsMaterielDetails } from 'app/shared/model/qms-materiel-details.model';

@Component({
    selector: 'jhi-qms-materiel-details-detail',
    templateUrl: './qms-materiel-details-detail.component.html'
})
export class QmsMaterielDetailsDetailComponent implements OnInit {
    qmsMaterielDetails: IQmsMaterielDetails;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ qmsMaterielDetails }) => {
            this.qmsMaterielDetails = qmsMaterielDetails;
        });
    }

    previousState() {
        window.history.back();
    }
}
