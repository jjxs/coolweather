import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { FccSharedModule } from 'app/shared';
import {
    QmsSupplierClassComponent,
    QmsSupplierClassDetailComponent,
    QmsSupplierClassUpdateComponent,
    QmsSupplierClassDeletePopupComponent,
    QmsSupplierClassDeleteDialogComponent,
    qmsSupplierClassRoute,
    qmsSupplierClassPopupRoute
} from './';

const ENTITY_STATES = [...qmsSupplierClassRoute, ...qmsSupplierClassPopupRoute];

@NgModule({
    imports: [FccSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        QmsSupplierClassComponent,
        QmsSupplierClassDetailComponent,
        QmsSupplierClassUpdateComponent,
        QmsSupplierClassDeleteDialogComponent,
        QmsSupplierClassDeletePopupComponent
    ],
    entryComponents: [
        QmsSupplierClassComponent,
        QmsSupplierClassUpdateComponent,
        QmsSupplierClassDeleteDialogComponent,
        QmsSupplierClassDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class FccQmsSupplierClassModule {}
