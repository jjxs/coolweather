import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { FccSharedModule } from 'app/shared';
import {
    QmsVehicleTypeInfoComponent,
    QmsVehicleTypeInfoDetailComponent,
    QmsVehicleTypeInfoUpdateComponent,
    QmsVehicleTypeInfoDeletePopupComponent,
    QmsVehicleTypeInfoDeleteDialogComponent,
    qmsVehicleTypeInfoRoute,
    qmsVehicleTypeInfoPopupRoute
} from './';

const ENTITY_STATES = [...qmsVehicleTypeInfoRoute, ...qmsVehicleTypeInfoPopupRoute];

@NgModule({
    imports: [FccSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        QmsVehicleTypeInfoComponent,
        QmsVehicleTypeInfoDetailComponent,
        QmsVehicleTypeInfoUpdateComponent,
        QmsVehicleTypeInfoDeleteDialogComponent,
        QmsVehicleTypeInfoDeletePopupComponent
    ],
    entryComponents: [
        QmsVehicleTypeInfoComponent,
        QmsVehicleTypeInfoUpdateComponent,
        QmsVehicleTypeInfoDeleteDialogComponent,
        QmsVehicleTypeInfoDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class FccQmsVehicleTypeInfoModule {}
