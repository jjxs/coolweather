import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { FccSharedModule } from 'app/shared';
import {
    QmsUnhealthyComponent,
    QmsUnhealthyDetailComponent,
    QmsUnhealthyUpdateComponent,
    QmsUnhealthyDeletePopupComponent,
    QmsUnhealthyDeleteDialogComponent,
    qmsUnhealthyRoute,
    qmsUnhealthyPopupRoute
} from './';

const ENTITY_STATES = [...qmsUnhealthyRoute, ...qmsUnhealthyPopupRoute];

@NgModule({
    imports: [FccSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        QmsUnhealthyComponent,
        QmsUnhealthyDetailComponent,
        QmsUnhealthyUpdateComponent,
        QmsUnhealthyDeleteDialogComponent,
        QmsUnhealthyDeletePopupComponent
    ],
    entryComponents: [
        QmsUnhealthyComponent,
        QmsUnhealthyUpdateComponent,
        QmsUnhealthyDeleteDialogComponent,
        QmsUnhealthyDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class FccQmsUnhealthyModule {}
