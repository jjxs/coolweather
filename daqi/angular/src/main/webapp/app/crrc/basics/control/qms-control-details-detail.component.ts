import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { IQmsControlDetails } from 'app/shared/model/qms-control-details.model';

@Component({
    selector: 'jhi-qms-control-details-detail',
    templateUrl: './qms-control-details-detail.component.html',
    styleUrls: [
        './control.scss'
    ]
})
export class QmsControlDetailsDetailComponent implements OnInit {
    qmsControlDetails: IQmsControlDetails;
    //结果区分
   
    result = [
        { label: '数字', value: '0' },
        { label: '下拉', value: '1' }
    ];

    constructor(private activatedRoute: ActivatedRoute,private router: Router,) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ qmsControlDetails }) => {
            this.qmsControlDetails = qmsControlDetails;
        });
    }

    previousState() {
        this.router.navigate(['/control']);
    }
}
