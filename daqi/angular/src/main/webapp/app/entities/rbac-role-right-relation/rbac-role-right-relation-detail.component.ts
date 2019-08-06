import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IRbacRoleRightRelation } from 'app/shared/model/rbac-role-right-relation.model';

@Component({
    selector: 'jhi-rbac-role-right-relation-detail',
    templateUrl: './rbac-role-right-relation-detail.component.html'
})
export class RbacRoleRightRelationDetailComponent implements OnInit {
    rbacRoleRightRelation: IRbacRoleRightRelation;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ rbacRoleRightRelation }) => {
            this.rbacRoleRightRelation = rbacRoleRightRelation;
        });
    }

    previousState() {
        window.history.back();
    }
}
