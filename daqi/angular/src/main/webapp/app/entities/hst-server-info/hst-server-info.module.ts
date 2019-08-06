import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { FccSharedModule } from 'app/shared';
import {
    HstServerInfoComponent,
    HstServerInfoDetailComponent,
    HstServerInfoUpdateComponent,
    HstServerInfoDeletePopupComponent,
    HstServerInfoDeleteDialogComponent,
    hstServerInfoRoute,
    hstServerInfoPopupRoute
} from './';

const ENTITY_STATES = [...hstServerInfoRoute, ...hstServerInfoPopupRoute];

@NgModule({
    imports: [FccSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        HstServerInfoComponent,
        HstServerInfoDetailComponent,
        HstServerInfoUpdateComponent,
        HstServerInfoDeleteDialogComponent,
        HstServerInfoDeletePopupComponent
    ],
    entryComponents: [
        HstServerInfoComponent,
        HstServerInfoUpdateComponent,
        HstServerInfoDeleteDialogComponent,
        HstServerInfoDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class FccHstServerInfoModule {}
