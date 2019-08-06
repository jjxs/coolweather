import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { FccSharedModule } from 'app/shared';
import {
    QmsBogiepressurePositiveTestComponent,
    QmsBogiepressurePositiveTestDetailComponent,
    QmsBogiepressurePositiveTestUpdateComponent,
    QmsBogiepressurePositiveTestDeletePopupComponent,
    QmsBogiepressurePositiveTestDeleteDialogComponent,
    qmsBogiepressurePositiveTestRoute,
    qmsBogiepressurePositiveTestPopupRoute
} from './';

const ENTITY_STATES = [...qmsBogiepressurePositiveTestRoute, ...qmsBogiepressurePositiveTestPopupRoute];

@NgModule({
    imports: [FccSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        QmsBogiepressurePositiveTestComponent,
        QmsBogiepressurePositiveTestDetailComponent,
        QmsBogiepressurePositiveTestUpdateComponent,
        QmsBogiepressurePositiveTestDeleteDialogComponent,
        QmsBogiepressurePositiveTestDeletePopupComponent
    ],
    entryComponents: [
        QmsBogiepressurePositiveTestComponent,
        QmsBogiepressurePositiveTestUpdateComponent,
        QmsBogiepressurePositiveTestDeleteDialogComponent,
        QmsBogiepressurePositiveTestDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class FccQmsBogiepressurePositiveTestModule {}
