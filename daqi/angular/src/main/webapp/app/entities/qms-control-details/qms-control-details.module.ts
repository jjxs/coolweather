import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { FccSharedModule } from 'app/shared';
import {
    QmsControlDetailsComponent,
    QmsControlDetailsDetailComponent,
    QmsControlDetailsUpdateComponent,
    QmsControlDetailsDeletePopupComponent,
    QmsControlDetailsDeleteDialogComponent,
    qmsControlDetailsRoute,
    qmsControlDetailsPopupRoute
} from './';

const ENTITY_STATES = [...qmsControlDetailsRoute, ...qmsControlDetailsPopupRoute];

@NgModule({
    imports: [FccSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        QmsControlDetailsComponent,
        QmsControlDetailsDetailComponent,
        QmsControlDetailsUpdateComponent,
        QmsControlDetailsDeleteDialogComponent,
        QmsControlDetailsDeletePopupComponent
    ],
    entryComponents: [
        QmsControlDetailsComponent,
        QmsControlDetailsUpdateComponent,
        QmsControlDetailsDeleteDialogComponent,
        QmsControlDetailsDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class FccQmsControlDetailsModule {}
