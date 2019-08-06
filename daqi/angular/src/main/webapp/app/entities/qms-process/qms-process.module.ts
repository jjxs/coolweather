import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { FccSharedModule } from 'app/shared';
import {
    QmsProcessComponent,
    QmsProcessDetailComponent,
    QmsProcessUpdateComponent,
    QmsProcessDeletePopupComponent,
    QmsProcessDeleteDialogComponent,
    qmsProcessRoute,
    qmsProcessPopupRoute
} from './';

const ENTITY_STATES = [...qmsProcessRoute, ...qmsProcessPopupRoute];

@NgModule({
    imports: [FccSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        QmsProcessComponent,
        QmsProcessDetailComponent,
        QmsProcessUpdateComponent,
        QmsProcessDeleteDialogComponent,
        QmsProcessDeletePopupComponent
    ],
    entryComponents: [QmsProcessComponent, QmsProcessUpdateComponent, QmsProcessDeleteDialogComponent, QmsProcessDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class FccQmsProcessModule {}
