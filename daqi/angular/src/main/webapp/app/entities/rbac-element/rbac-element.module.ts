import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { FccSharedModule } from 'app/shared';
import {
    RbacElementComponent,
    RbacElementDetailComponent,
    RbacElementUpdateComponent,
    RbacElementDeletePopupComponent,
    RbacElementDeleteDialogComponent,
    rbacElementRoute,
    rbacElementPopupRoute
} from './';

const ENTITY_STATES = [...rbacElementRoute, ...rbacElementPopupRoute];

@NgModule({
    imports: [FccSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        RbacElementComponent,
        RbacElementDetailComponent,
        RbacElementUpdateComponent,
        RbacElementDeleteDialogComponent,
        RbacElementDeletePopupComponent
    ],
    entryComponents: [RbacElementComponent, RbacElementUpdateComponent, RbacElementDeleteDialogComponent, RbacElementDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class FccRbacElementModule {}
