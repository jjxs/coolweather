import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { FccSharedModule } from 'app/shared';
import {
    QmsProductionTaskComponent,
    QmsProductionTaskDetailComponent,
    QmsProductionTaskUpdateComponent,
    QmsProductionTaskDeletePopupComponent,
    QmsProductionTaskDeleteDialogComponent,
    qmsProductionTaskRoute,
    qmsProductionTaskPopupRoute
} from './';

const ENTITY_STATES = [...qmsProductionTaskRoute, ...qmsProductionTaskPopupRoute];

@NgModule({
    imports: [FccSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        QmsProductionTaskComponent,
        QmsProductionTaskDetailComponent,
        QmsProductionTaskUpdateComponent,
        QmsProductionTaskDeleteDialogComponent,
        QmsProductionTaskDeletePopupComponent
    ],
    entryComponents: [
        QmsProductionTaskComponent,
        QmsProductionTaskUpdateComponent,
        QmsProductionTaskDeleteDialogComponent,
        QmsProductionTaskDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class FccQmsProductionTaskModule {}
