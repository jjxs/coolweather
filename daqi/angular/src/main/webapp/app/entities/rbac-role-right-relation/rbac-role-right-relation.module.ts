import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { FccSharedModule } from 'app/shared';
import {
    RbacRoleRightRelationComponent,
    RbacRoleRightRelationDetailComponent,
    RbacRoleRightRelationUpdateComponent,
    RbacRoleRightRelationDeletePopupComponent,
    RbacRoleRightRelationDeleteDialogComponent,
    rbacRoleRightRelationRoute,
    rbacRoleRightRelationPopupRoute
} from './';

const ENTITY_STATES = [...rbacRoleRightRelationRoute, ...rbacRoleRightRelationPopupRoute];

@NgModule({
    imports: [FccSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        RbacRoleRightRelationComponent,
        RbacRoleRightRelationDetailComponent,
        RbacRoleRightRelationUpdateComponent,
        RbacRoleRightRelationDeleteDialogComponent,
        RbacRoleRightRelationDeletePopupComponent
    ],
    entryComponents: [
        RbacRoleRightRelationComponent,
        RbacRoleRightRelationUpdateComponent,
        RbacRoleRightRelationDeleteDialogComponent,
        RbacRoleRightRelationDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class FccRbacRoleRightRelationModule {}
