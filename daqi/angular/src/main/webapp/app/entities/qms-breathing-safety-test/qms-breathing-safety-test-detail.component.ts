import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IQmsBreathingSafetyTest } from 'app/shared/model/qms-breathing-safety-test.model';

@Component({
    selector: 'jhi-qms-breathing-safety-test-detail',
    templateUrl: './qms-breathing-safety-test-detail.component.html'
})
export class QmsBreathingSafetyTestDetailComponent implements OnInit {
    qmsBreathingSafetyTest: IQmsBreathingSafetyTest;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ qmsBreathingSafetyTest }) => {
            this.qmsBreathingSafetyTest = qmsBreathingSafetyTest;
        });
    }

    previousState() {
        window.history.back();
    }
}
