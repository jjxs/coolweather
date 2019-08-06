import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { FccSharedModule } from 'app/shared';
import {
    QmsProcessRouteComponent,
    QmsProcessRouteDetailComponent,
    QmsProcessRouteUpdateComponent,
    QmsProcessRouteDeletePopupComponent,
    QmsProcessRouteDeleteDialogComponent,
    qmsProcessRouteRoute,
    qmsProcessRoutePopupRoute
} from './';

const ENTITY_STATES = [...qmsProcessRouteRoute, ...qmsProcessRoutePopupRoute];

@NgModule({
    imports: [FccSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        QmsProcessRouteComponent,
        QmsProcessRouteDetailComponent,
        QmsProcessRouteUpdateComponent,
        QmsProcessRouteDeleteDialogComponent,
        QmsProcessRouteDeletePopupComponent
    ],
    entryComponents: [
        QmsProcessRouteComponent,
        QmsProcessRouteUpdateComponent,
        QmsProcessRouteDeleteDialogComponent,
        QmsProcessRouteDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class FccQmsProcessRouteModule {}
