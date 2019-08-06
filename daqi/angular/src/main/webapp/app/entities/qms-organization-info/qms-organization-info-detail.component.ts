import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IQmsOrganizationInfo } from 'app/shared/model/qms-organization-info.model';

@Component({
    selector: 'jhi-qms-organization-info-detail',
    templateUrl: './qms-organization-info-detail.component.html'
})
export class QmsOrganizationInfoDetailComponent implements OnInit {
    qmsOrganizationInfo: IQmsOrganizationInfo;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ qmsOrganizationInfo }) => {
            this.qmsOrganizationInfo = qmsOrganizationInfo;
        });
    }

    previousState() {
        window.history.back();
    }
}
