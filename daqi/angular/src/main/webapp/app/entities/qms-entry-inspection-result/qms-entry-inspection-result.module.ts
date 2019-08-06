import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { FccSharedModule } from 'app/shared';
import {
    QmsEntryInspectionResultComponent,
    QmsEntryInspectionResultDetailComponent,
    QmsEntryInspectionResultUpdateComponent,
    QmsEntryInspectionResultDeletePopupComponent,
    QmsEntryInspectionResultDeleteDialogComponent,
    qmsEntryInspectionResultRoute,
    qmsEntryInspectionResultPopupRoute
} from './';

const ENTITY_STATES = [...qmsEntryInspectionResultRoute, ...qmsEntryInspectionResultPopupRoute];

@NgModule({
    imports: [FccSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        QmsEntryInspectionResultComponent,
        QmsEntryInspectionResultDetailComponent,
        QmsEntryInspectionResultUpdateComponent,
        QmsEntryInspectionResultDeleteDialogComponent,
        QmsEntryInspectionResultDeletePopupComponent
    ],
    entryComponents: [
        QmsEntryInspectionResultComponent,
        QmsEntryInspectionResultUpdateComponent,
        QmsEntryInspectionResultDeleteDialogComponent,
        QmsEntryInspectionResultDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class FccQmsEntryInspectionResultModule {}
