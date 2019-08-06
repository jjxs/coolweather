import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { FccSharedModule } from 'app/shared';
import {
    QmsDefectComponent,
    QmsDefectDetailComponent,
    QmsDefectUpdateComponent,
    QmsDefectDeletePopupComponent,
    QmsDefectDeleteDialogComponent,
    qmsDefectRoute,
    qmsDefectPopupRoute
} from './';

const ENTITY_STATES = [...qmsDefectRoute, ...qmsDefectPopupRoute];

@NgModule({
    imports: [FccSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        QmsDefectComponent,
        QmsDefectDetailComponent,
        QmsDefectUpdateComponent,
        QmsDefectDeleteDialogComponent,
        QmsDefectDeletePopupComponent
    ],
    entryComponents: [QmsDefectComponent, QmsDefectUpdateComponent, QmsDefectDeleteDialogComponent, QmsDefectDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class FccQmsDefectModule {}
