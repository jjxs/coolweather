import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IQmsIntelligentTriggerTest } from 'app/shared/model/qms-intelligent-trigger-test.model';

@Component({
    selector: 'jhi-qms-intelligent-trigger-test-detail',
    templateUrl: './qms-intelligent-trigger-test-detail.component.html'
})
export class QmsIntelligentTriggerTestDetailComponent implements OnInit {
    qmsIntelligentTriggerTest: IQmsIntelligentTriggerTest;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ qmsIntelligentTriggerTest }) => {
            this.qmsIntelligentTriggerTest = qmsIntelligentTriggerTest;
        });
    }

    previousState() {
        window.history.back();
    }
}
