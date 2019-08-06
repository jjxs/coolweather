import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IQmsSupplierClass } from 'app/shared/model/qms-supplier-class.model';

@Component({
    selector: 'jhi-qms-supplier-class-detail',
    templateUrl: './qms-supplier-class-detail.component.html'
})
export class QmsSupplierClassDetailComponent implements OnInit {
    qmsSupplierClass: IQmsSupplierClass;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ qmsSupplierClass }) => {
            this.qmsSupplierClass = qmsSupplierClass;
        });
    }

    previousState() {
        window.history.back();
    }
}
