import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IQmsMaterielSupplier } from 'app/shared/model/qms-materiel-supplier.model';

@Component({
    selector: 'jhi-qms-materiel-supplier-detail',
    templateUrl: './qms-materiel-supplier-detail.component.html'
})
export class QmsMaterielSupplierDetailComponent implements OnInit {
    qmsMaterielSupplier: IQmsMaterielSupplier;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ qmsMaterielSupplier }) => {
            this.qmsMaterielSupplier = qmsMaterielSupplier;
        });
    }

    previousState() {
        window.history.back();
    }
}
