import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IQmsVehicleTypeInfo } from 'app/shared/model/qms-vehicle-type-info.model';

@Component({
    selector: 'jhi-qms-vehicle-type-info-detail',
    templateUrl: './qms-vehicle-type-info-detail.component.html'
})
export class QmsVehicleTypeInfoDetailComponent implements OnInit {
    qmsVehicleTypeInfo: IQmsVehicleTypeInfo;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ qmsVehicleTypeInfo }) => {
            this.qmsVehicleTypeInfo = qmsVehicleTypeInfo;
        });
    }

    previousState() {
        window.history.back();
    }
}
