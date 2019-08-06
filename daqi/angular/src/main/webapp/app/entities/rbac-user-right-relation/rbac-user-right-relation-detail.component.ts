import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IRbacUserRightRelation } from 'app/shared/model/rbac-user-right-relation.model';

@Component({
    selector: 'jhi-rbac-user-right-relation-detail',
    templateUrl: './rbac-user-right-relation-detail.component.html'
})
export class RbacUserRightRelationDetailComponent implements OnInit {
    rbacUserRightRelation: IRbacUserRightRelation;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ rbacUserRightRelation }) => {
            this.rbacUserRightRelation = rbacUserRightRelation;
        });
    }

    previousState() {
        window.history.back();
    }
}
