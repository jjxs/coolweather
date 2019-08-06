import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IQmsEntryInspection } from 'app/shared/model/qms-entry-inspection.model';

@Component({
    selector: 'jhi-qms-entry-inspection-detail',
    templateUrl: './qms-entry-inspection-detail.component.html'
})
export class QmsEntryInspectionDetailComponent implements OnInit {
    qmsEntryInspection: IQmsEntryInspection;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ qmsEntryInspection }) => {
            this.qmsEntryInspection = qmsEntryInspection;
        });
    }

    previousState() {
        window.history.back();
    }
}
