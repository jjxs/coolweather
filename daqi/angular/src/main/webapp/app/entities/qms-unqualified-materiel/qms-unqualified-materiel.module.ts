import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { FccSharedModule } from 'app/shared';
import {
    QmsUnqualifiedMaterielComponent,
    QmsUnqualifiedMaterielDetailComponent,
    QmsUnqualifiedMaterielUpdateComponent,
    QmsUnqualifiedMaterielDeletePopupComponent,
    QmsUnqualifiedMaterielDeleteDialogComponent,
    qmsUnqualifiedMaterielRoute,
    qmsUnqualifiedMaterielPopupRoute
} from './';

const ENTITY_STATES = [...qmsUnqualifiedMaterielRoute, ...qmsUnqualifiedMaterielPopupRoute];

@NgModule({
    imports: [FccSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        QmsUnqualifiedMaterielComponent,
        QmsUnqualifiedMaterielDetailComponent,
        QmsUnqualifiedMaterielUpdateComponent,
        QmsUnqualifiedMaterielDeleteDialogComponent,
        QmsUnqualifiedMaterielDeletePopupComponent
    ],
    entryComponents: [
        QmsUnqualifiedMaterielComponent,
        QmsUnqualifiedMaterielUpdateComponent,
        QmsUnqualifiedMaterielDeleteDialogComponent,
        QmsUnqualifiedMaterielDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class FccQmsUnqualifiedMaterielModule {}
