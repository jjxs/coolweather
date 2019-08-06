import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IQmsSupplier } from 'app/shared/model/qms-supplier.model';

@Component({
    selector: 'jhi-qms-supplier-detail',
    templateUrl: './qms-supplier-detail.component.html'
})
export class QmsSupplierDetailComponent implements OnInit {
    qmsSupplier: IQmsSupplier;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ qmsSupplier }) => {
            this.qmsSupplier = qmsSupplier;
        });
    }

    previousState() {
        window.history.back();
    }
}
