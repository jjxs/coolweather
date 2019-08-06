import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IRbacElement } from 'app/shared/model/rbac-element.model';

@Component({
    selector: 'jhi-rbac-element-detail',
    templateUrl: './rbac-element-detail.component.html'
})
export class RbacElementDetailComponent implements OnInit {
    rbacElement: IRbacElement;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ rbacElement }) => {
            this.rbacElement = rbacElement;
        });
    }

    previousState() {
        window.history.back();
    }
}
