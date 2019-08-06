import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IQmsBomTechnology } from 'app/shared/model/qms-bom-technology.model';

@Component({
    selector: 'jhi-qms-bom-technology-detail',
    templateUrl: './qms-bom-technology-detail.component.html'
})
export class QmsBomTechnologyDetailComponent implements OnInit {
    qmsBomTechnology: IQmsBomTechnology;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ qmsBomTechnology }) => {
            this.qmsBomTechnology = qmsBomTechnology;
        });
    }

    previousState() {
        window.history.back();
    }
}
