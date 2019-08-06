import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { FccSharedModule } from 'app/shared';
import {
    QmsBogiepressureTonTestComponent,
    QmsBogiepressureTonTestDetailComponent,
    QmsBogiepressureTonTestUpdateComponent,
    QmsBogiepressureTonTestDeletePopupComponent,
    QmsBogiepressureTonTestDeleteDialogComponent,
    qmsBogiepressureTonTestRoute,
    qmsBogiepressureTonTestPopupRoute
} from './';

const ENTITY_STATES = [...qmsBogiepressureTonTestRoute, ...qmsBogiepressureTonTestPopupRoute];

@NgModule({
    imports: [FccSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        QmsBogiepressureTonTestComponent,
        QmsBogiepressureTonTestDetailComponent,
        QmsBogiepressureTonTestUpdateComponent,
        QmsBogiepressureTonTestDeleteDialogComponent,
        QmsBogiepressureTonTestDeletePopupComponent
    ],
    entryComponents: [
        QmsBogiepressureTonTestComponent,
        QmsBogiepressureTonTestUpdateComponent,
        QmsBogiepressureTonTestDeleteDialogComponent,
        QmsBogiepressureTonTestDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class FccQmsBogiepressureTonTestModule {}
