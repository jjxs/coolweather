import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IQmsApproveFlow } from 'app/shared/model/qms-approve-flow.model';

@Component({
    selector: 'jhi-qms-approve-flow-detail',
    templateUrl: './qms-approve-flow-detail.component.html'
})
export class QmsApproveFlowDetailComponent implements OnInit {
    qmsApproveFlow: IQmsApproveFlow;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ qmsApproveFlow }) => {
            this.qmsApproveFlow = qmsApproveFlow;
        });
    }

    previousState() {
        window.history.back();
    }
}
