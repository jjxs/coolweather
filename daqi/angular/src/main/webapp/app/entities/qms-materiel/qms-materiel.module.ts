import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { FccSharedModule } from 'app/shared';
import {
    QmsMaterielComponent,
    QmsMaterielDetailComponent,
    QmsMaterielUpdateComponent,
    QmsMaterielDeletePopupComponent,
    QmsMaterielDeleteDialogComponent,
    qmsMaterielRoute,
    qmsMaterielPopupRoute
} from './';

const ENTITY_STATES = [...qmsMaterielRoute, ...qmsMaterielPopupRoute];

@NgModule({
    imports: [FccSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        QmsMaterielComponent,
        QmsMaterielDetailComponent,
        QmsMaterielUpdateComponent,
        QmsMaterielDeleteDialogComponent,
        QmsMaterielDeletePopupComponent
    ],
    entryComponents: [QmsMaterielComponent, QmsMaterielUpdateComponent, QmsMaterielDeleteDialogComponent, QmsMaterielDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class FccQmsMaterielModule {}
