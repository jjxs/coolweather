import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';

import { IQmsProcess } from 'app/shared/model/qms-process.model';

@Component({
    selector: 'jhi-qms-process-detail',
    templateUrl: './qms-process-detail.component.html',
    styleUrls: [
        './process.scss'
    ]
})
export class QmsProcessDetailComponent implements OnInit {
    qmsProcess: IQmsProcess;

    constructor(private activatedRoute: ActivatedRoute,private router: Router) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ qmsProcess }) => {
            this.qmsProcess = qmsProcess;
        });
    }

    previousState() {
        this.router.navigate(['/process']);
    }
}
