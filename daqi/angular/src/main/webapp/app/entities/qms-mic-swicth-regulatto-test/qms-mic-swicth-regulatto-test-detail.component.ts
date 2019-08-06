import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IQmsMicSwicthRegulattoTest } from 'app/shared/model/qms-mic-swicth-regulatto-test.model';

@Component({
    selector: 'jhi-qms-mic-swicth-regulatto-test-detail',
    templateUrl: './qms-mic-swicth-regulatto-test-detail.component.html'
})
export class QmsMicSwicthRegulattoTestDetailComponent implements OnInit {
    qmsMicSwicthRegulattoTest: IQmsMicSwicthRegulattoTest;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ qmsMicSwicthRegulattoTest }) => {
            this.qmsMicSwicthRegulattoTest = qmsMicSwicthRegulattoTest;
        });
    }

    previousState() {
        window.history.back();
    }
}
