import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IQmsUnqualifiedProductDetails } from 'app/shared/model/qms-unqualified-product-details.model';

@Component({
    selector: 'jhi-qms-unqualified-product-details-detail',
    templateUrl: './qms-unqualified-product-details-detail.component.html'
})
export class QmsUnqualifiedProductDetailsDetailComponent implements OnInit {
    qmsUnqualifiedProductDetails: IQmsUnqualifiedProductDetails;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ qmsUnqualifiedProductDetails }) => {
            this.qmsUnqualifiedProductDetails = qmsUnqualifiedProductDetails;
        });
    }

    previousState() {
        window.history.back();
    }
}
