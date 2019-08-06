import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { FccSharedModule } from 'app/shared';
import {
    QmsUnqualifiedProductComponent,
    QmsUnqualifiedProductDetailComponent,
    QmsUnqualifiedProductUpdateComponent,
    QmsUnqualifiedProductDeletePopupComponent,
    QmsUnqualifiedProductDeleteDialogComponent,
    qmsUnqualifiedProductRoute,
    qmsUnqualifiedProductPopupRoute
} from './';

const ENTITY_STATES = [...qmsUnqualifiedProductRoute, ...qmsUnqualifiedProductPopupRoute];

@NgModule({
    imports: [FccSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        QmsUnqualifiedProductComponent,
        QmsUnqualifiedProductDetailComponent,
        QmsUnqualifiedProductUpdateComponent,
        QmsUnqualifiedProductDeleteDialogComponent,
        QmsUnqualifiedProductDeletePopupComponent
    ],
    entryComponents: [
        QmsUnqualifiedProductComponent,
        QmsUnqualifiedProductUpdateComponent,
        QmsUnqualifiedProductDeleteDialogComponent,
        QmsUnqualifiedProductDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class FccQmsUnqualifiedProductModule {}
