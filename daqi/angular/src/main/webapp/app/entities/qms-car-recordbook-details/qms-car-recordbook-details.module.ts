import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { FccSharedModule } from 'app/shared';
import {
    QmsCarRecordbookDetailsComponent,
    QmsCarRecordbookDetailsDetailComponent,
    QmsCarRecordbookDetailsUpdateComponent,
    QmsCarRecordbookDetailsDeletePopupComponent,
    QmsCarRecordbookDetailsDeleteDialogComponent,
    qmsCarRecordbookDetailsRoute,
    qmsCarRecordbookDetailsPopupRoute
} from './';

const ENTITY_STATES = [...qmsCarRecordbookDetailsRoute, ...qmsCarRecordbookDetailsPopupRoute];

@NgModule({
    imports: [FccSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        QmsCarRecordbookDetailsComponent,
        QmsCarRecordbookDetailsDetailComponent,
        QmsCarRecordbookDetailsUpdateComponent,
        QmsCarRecordbookDetailsDeleteDialogComponent,
        QmsCarRecordbookDetailsDeletePopupComponent
    ],
    entryComponents: [
        QmsCarRecordbookDetailsComponent,
        QmsCarRecordbookDetailsUpdateComponent,
        QmsCarRecordbookDetailsDeleteDialogComponent,
        QmsCarRecordbookDetailsDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class FccQmsCarRecordbookDetailsModule {}
