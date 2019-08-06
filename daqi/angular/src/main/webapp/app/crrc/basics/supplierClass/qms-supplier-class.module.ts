import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TableModule } from 'primeng/table';
import { FccSharedModule } from 'app/shared';
import { GrowlModule } from 'primeng/growl';
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
    imports: [FccSharedModule, TableModule,GrowlModule,RouterModule.forChild(ENTITY_STATES)],
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
