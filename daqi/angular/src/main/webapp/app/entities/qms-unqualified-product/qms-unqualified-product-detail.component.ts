import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IQmsUnqualifiedProduct } from 'app/shared/model/qms-unqualified-product.model';

@Component({
    selector: 'jhi-qms-unqualified-product-detail',
    templateUrl: './qms-unqualified-product-detail.component.html'
})
export class QmsUnqualifiedProductDetailComponent implements OnInit {
    qmsUnqualifiedProduct: IQmsUnqualifiedProduct;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ qmsUnqualifiedProduct }) => {
            this.qmsUnqualifiedProduct = qmsUnqualifiedProduct;
        });
    }

    previousState() {
        window.history.back();
    }
}
