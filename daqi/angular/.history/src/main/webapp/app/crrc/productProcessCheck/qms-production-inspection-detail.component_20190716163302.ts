import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IQmsProductionInspection } from 'app/shared/model/qms-production-inspection.model';

@Component({
    selector: 'jhi-qms-production-inspection-detail',
    templateUrl: './qms-production-inspection-detail.component.html',
    styleUrls: [
        './productProcess.scss'
    ]
})
export class QmsProductionInspectionDetailComponent implements OnInit {
    qmsProductionInspection: IQmsProductionInspection;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ qmsProductionInspection }) => {
            this.qmsProductionInspection = qmsProductionInspection;
        });
    }

    previousState() {
        this.router.navigate(['/productProcessCheck']);
    }
}
