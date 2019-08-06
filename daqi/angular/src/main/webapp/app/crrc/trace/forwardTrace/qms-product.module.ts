import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { FccSharedModule } from 'app/shared';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';
import { TableModule } from 'primeng/table';
import { GrowlModule } from 'primeng/growl';
import { ButtonModule } from 'primeng/button';
import { PanelModule } from 'primeng/panel';
import { DropdownModule } from 'primeng/dropdown';
import { RadioButtonModule } from 'primeng/radiobutton';
import { CheckboxModule } from 'primeng/checkbox';
import { TabViewModule } from 'primeng/tabview';
import { TabMenuModule } from 'primeng/tabmenu';
import { ToastModule } from 'primeng/toast';
import {
    QmsProductComponent1,
    qmsProductRoute,
    qmsProductPopupRoute
} from './';

const ENTITY_STATES = [...qmsProductRoute, ...qmsProductPopupRoute];

@NgModule({
    imports: [ToastModule, TabMenuModule, TabViewModule, CheckboxModule, RadioButtonModule, DropdownModule, TableModule, PanelModule, ButtonModule, GrowlModule, FccSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        QmsProductComponent1,
    ],
    entryComponents: [QmsProductComponent1],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class FccQmsProductModule {}
