import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IRbacUser } from 'app/shared/model/rbac-user.model';
import { RbacUserService } from '../rbac-user';

@Component({
    selector: 'jhi-rbac-user-detail',
    templateUrl: './rbac-user-detail.component.html',
    styleUrls: ['rbac-user.scss']
})
export class RbacUserDetailComponent implements OnInit {
    rbacUser: IRbacUser;
    updateFlag: boolean;
    roleName: any;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private rbacUserService: RbacUserService) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ rbacUser }) => {
            this.rbacUser = rbacUser;
        });
        this.rbacUserService.findUserRole(this.rbacUser.id).subscribe(data => {
            this.roleName = data.body[0][1];
        });
    }

    previousState() {
        this.router.navigate(['rbac-user']);
    }
}
