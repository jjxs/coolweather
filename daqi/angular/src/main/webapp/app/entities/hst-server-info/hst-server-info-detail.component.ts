import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IHstServerInfo } from 'app/shared/model/hst-server-info.model';

@Component({
    selector: 'jhi-hst-server-info-detail',
    templateUrl: './hst-server-info-detail.component.html'
})
export class HstServerInfoDetailComponent implements OnInit {
    hstServerInfo: IHstServerInfo;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ hstServerInfo }) => {
            this.hstServerInfo = hstServerInfo;
        });
    }

    previousState() {
        window.history.back();
    }
}
