import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { FccSharedModule } from 'app/shared';
import {
    QmsIntelligentTriggerTestComponent,
    QmsIntelligentTriggerTestDetailComponent,
    QmsIntelligentTriggerTestUpdateComponent,
    QmsIntelligentTriggerTestDeletePopupComponent,
    QmsIntelligentTriggerTestDeleteDialogComponent,
    qmsIntelligentTriggerTestRoute,
    qmsIntelligentTriggerTestPopupRoute
} from './';

const ENTITY_STATES = [...qmsIntelligentTriggerTestRoute, ...qmsIntelligentTriggerTestPopupRoute];

@NgModule({
    imports: [FccSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        QmsIntelligentTriggerTestComponent,
        QmsIntelligentTriggerTestDetailComponent,
        QmsIntelligentTriggerTestUpdateComponent,
        QmsIntelligentTriggerTestDeleteDialogComponent,
        QmsIntelligentTriggerTestDeletePopupComponent
    ],
    entryComponents: [
        QmsIntelligentTriggerTestComponent,
        QmsIntelligentTriggerTestUpdateComponent,
        QmsIntelligentTriggerTestDeleteDialogComponent,
        QmsIntelligentTriggerTestDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class FccQmsIntelligentTriggerTestModule {}
