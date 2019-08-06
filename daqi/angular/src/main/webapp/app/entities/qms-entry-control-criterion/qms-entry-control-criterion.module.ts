import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { FccSharedModule } from 'app/shared';
import {
    QmsEntryControlCriterionComponent,
    QmsEntryControlCriterionDetailComponent,
    QmsEntryControlCriterionUpdateComponent,
    QmsEntryControlCriterionDeletePopupComponent,
    QmsEntryControlCriterionDeleteDialogComponent,
    qmsEntryControlCriterionRoute,
    qmsEntryControlCriterionPopupRoute
} from './';

const ENTITY_STATES = [...qmsEntryControlCriterionRoute, ...qmsEntryControlCriterionPopupRoute];

@NgModule({
    imports: [FccSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        QmsEntryControlCriterionComponent,
        QmsEntryControlCriterionDetailComponent,
        QmsEntryControlCriterionUpdateComponent,
        QmsEntryControlCriterionDeleteDialogComponent,
        QmsEntryControlCriterionDeletePopupComponent
    ],
    entryComponents: [
        QmsEntryControlCriterionComponent,
        QmsEntryControlCriterionUpdateComponent,
        QmsEntryControlCriterionDeleteDialogComponent,
        QmsEntryControlCriterionDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class FccQmsEntryControlCriterionModule {}
