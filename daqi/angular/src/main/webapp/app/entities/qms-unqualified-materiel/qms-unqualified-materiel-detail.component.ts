import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IQmsUnqualifiedMateriel } from 'app/shared/model/qms-unqualified-materiel.model';

@Component({
    selector: 'jhi-qms-unqualified-materiel-detail',
    templateUrl: './qms-unqualified-materiel-detail.component.html'
})
export class QmsUnqualifiedMaterielDetailComponent implements OnInit {
    qmsUnqualifiedMateriel: IQmsUnqualifiedMateriel;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ qmsUnqualifiedMateriel }) => {
            this.qmsUnqualifiedMateriel = qmsUnqualifiedMateriel;
        });
    }

    previousState() {
        window.history.back();
    }
}
