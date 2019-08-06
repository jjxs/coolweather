import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { FccSharedModule } from 'app/shared';
import {
    QmsMaterielSupplierComponent,
    QmsMaterielSupplierDetailComponent,
    QmsMaterielSupplierUpdateComponent,
    QmsMaterielSupplierDeletePopupComponent,
    QmsMaterielSupplierDeleteDialogComponent,
    qmsMaterielSupplierRoute,
    qmsMaterielSupplierPopupRoute
} from './';

const ENTITY_STATES = [...qmsMaterielSupplierRoute, ...qmsMaterielSupplierPopupRoute];

@NgModule({
    imports: [FccSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        QmsMaterielSupplierComponent,
        QmsMaterielSupplierDetailComponent,
        QmsMaterielSupplierUpdateComponent,
        QmsMaterielSupplierDeleteDialogComponent,
        QmsMaterielSupplierDeletePopupComponent
    ],
    entryComponents: [
        QmsMaterielSupplierComponent,
        QmsMaterielSupplierUpdateComponent,
        QmsMaterielSupplierDeleteDialogComponent,
        QmsMaterielSupplierDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class FccQmsMaterielSupplierModule {}
