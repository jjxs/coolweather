import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IQmsNrvTelation } from 'app/shared/model/qms-nrv-telation.model';

@Component({
    selector: 'jhi-qms-nrv-telation-detail',
    templateUrl: './qms-nrv-telation-detail.component.html'
})
export class QmsNrvTelationDetailComponent implements OnInit {
    qmsNrvTelation: IQmsNrvTelation;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ qmsNrvTelation }) => {
            this.qmsNrvTelation = qmsNrvTelation;
        });
    }

    previousState() {
        window.history.back();
    }
}
