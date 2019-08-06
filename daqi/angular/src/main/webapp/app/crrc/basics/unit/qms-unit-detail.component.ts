import { Component, OnInit } from '@angular/core';
import { ActivatedRoute ,Router} from '@angular/router';

import { IQmsUnit } from 'app/shared/model/qms-unit.model';

@Component({
    selector: 'jhi-qms-unit-detail',
    templateUrl: './qms-unit-detail.component.html',
    styleUrls: [
        './unit.scss'
    ]
})
export class QmsUnitDetailComponent implements OnInit {
    qmsUnit: IQmsUnit;

    constructor(private activatedRoute: ActivatedRoute,private router: Router) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ qmsUnit }) => {
            this.qmsUnit = qmsUnit;
        });
    }

    previousState() {
        this.router.navigate(['/unit']);
    }
}
