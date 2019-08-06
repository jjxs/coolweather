import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { FccSharedModule } from 'app/shared';
import {
    QmsUnitComponent,
    QmsUnitDetailComponent,
    QmsUnitUpdateComponent,
    QmsUnitDeletePopupComponent,
    QmsUnitDeleteDialogComponent,
    qmsUnitRoute,
    qmsUnitPopupRoute
} from './';

const ENTITY_STATES = [...qmsUnitRoute, ...qmsUnitPopupRoute];

@NgModule({
    imports: [FccSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        QmsUnitComponent,
        QmsUnitDetailComponent,
        QmsUnitUpdateComponent,
        QmsUnitDeleteDialogComponent,
        QmsUnitDeletePopupComponent
    ],
    entryComponents: [QmsUnitComponent, QmsUnitUpdateComponent, QmsUnitDeleteDialogComponent, QmsUnitDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class FccQmsUnitModule {}
