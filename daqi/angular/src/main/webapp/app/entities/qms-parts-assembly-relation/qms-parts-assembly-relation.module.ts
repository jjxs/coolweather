import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { FccSharedModule } from 'app/shared';
import {
    QmsPartsAssemblyRelationComponent,
    QmsPartsAssemblyRelationDetailComponent,
    QmsPartsAssemblyRelationUpdateComponent,
    QmsPartsAssemblyRelationDeletePopupComponent,
    QmsPartsAssemblyRelationDeleteDialogComponent,
    qmsPartsAssemblyRelationRoute,
    qmsPartsAssemblyRelationPopupRoute
} from './';

const ENTITY_STATES = [...qmsPartsAssemblyRelationRoute, ...qmsPartsAssemblyRelationPopupRoute];

@NgModule({
    imports: [FccSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        QmsPartsAssemblyRelationComponent,
        QmsPartsAssemblyRelationDetailComponent,
        QmsPartsAssemblyRelationUpdateComponent,
        QmsPartsAssemblyRelationDeleteDialogComponent,
        QmsPartsAssemblyRelationDeletePopupComponent
    ],
    entryComponents: [
        QmsPartsAssemblyRelationComponent,
        QmsPartsAssemblyRelationUpdateComponent,
        QmsPartsAssemblyRelationDeleteDialogComponent,
        QmsPartsAssemblyRelationDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class FccQmsPartsAssemblyRelationModule {}
