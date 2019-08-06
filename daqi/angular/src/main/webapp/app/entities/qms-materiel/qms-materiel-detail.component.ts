import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IQmsMateriel } from 'app/shared/model/qms-materiel.model';

@Component({
    selector: 'jhi-qms-materiel-detail',
    templateUrl: './qms-materiel-detail.component.html'
})
export class QmsMaterielDetailComponent implements OnInit {
    qmsMateriel: IQmsMateriel;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ qmsMateriel }) => {
            this.qmsMateriel = qmsMateriel;
        });
    }

    previousState() {
        window.history.back();
    }
}
