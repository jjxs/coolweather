import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TableModule } from 'primeng/table';
import { FccSharedModule } from 'app/shared';
import { GrowlModule } from 'primeng/growl';
import { QmsSupplierClassComponent} from 'app/popup/supplierClassSelection/qms-supplier-class.component';
import { ButtonModule } from 'primeng/button';
import { PanelModule } from 'primeng/panel';
import {
    QmsSupplierComponent,
    QmsSupplierDetailComponent,
    QmsSupplierUpdateComponent,
    QmsSupplierDeletePopupComponent,
    QmsSupplierDeleteDialogComponent,
    qmsSupplierRoute,
    qmsSupplierPopupRoute,
    
} from './';

const ENTITY_STATES = [...qmsSupplierRoute, ...qmsSupplierPopupRoute];

@NgModule({
    imports: [FccSharedModule, TableModule,GrowlModule,ButtonModule,PanelModule,RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        QmsSupplierComponent,
        QmsSupplierDetailComponent,
        QmsSupplierUpdateComponent,
        QmsSupplierDeleteDialogComponent,
        QmsSupplierDeletePopupComponent,
        QmsSupplierClassComponent
    ],
    entryComponents: [QmsSupplierComponent, QmsSupplierUpdateComponent, QmsSupplierClassComponent,QmsSupplierDeleteDialogComponent, QmsSupplierDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class FccQmsSupplierModule {}
