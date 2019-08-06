import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IQmsDefect } from 'app/shared/model/qms-defect.model';

@Component({
    selector: 'jhi-qms-defect-detail',
    templateUrl: './qms-defect-detail.component.html'
})
export class QmsDefectDetailComponent implements OnInit {
    qmsDefect: IQmsDefect;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ qmsDefect }) => {
            this.qmsDefect = qmsDefect;
        });
    }

    previousState() {
        window.history.back();
    }
}
