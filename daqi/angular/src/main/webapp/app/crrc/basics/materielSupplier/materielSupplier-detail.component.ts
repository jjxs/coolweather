import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { IQmsMaterielSupplier } from 'app/shared/model/qms-materiel-supplier.model';

@Component({
    selector: 'jhi-qms-materiel-supplier-detail',
    templateUrl: './materielSupplier-detail.component.html',
    styleUrls: [
        './materielSupplier.scss'
    ]
})
export class QmsMaterielSupplierDetailComponent implements OnInit {
    qmsMaterielSupplier: any;

    constructor(private activatedRoute: ActivatedRoute,
                private router: Router
                ) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ qmsMaterielSupplier }) => {
            this.qmsMaterielSupplier = qmsMaterielSupplier;
        });
    }

    previousState() {
        this.router.navigate(['/qms-materiel-supplier']);
    }
}
