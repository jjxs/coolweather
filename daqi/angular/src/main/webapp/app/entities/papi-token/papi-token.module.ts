import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { FccSharedModule } from 'app/shared';
import {
    PapiTokenComponent,
    PapiTokenDetailComponent,
    PapiTokenUpdateComponent,
    PapiTokenDeletePopupComponent,
    PapiTokenDeleteDialogComponent,
    papiTokenRoute,
    papiTokenPopupRoute
} from './';

const ENTITY_STATES = [...papiTokenRoute, ...papiTokenPopupRoute];

@NgModule({
    imports: [FccSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        PapiTokenComponent,
        PapiTokenDetailComponent,
        PapiTokenUpdateComponent,
        PapiTokenDeleteDialogComponent,
        PapiTokenDeletePopupComponent
    ],
    entryComponents: [PapiTokenComponent, PapiTokenUpdateComponent, PapiTokenDeleteDialogComponent, PapiTokenDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class FccPapiTokenModule {}
