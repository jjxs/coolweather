import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { FccSharedModule } from 'app/shared';
import {
    QmsProductionInspectionResultComponent,
    QmsProductionInspectionResultDetailComponent,
    QmsProductionInspectionResultUpdateComponent,
    QmsProductionInspectionResultDeletePopupComponent,
    QmsProductionInspectionResultDeleteDialogComponent,
    qmsProductionInspectionResultRoute,
    qmsProductionInspectionResultPopupRoute
} from './';

const ENTITY_STATES = [...qmsProductionInspectionResultRoute, ...qmsProductionInspectionResultPopupRoute];

@NgModule({
    imports: [FccSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        QmsProductionInspectionResultComponent,
        QmsProductionInspectionResultDetailComponent,
        QmsProductionInspectionResultUpdateComponent,
        QmsProductionInspectionResultDeleteDialogComponent,
        QmsProductionInspectionResultDeletePopupComponent
    ],
    entryComponents: [
        QmsProductionInspectionResultComponent,
        QmsProductionInspectionResultUpdateComponent,
        QmsProductionInspectionResultDeleteDialogComponent,
        QmsProductionInspectionResultDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class FccQmsProductionInspectionResultModule {}
