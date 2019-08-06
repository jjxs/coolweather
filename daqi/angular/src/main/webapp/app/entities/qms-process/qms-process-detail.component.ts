import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IQmsProcess } from 'app/shared/model/qms-process.model';

@Component({
    selector: 'jhi-qms-process-detail',
    templateUrl: './qms-process-detail.component.html'
})
export class QmsProcessDetailComponent implements OnInit {
    qmsProcess: IQmsProcess;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ qmsProcess }) => {
            this.qmsProcess = qmsProcess;
        });
    }

    previousState() {
        window.history.back();
    }
}
