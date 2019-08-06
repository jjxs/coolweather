import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { FccSharedModule } from 'app/shared';
import {
    QmsCarRecordbookMainComponent,
    QmsCarRecordbookMainDetailComponent,
    QmsCarRecordbookMainUpdateComponent,
    QmsCarRecordbookMainDeletePopupComponent,
    QmsCarRecordbookMainDeleteDialogComponent,
    qmsCarRecordbookMainRoute,
    qmsCarRecordbookMainPopupRoute
} from './';

const ENTITY_STATES = [...qmsCarRecordbookMainRoute, ...qmsCarRecordbookMainPopupRoute];

@NgModule({
    imports: [FccSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        QmsCarRecordbookMainComponent,
        QmsCarRecordbookMainDetailComponent,
        QmsCarRecordbookMainUpdateComponent,
        QmsCarRecordbookMainDeleteDialogComponent,
        QmsCarRecordbookMainDeletePopupComponent
    ],
    entryComponents: [
        QmsCarRecordbookMainComponent,
        QmsCarRecordbookMainUpdateComponent,
        QmsCarRecordbookMainDeleteDialogComponent,
        QmsCarRecordbookMainDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class FccQmsCarRecordbookMainModule {}
