import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { FccSharedModule } from 'app/shared';
import {
    QmsBomTechnologyComponent,
    QmsBomTechnologyDetailComponent,
    QmsBomTechnologyUpdateComponent,
    QmsBomTechnologyDeletePopupComponent,
    QmsBomTechnologyDeleteDialogComponent,
    qmsBomTechnologyRoute,
    qmsBomTechnologyPopupRoute
} from './';

const ENTITY_STATES = [...qmsBomTechnologyRoute, ...qmsBomTechnologyPopupRoute];

@NgModule({
    imports: [FccSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        QmsBomTechnologyComponent,
        QmsBomTechnologyDetailComponent,
        QmsBomTechnologyUpdateComponent,
        QmsBomTechnologyDeleteDialogComponent,
        QmsBomTechnologyDeletePopupComponent
    ],
    entryComponents: [
        QmsBomTechnologyComponent,
        QmsBomTechnologyUpdateComponent,
        QmsBomTechnologyDeleteDialogComponent,
        QmsBomTechnologyDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class FccQmsBomTechnologyModule {}
