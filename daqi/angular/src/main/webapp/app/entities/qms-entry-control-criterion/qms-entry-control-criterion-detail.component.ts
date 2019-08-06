import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IQmsEntryControlCriterion } from 'app/shared/model/qms-entry-control-criterion.model';

@Component({
    selector: 'jhi-qms-entry-control-criterion-detail',
    templateUrl: './qms-entry-control-criterion-detail.component.html'
})
export class QmsEntryControlCriterionDetailComponent implements OnInit {
    qmsEntryControlCriterion: IQmsEntryControlCriterion;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ qmsEntryControlCriterion }) => {
            this.qmsEntryControlCriterion = qmsEntryControlCriterion;
        });
    }

    previousState() {
        window.history.back();
    }
}
