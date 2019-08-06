import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { FccSharedModule } from 'app/shared';
import {
    QmsBomComponent,
    QmsBomDetailComponent,
    QmsBomUpdateComponent,
    QmsBomDeletePopupComponent,
    QmsBomDeleteDialogComponent,
    qmsBomRoute,
    qmsBomPopupRoute
} from './';

const ENTITY_STATES = [...qmsBomRoute, ...qmsBomPopupRoute];

@NgModule({
    imports: [FccSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [QmsBomComponent, QmsBomDetailComponent, QmsBomUpdateComponent, QmsBomDeleteDialogComponent, QmsBomDeletePopupComponent],
    entryComponents: [QmsBomComponent, QmsBomUpdateComponent, QmsBomDeleteDialogComponent, QmsBomDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class FccQmsBomModule {}
