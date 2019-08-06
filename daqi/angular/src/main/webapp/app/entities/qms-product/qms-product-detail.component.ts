import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IQmsProduct } from 'app/shared/model/qms-product.model';

@Component({
    selector: 'jhi-qms-product-detail',
    templateUrl: './qms-product-detail.component.html'
})
export class QmsProductDetailComponent implements OnInit {
    qmsProduct: IQmsProduct;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ qmsProduct }) => {
            this.qmsProduct = qmsProduct;
        });
    }

    previousState() {
        window.history.back();
    }
}
