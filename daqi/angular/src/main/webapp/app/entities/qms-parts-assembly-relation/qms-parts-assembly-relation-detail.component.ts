import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IQmsPartsAssemblyRelation } from 'app/shared/model/qms-parts-assembly-relation.model';

@Component({
    selector: 'jhi-qms-parts-assembly-relation-detail',
    templateUrl: './qms-parts-assembly-relation-detail.component.html'
})
export class QmsPartsAssemblyRelationDetailComponent implements OnInit {
    qmsPartsAssemblyRelation: IQmsPartsAssemblyRelation;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ qmsPartsAssemblyRelation }) => {
            this.qmsPartsAssemblyRelation = qmsPartsAssemblyRelation;
        });
    }

    previousState() {
        window.history.back();
    }
}
