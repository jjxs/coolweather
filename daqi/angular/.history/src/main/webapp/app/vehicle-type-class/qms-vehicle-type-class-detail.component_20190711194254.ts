import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IQmsVehicleTypeClass } from 'app/shared/model/qms-vehicle-type-class.model';

@Component({
    selector: 'jhi-qms-vehicle-type-class-detail',
    templateUrl: './qms-vehicle-type-class-detail.component.html',
    styleUrls: [
        './vehicle-type.scss'
    ]
})
export class QmsVehicleTypeClassDetailComponent implements OnInit {
    qmsVehicleTypeClass: IQmsVehicleTypeClass;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ qmsVehicleTypeClass }) => {
            this.qmsVehicleTypeClass = qmsVehicleTypeClass;
        });
    }

    previousState() {
        window.history.back();
    }
}
