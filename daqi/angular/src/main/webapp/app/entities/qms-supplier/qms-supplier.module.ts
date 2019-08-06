import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { FccSharedModule } from 'app/shared';
import {
    QmsSupplierComponent,
    QmsSupplierDetailComponent,
    QmsSupplierUpdateComponent,
    QmsSupplierDeletePopupComponent,
    QmsSupplierDeleteDialogComponent,
    qmsSupplierRoute,
    qmsSupplierPopupRoute
} from './';

const ENTITY_STATES = [...qmsSupplierRoute, ...qmsSupplierPopupRoute];

@NgModule({
    imports: [FccSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        QmsSupplierComponent,
        QmsSupplierDetailComponent,
        QmsSupplierUpdateComponent,
        QmsSupplierDeleteDialogComponent,
        QmsSupplierDeletePopupComponent
    ],
    entryComponents: [QmsSupplierComponent, QmsSupplierUpdateComponent, QmsSupplierDeleteDialogComponent, QmsSupplierDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class FccQmsSupplierModule {}
