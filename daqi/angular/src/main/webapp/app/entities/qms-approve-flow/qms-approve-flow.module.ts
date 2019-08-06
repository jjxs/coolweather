import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { FccSharedModule } from 'app/shared';
import {
    QmsApproveFlowComponent,
    QmsApproveFlowDetailComponent,
    QmsApproveFlowUpdateComponent,
    QmsApproveFlowDeletePopupComponent,
    QmsApproveFlowDeleteDialogComponent,
    qmsApproveFlowRoute,
    qmsApproveFlowPopupRoute
} from './';

const ENTITY_STATES = [...qmsApproveFlowRoute, ...qmsApproveFlowPopupRoute];

@NgModule({
    imports: [FccSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        QmsApproveFlowComponent,
        QmsApproveFlowDetailComponent,
        QmsApproveFlowUpdateComponent,
        QmsApproveFlowDeleteDialogComponent,
        QmsApproveFlowDeletePopupComponent
    ],
    entryComponents: [
        QmsApproveFlowComponent,
        QmsApproveFlowUpdateComponent,
        QmsApproveFlowDeleteDialogComponent,
        QmsApproveFlowDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class FccQmsApproveFlowModule {}
