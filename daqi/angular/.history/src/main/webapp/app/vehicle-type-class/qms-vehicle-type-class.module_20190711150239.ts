import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { FccSharedModule } from 'app/shared';
import { TableModule } from 'primeng/table';
import {
    QmsVehicleTypeClassComponent,
    QmsVehicleTypeClassDetailComponent,
    QmsVehicleTypeClassUpdateComponent,
    QmsVehicleTypeClassDeletePopupComponent,
    QmsVehicleTypeClassDeleteDialogComponent,
    qmsVehicleTypeClassRoute,
    qmsVehicleTypeClassPopupRoute
} from './';

const ENTITY_STATES = [...qmsVehicleTypeClassRoute, ...qmsVehicleTypeClassPopupRoute];

@NgModule({
    imports: [FccSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        QmsVehicleTypeClassComponent,
        QmsVehicleTypeClassDetailComponent,
        QmsVehicleTypeClassUpdateComponent,
        QmsVehicleTypeClassDeleteDialogComponent,
        QmsVehicleTypeClassDeletePopupComponent
    ],
    entryComponents: [
        QmsVehicleTypeClassComponent,
        QmsVehicleTypeClassUpdateComponent,
        QmsVehicleTypeClassDeleteDialogComponent,
        QmsVehicleTypeClassDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class FccQmsVehicleTypeClassModule {}
