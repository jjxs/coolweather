import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IQmsQualityControl } from 'app/shared/model/qms-quality-control.model';

@Component({
    selector: 'jhi-qms-quality-control-detail',
    templateUrl: './qms-quality-control-detail.component.html'
})
export class QmsQualityControlDetailComponent implements OnInit {
    qmsQualityControl: IQmsQualityControl;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ qmsQualityControl }) => {
            this.qmsQualityControl = qmsQualityControl;
        });
    }

    previousState() {
        window.history.back();
    }
}
