import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { FccSharedModule } from 'app/shared';
import {
    QmsQualityControlDetailsComponent,
    QmsQualityControlDetailsDetailComponent,
    QmsQualityControlDetailsUpdateComponent,
    QmsQualityControlDetailsDeletePopupComponent,
    QmsQualityControlDetailsDeleteDialogComponent,
    qmsQualityControlDetailsRoute,
    qmsQualityControlDetailsPopupRoute
} from './';

const ENTITY_STATES = [...qmsQualityControlDetailsRoute, ...qmsQualityControlDetailsPopupRoute];

@NgModule({
    imports: [FccSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        QmsQualityControlDetailsComponent,
        QmsQualityControlDetailsDetailComponent,
        QmsQualityControlDetailsUpdateComponent,
        QmsQualityControlDetailsDeleteDialogComponent,
        QmsQualityControlDetailsDeletePopupComponent
    ],
    entryComponents: [
        QmsQualityControlDetailsComponent,
        QmsQualityControlDetailsUpdateComponent,
        QmsQualityControlDetailsDeleteDialogComponent,
        QmsQualityControlDetailsDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class FccQmsQualityControlDetailsModule {}
