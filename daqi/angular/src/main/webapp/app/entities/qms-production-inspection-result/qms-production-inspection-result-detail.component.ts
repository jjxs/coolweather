import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IQmsProductionInspectionResult } from 'app/shared/model/qms-production-inspection-result.model';

@Component({
    selector: 'jhi-qms-production-inspection-result-detail',
    templateUrl: './qms-production-inspection-result-detail.component.html'
})
export class QmsProductionInspectionResultDetailComponent implements OnInit {
    qmsProductionInspectionResult: IQmsProductionInspectionResult;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ qmsProductionInspectionResult }) => {
            this.qmsProductionInspectionResult = qmsProductionInspectionResult;
        });
    }

    previousState() {
        window.history.back();
    }
}
