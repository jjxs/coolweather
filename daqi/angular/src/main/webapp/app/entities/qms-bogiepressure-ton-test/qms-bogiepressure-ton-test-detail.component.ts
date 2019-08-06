import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IQmsBogiepressureTonTest } from 'app/shared/model/qms-bogiepressure-ton-test.model';

@Component({
    selector: 'jhi-qms-bogiepressure-ton-test-detail',
    templateUrl: './qms-bogiepressure-ton-test-detail.component.html'
})
export class QmsBogiepressureTonTestDetailComponent implements OnInit {
    qmsBogiepressureTonTest: IQmsBogiepressureTonTest;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ qmsBogiepressureTonTest }) => {
            this.qmsBogiepressureTonTest = qmsBogiepressureTonTest;
        });
    }

    previousState() {
        window.history.back();
    }
}
