import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IQmsInspectionInfo } from 'app/shared/model/qms-inspection-info.model';

@Component({
    selector: 'jhi-qms-inspection-info-detail',
    templateUrl: './qms-inspection-info-detail.component.html'
})
export class QmsInspectionInfoDetailComponent implements OnInit {
    qmsInspectionInfo: IQmsInspectionInfo;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ qmsInspectionInfo }) => {
            this.qmsInspectionInfo = qmsInspectionInfo;
        });
    }

    previousState() {
        window.history.back();
    }
}
