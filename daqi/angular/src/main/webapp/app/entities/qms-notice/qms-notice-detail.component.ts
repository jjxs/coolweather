import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IQmsNotice } from 'app/shared/model/qms-notice.model';

@Component({
    selector: 'jhi-qms-notice-detail',
    templateUrl: './qms-notice-detail.component.html'
})
export class QmsNoticeDetailComponent implements OnInit {
    qmsNotice: IQmsNotice;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ qmsNotice }) => {
            this.qmsNotice = qmsNotice;
        });
    }

    previousState() {
        window.history.back();
    }
}
