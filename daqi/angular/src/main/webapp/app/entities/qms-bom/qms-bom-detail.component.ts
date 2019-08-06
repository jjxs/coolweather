import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IQmsBom } from 'app/shared/model/qms-bom.model';

@Component({
    selector: 'jhi-qms-bom-detail',
    templateUrl: './qms-bom-detail.component.html'
})
export class QmsBomDetailComponent implements OnInit {
    qmsBom: IQmsBom;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ qmsBom }) => {
            this.qmsBom = qmsBom;
        });
    }

    previousState() {
        window.history.back();
    }
}
