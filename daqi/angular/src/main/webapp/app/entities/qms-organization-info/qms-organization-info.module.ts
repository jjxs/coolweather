import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { FccSharedModule } from 'app/shared';
import {
    QmsOrganizationInfoComponent,
    QmsOrganizationInfoDetailComponent,
    QmsOrganizationInfoUpdateComponent,
    QmsOrganizationInfoDeletePopupComponent,
    QmsOrganizationInfoDeleteDialogComponent,
    qmsOrganizationInfoRoute,
    qmsOrganizationInfoPopupRoute
} from './';

const ENTITY_STATES = [...qmsOrganizationInfoRoute, ...qmsOrganizationInfoPopupRoute];

@NgModule({
    imports: [FccSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        QmsOrganizationInfoComponent,
        QmsOrganizationInfoDetailComponent,
        QmsOrganizationInfoUpdateComponent,
        QmsOrganizationInfoDeleteDialogComponent,
        QmsOrganizationInfoDeletePopupComponent
    ],
    entryComponents: [
        QmsOrganizationInfoComponent,
        QmsOrganizationInfoUpdateComponent,
        QmsOrganizationInfoDeleteDialogComponent,
        QmsOrganizationInfoDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class FccQmsOrganizationInfoModule {}
