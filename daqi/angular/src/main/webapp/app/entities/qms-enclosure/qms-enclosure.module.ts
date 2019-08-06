import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { FccSharedModule } from 'app/shared';
import {
    QmsEnclosureComponent,
    QmsEnclosureDetailComponent,
    QmsEnclosureUpdateComponent,
    QmsEnclosureDeletePopupComponent,
    QmsEnclosureDeleteDialogComponent,
    qmsEnclosureRoute,
    qmsEnclosurePopupRoute
} from './';

const ENTITY_STATES = [...qmsEnclosureRoute, ...qmsEnclosurePopupRoute];

@NgModule({
    imports: [FccSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        QmsEnclosureComponent,
        QmsEnclosureDetailComponent,
        QmsEnclosureUpdateComponent,
        QmsEnclosureDeleteDialogComponent,
        QmsEnclosureDeletePopupComponent
    ],
    entryComponents: [
        QmsEnclosureComponent,
        QmsEnclosureUpdateComponent,
        QmsEnclosureDeleteDialogComponent,
        QmsEnclosureDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class FccQmsEnclosureModule {}
