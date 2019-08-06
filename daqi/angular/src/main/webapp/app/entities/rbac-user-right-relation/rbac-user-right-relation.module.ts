import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { FccSharedModule } from 'app/shared';
import {
    RbacUserRightRelationComponent,
    RbacUserRightRelationDetailComponent,
    RbacUserRightRelationUpdateComponent,
    RbacUserRightRelationDeletePopupComponent,
    RbacUserRightRelationDeleteDialogComponent,
    rbacUserRightRelationRoute,
    rbacUserRightRelationPopupRoute
} from './';

const ENTITY_STATES = [...rbacUserRightRelationRoute, ...rbacUserRightRelationPopupRoute];

@NgModule({
    imports: [FccSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        RbacUserRightRelationComponent,
        RbacUserRightRelationDetailComponent,
        RbacUserRightRelationUpdateComponent,
        RbacUserRightRelationDeleteDialogComponent,
        RbacUserRightRelationDeletePopupComponent
    ],
    entryComponents: [
        RbacUserRightRelationComponent,
        RbacUserRightRelationUpdateComponent,
        RbacUserRightRelationDeleteDialogComponent,
        RbacUserRightRelationDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class FccRbacUserRightRelationModule {}
