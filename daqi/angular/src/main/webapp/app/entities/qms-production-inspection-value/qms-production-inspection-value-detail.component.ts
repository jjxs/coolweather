import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IQmsProductionInspectionValue } from 'app/shared/model/qms-production-inspection-value.model';

@Component({
    selector: 'jhi-qms-production-inspection-value-detail',
    templateUrl: './qms-production-inspection-value-detail.component.html'
})
export class QmsProductionInspectionValueDetailComponent implements OnInit {
    qmsProductionInspectionValue: IQmsProductionInspectionValue;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ qmsProductionInspectionValue }) => {
            this.qmsProductionInspectionValue = qmsProductionInspectionValue;
        });
    }

    previousState() {
        window.history.back();
    }
}
