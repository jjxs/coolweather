import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IQmsQualityControlDetailsRelation } from 'app/shared/model/qms-quality-control-details-relation.model';

@Component({
    selector: 'jhi-qms-quality-control-details-relation-detail',
    templateUrl: './qms-quality-control-details-relation-detail.component.html'
})
export class QmsQualityControlDetailsRelationDetailComponent implements OnInit {
    qmsQualityControlDetailsRelation: IQmsQualityControlDetailsRelation;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ qmsQualityControlDetailsRelation }) => {
            this.qmsQualityControlDetailsRelation = qmsQualityControlDetailsRelation;
        });
    }

    previousState() {
        window.history.back();
    }
}
