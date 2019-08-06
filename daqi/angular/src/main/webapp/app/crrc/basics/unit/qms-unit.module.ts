import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TableModule } from 'primeng/table';
import { FccSharedModule } from 'app/shared';
import { GrowlModule } from 'primeng/growl';
import {
    QmsUnitComponent,
    QmsUnitDetailComponent,
    QmsUnitUpdateComponent,
    QmsUnitDeletePopupComponent,
    QmsUnitDeleteDialogComponent,
    qmsUnitRoute,
    qmsUnitPopupRoute
} from './';

const ENTITY_STATES = [...qmsUnitRoute, ...qmsUnitPopupRoute];

@NgModule({
    imports: [FccSharedModule,TableModule,GrowlModule,RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        QmsUnitComponent,
        QmsUnitDetailComponent,
        QmsUnitUpdateComponent,
        QmsUnitDeleteDialogComponent,
        QmsUnitDeletePopupComponent
    ],
    entryComponents: [QmsUnitComponent, QmsUnitUpdateComponent, QmsUnitDeleteDialogComponent, QmsUnitDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class FccQmsUnitModule {}
