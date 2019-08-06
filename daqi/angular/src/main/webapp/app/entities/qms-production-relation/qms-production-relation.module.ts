import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { FccSharedModule } from 'app/shared';
import {
    QmsProductionRelationComponent,
    QmsProductionRelationDetailComponent,
    QmsProductionRelationUpdateComponent,
    QmsProductionRelationDeletePopupComponent,
    QmsProductionRelationDeleteDialogComponent,
    qmsProductionRelationRoute,
    qmsProductionRelationPopupRoute
} from './';

const ENTITY_STATES = [...qmsProductionRelationRoute, ...qmsProductionRelationPopupRoute];

@NgModule({
    imports: [FccSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        QmsProductionRelationComponent,
        QmsProductionRelationDetailComponent,
        QmsProductionRelationUpdateComponent,
        QmsProductionRelationDeleteDialogComponent,
        QmsProductionRelationDeletePopupComponent
    ],
    entryComponents: [
        QmsProductionRelationComponent,
        QmsProductionRelationUpdateComponent,
        QmsProductionRelationDeleteDialogComponent,
        QmsProductionRelationDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class FccQmsProductionRelationModule {}
