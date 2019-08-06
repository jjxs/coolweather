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

import {
    QmsProductionInspectionSelfComponent,
    QmsProductionInspectionRoute,
    QmsProductionInspectionUpdateSelfComponent
} from './';

const ENTITY_STATES = [...QmsProductionInspectionRoute];

@NgModule({
    imports: [TabMenuModule, TabViewModule, CheckboxModule, RadioButtonModule, DropdownModule, TableModule, PanelModule, ButtonModule, GrowlModule, FccSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        QmsProductionInspectionSelfComponent,
        QmsProductionInspectionUpdateSelfComponent
    ],
    entryComponents: [
        QmsProductionInspectionSelfComponent,
        QmsProductionInspectionUpdateSelfComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
})
export class FccQmsProductionInspectionSelfModule {
    constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
        this.languageHelper.language.subscribe((languageKey: string) => {
            if (languageKey !== undefined) {
                this.languageService.changeLanguage(languageKey);
            }
        });
    }
}
