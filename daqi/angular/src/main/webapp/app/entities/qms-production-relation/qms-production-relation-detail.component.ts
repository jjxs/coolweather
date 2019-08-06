import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IQmsProductionRelation } from 'app/shared/model/qms-production-relation.model';

@Component({
    selector: 'jhi-qms-production-relation-detail',
    templateUrl: './qms-production-relation-detail.component.html'
})
export class QmsProductionRelationDetailComponent implements OnInit {
    qmsProductionRelation: IQmsProductionRelation;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ qmsProductionRelation }) => {
            this.qmsProductionRelation = qmsProductionRelation;
        });
    }

    previousState() {
        window.history.back();
    }
}
