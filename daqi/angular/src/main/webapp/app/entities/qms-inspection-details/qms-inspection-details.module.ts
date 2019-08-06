import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { FccSharedModule } from 'app/shared';
import {
    QmsInspectionDetailsComponent,
    QmsInspectionDetailsDetailComponent,
    QmsInspectionDetailsUpdateComponent,
    QmsInspectionDetailsDeletePopupComponent,
    QmsInspectionDetailsDeleteDialogComponent,
    qmsInspectionDetailsRoute,
    qmsInspectionDetailsPopupRoute
} from './';

const ENTITY_STATES = [...qmsInspectionDetailsRoute, ...qmsInspectionDetailsPopupRoute];

@NgModule({
    imports: [FccSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        QmsInspectionDetailsComponent,
        QmsInspectionDetailsDetailComponent,
        QmsInspectionDetailsUpdateComponent,
        QmsInspectionDetailsDeleteDialogComponent,
        QmsInspectionDetailsDeletePopupComponent
    ],
    entryComponents: [
        QmsInspectionDetailsComponent,
        QmsInspectionDetailsUpdateComponent,
        QmsInspectionDetailsDeleteDialogComponent,
        QmsInspectionDetailsDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class FccQmsInspectionDetailsModule {}
