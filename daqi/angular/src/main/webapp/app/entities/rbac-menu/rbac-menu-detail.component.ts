import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IRbacMenu } from 'app/shared/model/rbac-menu.model';

@Component({
    selector: 'jhi-rbac-menu-detail',
    templateUrl: './rbac-menu-detail.component.html'
})
export class RbacMenuDetailComponent implements OnInit {
    rbacMenu: IRbacMenu;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ rbacMenu }) => {
            this.rbacMenu = rbacMenu;
        });
    }

    previousState() {
        window.history.back();
    }
}
