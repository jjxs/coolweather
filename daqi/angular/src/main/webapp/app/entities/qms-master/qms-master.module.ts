import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { FccSharedModule } from 'app/shared';
import {
    QmsMasterComponent,
    QmsMasterDetailComponent,
    QmsMasterUpdateComponent,
    QmsMasterDeletePopupComponent,
    QmsMasterDeleteDialogComponent,
    qmsMasterRoute,
    qmsMasterPopupRoute
} from './';

const ENTITY_STATES = [...qmsMasterRoute, ...qmsMasterPopupRoute];

@NgModule({
    imports: [FccSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        QmsMasterComponent,
        QmsMasterDetailComponent,
        QmsMasterUpdateComponent,
        QmsMasterDeleteDialogComponent,
        QmsMasterDeletePopupComponent
    ],
    entryComponents: [QmsMasterComponent, QmsMasterUpdateComponent, QmsMasterDeleteDialogComponent, QmsMasterDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class FccQmsMasterModule {}
