import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IRbacMenuRightRelation } from 'app/shared/model/rbac-menu-right-relation.model';

@Component({
    selector: 'jhi-rbac-menu-right-relation-detail',
    templateUrl: './rbac-menu-right-relation-detail.component.html'
})
export class RbacMenuRightRelationDetailComponent implements OnInit {
    rbacMenuRightRelation: IRbacMenuRightRelation;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ rbacMenuRightRelation }) => {
            this.rbacMenuRightRelation = rbacMenuRightRelation;
        });
    }

    previousState() {
        window.history.back();
    }
}
