import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IQmsMaster } from 'app/shared/model/qms-master.model';

@Component({
    selector: 'jhi-qms-master-detail',
    templateUrl: './qms-master-detail.component.html'
})
export class QmsMasterDetailComponent implements OnInit {
    qmsMaster: IQmsMaster;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ qmsMaster }) => {
            this.qmsMaster = qmsMaster;
        });
    }

    previousState() {
        window.history.back();
    }
}
