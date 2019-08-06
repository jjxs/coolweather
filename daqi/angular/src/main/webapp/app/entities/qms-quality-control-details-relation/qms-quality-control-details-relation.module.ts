import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { FccSharedModule } from 'app/shared';
import {
    QmsQualityControlDetailsRelationComponent,
    QmsQualityControlDetailsRelationDetailComponent,
    QmsQualityControlDetailsRelationUpdateComponent,
    QmsQualityControlDetailsRelationDeletePopupComponent,
    QmsQualityControlDetailsRelationDeleteDialogComponent,
    qmsQualityControlDetailsRelationRoute,
    qmsQualityControlDetailsRelationPopupRoute
} from './';

const ENTITY_STATES = [...qmsQualityControlDetailsRelationRoute, ...qmsQualityControlDetailsRelationPopupRoute];

@NgModule({
    imports: [FccSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        QmsQualityControlDetailsRelationComponent,
        QmsQualityControlDetailsRelationDetailComponent,
        QmsQualityControlDetailsRelationUpdateComponent,
        QmsQualityControlDetailsRelationDeleteDialogComponent,
        QmsQualityControlDetailsRelationDeletePopupComponent
    ],
    entryComponents: [
        QmsQualityControlDetailsRelationComponent,
        QmsQualityControlDetailsRelationUpdateComponent,
        QmsQualityControlDetailsRelationDeleteDialogComponent,
        QmsQualityControlDetailsRelationDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class FccQmsQualityControlDetailsRelationModule {}
