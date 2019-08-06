import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { FccSharedModule } from 'app/shared';
import {
    QmsApproveResultComponent,
    QmsApproveResultDetailComponent,
    QmsApproveResultUpdateComponent,
    QmsApproveResultDeletePopupComponent,
    QmsApproveResultDeleteDialogComponent,
    qmsApproveResultRoute,
    qmsApproveResultPopupRoute
} from './';

const ENTITY_STATES = [...qmsApproveResultRoute, ...qmsApproveResultPopupRoute];

@NgModule({
    imports: [FccSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        QmsApproveResultComponent,
        QmsApproveResultDetailComponent,
        QmsApproveResultUpdateComponent,
        QmsApproveResultDeleteDialogComponent,
        QmsApproveResultDeletePopupComponent
    ],
    entryComponents: [
        QmsApproveResultComponent,
        QmsApproveResultUpdateComponent,
        QmsApproveResultDeleteDialogComponent,
        QmsApproveResultDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class FccQmsApproveResultModule {}
