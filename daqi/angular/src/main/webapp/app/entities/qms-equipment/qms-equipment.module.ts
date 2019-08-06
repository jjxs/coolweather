import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { FccSharedModule } from 'app/shared';
import {
    QmsEquipmentComponent,
    QmsEquipmentDetailComponent,
    QmsEquipmentUpdateComponent,
    QmsEquipmentDeletePopupComponent,
    QmsEquipmentDeleteDialogComponent,
    qmsEquipmentRoute,
    qmsEquipmentPopupRoute
} from './';

const ENTITY_STATES = [...qmsEquipmentRoute, ...qmsEquipmentPopupRoute];

@NgModule({
    imports: [FccSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        QmsEquipmentComponent,
        QmsEquipmentDetailComponent,
        QmsEquipmentUpdateComponent,
        QmsEquipmentDeleteDialogComponent,
        QmsEquipmentDeletePopupComponent
    ],
    entryComponents: [
        QmsEquipmentComponent,
        QmsEquipmentUpdateComponent,
        QmsEquipmentDeleteDialogComponent,
        QmsEquipmentDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class FccQmsEquipmentModule {}
