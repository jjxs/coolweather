import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { FccSharedModule } from 'app/shared';
import {
    QmsInspectionInfoComponent,
    QmsInspectionInfoDetailComponent,
    QmsInspectionInfoUpdateComponent,
    QmsInspectionInfoDeletePopupComponent,
    QmsInspectionInfoDeleteDialogComponent,
    qmsInspectionInfoRoute,
    qmsInspectionInfoPopupRoute
} from './';

const ENTITY_STATES = [...qmsInspectionInfoRoute, ...qmsInspectionInfoPopupRoute];

@NgModule({
    imports: [FccSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        QmsInspectionInfoComponent,
        QmsInspectionInfoDetailComponent,
        QmsInspectionInfoUpdateComponent,
        QmsInspectionInfoDeleteDialogComponent,
        QmsInspectionInfoDeletePopupComponent
    ],
    entryComponents: [
        QmsInspectionInfoComponent,
        QmsInspectionInfoUpdateComponent,
        QmsInspectionInfoDeleteDialogComponent,
        QmsInspectionInfoDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class FccQmsInspectionInfoModule {}
