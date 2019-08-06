import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { FccSharedModule } from 'app/shared';
import {
    QmsUnqualifiedProductDetailsComponent,
    QmsUnqualifiedProductDetailsDetailComponent,
    QmsUnqualifiedProductDetailsUpdateComponent,
    QmsUnqualifiedProductDetailsDeletePopupComponent,
    QmsUnqualifiedProductDetailsDeleteDialogComponent,
    qmsUnqualifiedProductDetailsRoute,
    qmsUnqualifiedProductDetailsPopupRoute
} from './';

const ENTITY_STATES = [...qmsUnqualifiedProductDetailsRoute, ...qmsUnqualifiedProductDetailsPopupRoute];

@NgModule({
    imports: [FccSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        QmsUnqualifiedProductDetailsComponent,
        QmsUnqualifiedProductDetailsDetailComponent,
        QmsUnqualifiedProductDetailsUpdateComponent,
        QmsUnqualifiedProductDetailsDeleteDialogComponent,
        QmsUnqualifiedProductDetailsDeletePopupComponent
    ],
    entryComponents: [
        QmsUnqualifiedProductDetailsComponent,
        QmsUnqualifiedProductDetailsUpdateComponent,
        QmsUnqualifiedProductDetailsDeleteDialogComponent,
        QmsUnqualifiedProductDetailsDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class FccQmsUnqualifiedProductDetailsModule {}
