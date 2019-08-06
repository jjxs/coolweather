import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { FccSharedModule } from 'app/shared';
import {
    QmsEntryControlDetailsComponent,
    QmsEntryControlDetailsDetailComponent,
    QmsEntryControlDetailsUpdateComponent,
    QmsEntryControlDetailsDeletePopupComponent,
    QmsEntryControlDetailsDeleteDialogComponent,
    qmsEntryControlDetailsRoute,
    qmsEntryControlDetailsPopupRoute
} from './';

const ENTITY_STATES = [...qmsEntryControlDetailsRoute, ...qmsEntryControlDetailsPopupRoute];

@NgModule({
    imports: [FccSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        QmsEntryControlDetailsComponent,
        QmsEntryControlDetailsDetailComponent,
        QmsEntryControlDetailsUpdateComponent,
        QmsEntryControlDetailsDeleteDialogComponent,
        QmsEntryControlDetailsDeletePopupComponent
    ],
    entryComponents: [
        QmsEntryControlDetailsComponent,
        QmsEntryControlDetailsUpdateComponent,
        QmsEntryControlDetailsDeleteDialogComponent,
        QmsEntryControlDetailsDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class FccQmsEntryControlDetailsModule {}
