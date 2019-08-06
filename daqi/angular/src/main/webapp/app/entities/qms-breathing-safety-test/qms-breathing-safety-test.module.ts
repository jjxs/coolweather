import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { FccSharedModule } from 'app/shared';
import {
    QmsBreathingSafetyTestComponent,
    QmsBreathingSafetyTestDetailComponent,
    QmsBreathingSafetyTestUpdateComponent,
    QmsBreathingSafetyTestDeletePopupComponent,
    QmsBreathingSafetyTestDeleteDialogComponent,
    qmsBreathingSafetyTestRoute,
    qmsBreathingSafetyTestPopupRoute
} from './';

const ENTITY_STATES = [...qmsBreathingSafetyTestRoute, ...qmsBreathingSafetyTestPopupRoute];

@NgModule({
    imports: [FccSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        QmsBreathingSafetyTestComponent,
        QmsBreathingSafetyTestDetailComponent,
        QmsBreathingSafetyTestUpdateComponent,
        QmsBreathingSafetyTestDeleteDialogComponent,
        QmsBreathingSafetyTestDeletePopupComponent
    ],
    entryComponents: [
        QmsBreathingSafetyTestComponent,
        QmsBreathingSafetyTestUpdateComponent,
        QmsBreathingSafetyTestDeleteDialogComponent,
        QmsBreathingSafetyTestDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class FccQmsBreathingSafetyTestModule {}
