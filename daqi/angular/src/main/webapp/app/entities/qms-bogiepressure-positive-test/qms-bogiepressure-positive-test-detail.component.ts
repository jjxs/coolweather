import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IQmsBogiepressurePositiveTest } from 'app/shared/model/qms-bogiepressure-positive-test.model';

@Component({
    selector: 'jhi-qms-bogiepressure-positive-test-detail',
    templateUrl: './qms-bogiepressure-positive-test-detail.component.html'
})
export class QmsBogiepressurePositiveTestDetailComponent implements OnInit {
    qmsBogiepressurePositiveTest: IQmsBogiepressurePositiveTest;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ qmsBogiepressurePositiveTest }) => {
            this.qmsBogiepressurePositiveTest = qmsBogiepressurePositiveTest;
        });
    }

    previousState() {
        window.history.back();
    }
}
