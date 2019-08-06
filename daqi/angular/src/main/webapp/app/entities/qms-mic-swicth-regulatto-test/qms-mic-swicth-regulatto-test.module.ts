import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { FccSharedModule } from 'app/shared';
import {
    QmsMicSwicthRegulattoTestComponent,
    QmsMicSwicthRegulattoTestDetailComponent,
    QmsMicSwicthRegulattoTestUpdateComponent,
    QmsMicSwicthRegulattoTestDeletePopupComponent,
    QmsMicSwicthRegulattoTestDeleteDialogComponent,
    qmsMicSwicthRegulattoTestRoute,
    qmsMicSwicthRegulattoTestPopupRoute
} from './';

const ENTITY_STATES = [...qmsMicSwicthRegulattoTestRoute, ...qmsMicSwicthRegulattoTestPopupRoute];

@NgModule({
    imports: [FccSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        QmsMicSwicthRegulattoTestComponent,
        QmsMicSwicthRegulattoTestDetailComponent,
        QmsMicSwicthRegulattoTestUpdateComponent,
        QmsMicSwicthRegulattoTestDeleteDialogComponent,
        QmsMicSwicthRegulattoTestDeletePopupComponent
    ],
    entryComponents: [
        QmsMicSwicthRegulattoTestComponent,
        QmsMicSwicthRegulattoTestUpdateComponent,
        QmsMicSwicthRegulattoTestDeleteDialogComponent,
        QmsMicSwicthRegulattoTestDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class FccQmsMicSwicthRegulattoTestModule {}
