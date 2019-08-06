import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { FccSharedModule } from 'app/shared';
import {
    QmsEntryInspectionComponent,
    QmsEntryInspectionDetailComponent,
    QmsEntryInspectionUpdateComponent,
    QmsEntryInspectionDeletePopupComponent,
    QmsEntryInspectionDeleteDialogComponent,
    qmsEntryInspectionRoute,
    qmsEntryInspectionPopupRoute
} from './';

const ENTITY_STATES = [...qmsEntryInspectionRoute, ...qmsEntryInspectionPopupRoute];

@NgModule({
    imports: [FccSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        QmsEntryInspectionComponent,
        QmsEntryInspectionDetailComponent,
        QmsEntryInspectionUpdateComponent,
        QmsEntryInspectionDeleteDialogComponent,
        QmsEntryInspectionDeletePopupComponent
    ],
    entryComponents: [
        QmsEntryInspectionComponent,
        QmsEntryInspectionUpdateComponent,
        QmsEntryInspectionDeleteDialogComponent,
        QmsEntryInspectionDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class FccQmsEntryInspectionModule {}
