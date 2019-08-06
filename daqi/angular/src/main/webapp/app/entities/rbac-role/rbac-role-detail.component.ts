import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';

import { IRbacRole } from 'app/shared/model/rbac-role.model';
import { RbacRoleRightRelationService } from '../rbac-role-right-relation';

@Component({
    selector: 'jhi-rbac-role-detail',
    templateUrl: './rbac-role-detail.component.html',
    styleUrls: ['rbac-role.scss']
})
export class RbacRoleDetailComponent implements OnInit {
    rbacRole: IRbacRole;
    rightName: any;

    constructor(private activatedRoute: ActivatedRoute, private rbacRoleRightRelationService: RbacRoleRightRelationService,
        private router: Router) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ rbacRole }) => {
            this.rbacRole = rbacRole;
        });
        this.rbacRoleRightRelationService.findRoleRight(this.rbacRole.id).subscribe(data => {
            this.rightName = data.body[0][1];
        });
    }

    previousState() {
        this.router.navigateByUrl('/rbac-role');
    }
}
