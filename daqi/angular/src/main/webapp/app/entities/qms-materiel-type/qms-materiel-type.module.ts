import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { FccSharedModule } from 'app/shared';
import {
    QmsMaterielTypeComponent,
    QmsMaterielTypeDetailComponent,
    QmsMaterielTypeUpdateComponent,
    QmsMaterielTypeDeletePopupComponent,
    QmsMaterielTypeDeleteDialogComponent,
    qmsMaterielTypeRoute,
    qmsMaterielTypePopupRoute
} from './';

const ENTITY_STATES = [...qmsMaterielTypeRoute, ...qmsMaterielTypePopupRoute];

@NgModule({
    imports: [FccSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        QmsMaterielTypeComponent,
        QmsMaterielTypeDetailComponent,
        QmsMaterielTypeUpdateComponent,
        QmsMaterielTypeDeleteDialogComponent,
        QmsMaterielTypeDeletePopupComponent
    ],
    entryComponents: [
        QmsMaterielTypeComponent,
        QmsMaterielTypeUpdateComponent,
        QmsMaterielTypeDeleteDialogComponent,
        QmsMaterielTypeDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class FccQmsMaterielTypeModule {}
