import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TableModule } from 'primeng/table';
import { FccSharedModule } from 'app/shared';
import {DropdownModule} from 'primeng/dropdown';
import { GrowlModule } from 'primeng/growl';
import {
    QmsControlDetailsComponent,
    QmsControlDetailsDetailComponent,
    QmsControlDetailsUpdateComponent,
    QmsControlDetailsDeletePopupComponent,
    QmsControlDetailsDeleteDialogComponent,
    qmsControlDetailsRoute,
    qmsControlDetailsPopupRoute
} from './';

const ENTITY_STATES = [...qmsControlDetailsRoute, ...qmsControlDetailsPopupRoute];

@NgModule({
    imports: [FccSharedModule, TableModule,DropdownModule,GrowlModule,RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        QmsControlDetailsComponent,
        QmsControlDetailsDetailComponent,
        QmsControlDetailsUpdateComponent,
        QmsControlDetailsDeleteDialogComponent,
        QmsControlDetailsDeletePopupComponent
    ],
    entryComponents: [
        QmsControlDetailsComponent,
        QmsControlDetailsUpdateComponent,
        QmsControlDetailsDeleteDialogComponent,
        QmsControlDetailsDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class FccQmsControlDetailsModule {}
