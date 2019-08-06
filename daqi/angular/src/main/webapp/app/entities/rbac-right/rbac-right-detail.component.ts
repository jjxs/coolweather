import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';

import { IRbacRight } from 'app/shared/model/rbac-right.model';

@Component({
    selector: 'jhi-rbac-right-detail',
    templateUrl: './rbac-right-detail.component.html',
    styleUrls: ['rbac-right.scss']

})
export class RbacRightDetailComponent implements OnInit {
    rbacRight: IRbacRight;

    constructor(private activatedRoute: ActivatedRoute, private router: Router) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ rbacRight }) => {
            this.rbacRight = rbacRight;
        });
    }

    previousState() {
        this.router.navigateByUrl('/rbac-right');
    }
}
