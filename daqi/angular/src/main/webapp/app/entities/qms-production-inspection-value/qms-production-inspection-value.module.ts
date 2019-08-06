import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { FccSharedModule } from 'app/shared';
import {
    QmsProductionInspectionValueComponent,
    QmsProductionInspectionValueDetailComponent,
    QmsProductionInspectionValueUpdateComponent,
    QmsProductionInspectionValueDeletePopupComponent,
    QmsProductionInspectionValueDeleteDialogComponent,
    qmsProductionInspectionValueRoute,
    qmsProductionInspectionValuePopupRoute
} from './';

const ENTITY_STATES = [...qmsProductionInspectionValueRoute, ...qmsProductionInspectionValuePopupRoute];

@NgModule({
    imports: [FccSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        QmsProductionInspectionValueComponent,
        QmsProductionInspectionValueDetailComponent,
        QmsProductionInspectionValueUpdateComponent,
        QmsProductionInspectionValueDeleteDialogComponent,
        QmsProductionInspectionValueDeletePopupComponent
    ],
    entryComponents: [
        QmsProductionInspectionValueComponent,
        QmsProductionInspectionValueUpdateComponent,
        QmsProductionInspectionValueDeleteDialogComponent,
        QmsProductionInspectionValueDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class FccQmsProductionInspectionValueModule {}
