import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { FccSharedModule } from 'app/shared';
import {
    QmsMaterielDetailsComponent,
    QmsMaterielDetailsDetailComponent,
    QmsMaterielDetailsUpdateComponent,
    QmsMaterielDetailsDeletePopupComponent,
    QmsMaterielDetailsDeleteDialogComponent,
    qmsMaterielDetailsRoute,
    qmsMaterielDetailsPopupRoute
} from './';

const ENTITY_STATES = [...qmsMaterielDetailsRoute, ...qmsMaterielDetailsPopupRoute];

@NgModule({
    imports: [FccSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        QmsMaterielDetailsComponent,
        QmsMaterielDetailsDetailComponent,
        QmsMaterielDetailsUpdateComponent,
        QmsMaterielDetailsDeleteDialogComponent,
        QmsMaterielDetailsDeletePopupComponent
    ],
    entryComponents: [
        QmsMaterielDetailsComponent,
        QmsMaterielDetailsUpdateComponent,
        QmsMaterielDetailsDeleteDialogComponent,
        QmsMaterielDetailsDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class FccQmsMaterielDetailsModule {}
