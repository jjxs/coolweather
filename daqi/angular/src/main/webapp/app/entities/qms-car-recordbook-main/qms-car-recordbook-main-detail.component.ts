import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IQmsCarRecordbookMain } from 'app/shared/model/qms-car-recordbook-main.model';

@Component({
    selector: 'jhi-qms-car-recordbook-main-detail',
    templateUrl: './qms-car-recordbook-main-detail.component.html'
})
export class QmsCarRecordbookMainDetailComponent implements OnInit {
    qmsCarRecordbookMain: IQmsCarRecordbookMain;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ qmsCarRecordbookMain }) => {
            this.qmsCarRecordbookMain = qmsCarRecordbookMain;
        });
    }

    previousState() {
        window.history.back();
    }
}
