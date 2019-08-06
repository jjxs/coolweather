import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { FccSharedModule } from 'app/shared';
import {
    RbacMenuRightRelationComponent,
    RbacMenuRightRelationDetailComponent,
    RbacMenuRightRelationUpdateComponent,
    RbacMenuRightRelationDeletePopupComponent,
    RbacMenuRightRelationDeleteDialogComponent,
    rbacMenuRightRelationRoute,
    rbacMenuRightRelationPopupRoute
} from './';

const ENTITY_STATES = [...rbacMenuRightRelationRoute, ...rbacMenuRightRelationPopupRoute];

@NgModule({
    imports: [FccSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        RbacMenuRightRelationComponent,
        RbacMenuRightRelationDetailComponent,
        RbacMenuRightRelationUpdateComponent,
        RbacMenuRightRelationDeleteDialogComponent,
        RbacMenuRightRelationDeletePopupComponent
    ],
    entryComponents: [
        RbacMenuRightRelationComponent,
        RbacMenuRightRelationUpdateComponent,
        RbacMenuRightRelationDeleteDialogComponent,
        RbacMenuRightRelationDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class FccRbacMenuRightRelationModule {}
