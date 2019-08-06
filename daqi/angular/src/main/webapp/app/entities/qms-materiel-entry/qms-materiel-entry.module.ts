import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { FccSharedModule } from 'app/shared';
import {
    QmsMaterielEntryComponent,
    QmsMaterielEntryDetailComponent,
    QmsMaterielEntryUpdateComponent,
    QmsMaterielEntryDeletePopupComponent,
    QmsMaterielEntryDeleteDialogComponent,
    qmsMaterielEntryRoute,
    qmsMaterielEntryPopupRoute
} from './';

const ENTITY_STATES = [...qmsMaterielEntryRoute, ...qmsMaterielEntryPopupRoute];

@NgModule({
    imports: [FccSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        QmsMaterielEntryComponent,
        QmsMaterielEntryDetailComponent,
        QmsMaterielEntryUpdateComponent,
        QmsMaterielEntryDeleteDialogComponent,
        QmsMaterielEntryDeletePopupComponent
    ],
    entryComponents: [
        QmsMaterielEntryComponent,
        QmsMaterielEntryUpdateComponent,
        QmsMaterielEntryDeleteDialogComponent,
        QmsMaterielEntryDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class FccQmsMaterielEntryModule {}
