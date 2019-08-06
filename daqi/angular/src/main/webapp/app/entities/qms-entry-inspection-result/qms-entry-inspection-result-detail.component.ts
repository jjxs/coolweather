import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IQmsEntryInspectionResult } from 'app/shared/model/qms-entry-inspection-result.model';

@Component({
    selector: 'jhi-qms-entry-inspection-result-detail',
    templateUrl: './qms-entry-inspection-result-detail.component.html'
})
export class QmsEntryInspectionResultDetailComponent implements OnInit {
    qmsEntryInspectionResult: IQmsEntryInspectionResult;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ qmsEntryInspectionResult }) => {
            this.qmsEntryInspectionResult = qmsEntryInspectionResult;
        });
    }

    previousState() {
        window.history.back();
    }
}
