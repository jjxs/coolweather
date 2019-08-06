import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { FccSharedModule } from 'app/shared';
import {
    QmsProductComponent,
    QmsProductDetailComponent,
    QmsProductUpdateComponent,
    QmsProductDeletePopupComponent,
    QmsProductDeleteDialogComponent,
    qmsProductRoute,
    qmsProductPopupRoute
} from './';

const ENTITY_STATES = [...qmsProductRoute, ...qmsProductPopupRoute];

@NgModule({
    imports: [FccSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        QmsProductComponent,
        QmsProductDetailComponent,
        QmsProductUpdateComponent,
        QmsProductDeleteDialogComponent,
        QmsProductDeletePopupComponent
    ],
    entryComponents: [QmsProductComponent, QmsProductUpdateComponent, QmsProductDeleteDialogComponent, QmsProductDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class FccQmsProductModule {}
