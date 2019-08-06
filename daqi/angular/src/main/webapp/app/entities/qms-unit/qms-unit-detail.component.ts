import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IQmsUnit } from 'app/shared/model/qms-unit.model';

@Component({
    selector: 'jhi-qms-unit-detail',
    templateUrl: './qms-unit-detail.component.html'
})
export class QmsUnitDetailComponent implements OnInit {
    qmsUnit: IQmsUnit;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ qmsUnit }) => {
            this.qmsUnit = qmsUnit;
        });
    }

    previousState() {
        window.history.back();
    }
}
