import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { FccSharedModule } from 'app/shared';
import {
    QmsNrvTelationComponent,
    QmsNrvTelationDetailComponent,
    QmsNrvTelationUpdateComponent,
    QmsNrvTelationDeletePopupComponent,
    QmsNrvTelationDeleteDialogComponent,
    qmsNrvTelationRoute,
    qmsNrvTelationPopupRoute
} from './';

const ENTITY_STATES = [...qmsNrvTelationRoute, ...qmsNrvTelationPopupRoute];

@NgModule({
    imports: [FccSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        QmsNrvTelationComponent,
        QmsNrvTelationDetailComponent,
        QmsNrvTelationUpdateComponent,
        QmsNrvTelationDeleteDialogComponent,
        QmsNrvTelationDeletePopupComponent
    ],
    entryComponents: [
        QmsNrvTelationComponent,
        QmsNrvTelationUpdateComponent,
        QmsNrvTelationDeleteDialogComponent,
        QmsNrvTelationDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class FccQmsNrvTelationModule {}
