import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IQmsMaterielType } from 'app/shared/model/qms-materiel-type.model';

@Component({
    selector: 'jhi-qms-materiel-type-detail',
    templateUrl: './qms-materiel-type-detail.component.html'
})
export class QmsMaterielTypeDetailComponent implements OnInit {
    qmsMaterielType: IQmsMaterielType;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ qmsMaterielType }) => {
            this.qmsMaterielType = qmsMaterielType;
        });
    }

    previousState() {
        window.history.back();
    }
}
