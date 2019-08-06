import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IQmsEquipment } from 'app/shared/model/qms-equipment.model';

@Component({
    selector: 'jhi-qms-equipment-detail',
    templateUrl: './qms-equipment-detail.component.html'
})
export class QmsEquipmentDetailComponent implements OnInit {
    qmsEquipment: IQmsEquipment;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ qmsEquipment }) => {
            this.qmsEquipment = qmsEquipment;
        });
    }

    previousState() {
        window.history.back();
    }
}
