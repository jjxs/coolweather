import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { FccSharedModule } from 'app/shared';
import {
    QmsNoticeComponent,
    QmsNoticeDetailComponent,
    QmsNoticeUpdateComponent,
    QmsNoticeDeletePopupComponent,
    QmsNoticeDeleteDialogComponent,
    qmsNoticeRoute,
    qmsNoticePopupRoute
} from './';

const ENTITY_STATES = [...qmsNoticeRoute, ...qmsNoticePopupRoute];

@NgModule({
    imports: [FccSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        QmsNoticeComponent,
        QmsNoticeDetailComponent,
        QmsNoticeUpdateComponent,
        QmsNoticeDeleteDialogComponent,
        QmsNoticeDeletePopupComponent
    ],
    entryComponents: [QmsNoticeComponent, QmsNoticeUpdateComponent, QmsNoticeDeleteDialogComponent, QmsNoticeDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class FccQmsNoticeModule {}
