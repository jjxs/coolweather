import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IQmsApproveResult } from 'app/shared/model/qms-approve-result.model';

@Component({
    selector: 'jhi-qms-approve-result-detail',
    templateUrl: './qms-approve-result-detail.component.html'
})
export class QmsApproveResultDetailComponent implements OnInit {
    qmsApproveResult: IQmsApproveResult;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ qmsApproveResult }) => {
            this.qmsApproveResult = qmsApproveResult;
        });
    }

    previousState() {
        window.history.back();
    }
}
