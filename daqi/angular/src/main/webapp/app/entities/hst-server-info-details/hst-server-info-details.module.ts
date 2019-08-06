import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { FccSharedModule } from 'app/shared';
import {
    HstServerInfoDetailsComponent,
    HstServerInfoDetailsDetailComponent,
    HstServerInfoDetailsUpdateComponent,
    HstServerInfoDetailsDeletePopupComponent,
    HstServerInfoDetailsDeleteDialogComponent,
    hstServerInfoDetailsRoute,
    hstServerInfoDetailsPopupRoute
} from './';

const ENTITY_STATES = [...hstServerInfoDetailsRoute, ...hstServerInfoDetailsPopupRoute];

@NgModule({
    imports: [FccSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        HstServerInfoDetailsComponent,
        HstServerInfoDetailsDetailComponent,
        HstServerInfoDetailsUpdateComponent,
        HstServerInfoDetailsDeleteDialogComponent,
        HstServerInfoDetailsDeletePopupComponent
    ],
    entryComponents: [
        HstServerInfoDetailsComponent,
        HstServerInfoDetailsUpdateComponent,
        HstServerInfoDetailsDeleteDialogComponent,
        HstServerInfoDetailsDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class FccHstServerInfoDetailsModule {}
