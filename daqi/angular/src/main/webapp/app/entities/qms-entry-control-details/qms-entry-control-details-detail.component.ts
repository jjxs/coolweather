import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IQmsEntryControlDetails } from 'app/shared/model/qms-entry-control-details.model';

@Component({
    selector: 'jhi-qms-entry-control-details-detail',
    templateUrl: './qms-entry-control-details-detail.component.html'
})
export class QmsEntryControlDetailsDetailComponent implements OnInit {
    qmsEntryControlDetails: IQmsEntryControlDetails;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ qmsEntryControlDetails }) => {
            this.qmsEntryControlDetails = qmsEntryControlDetails;
        });
    }

    previousState() {
        window.history.back();
    }
}
