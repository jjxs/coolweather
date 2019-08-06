import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';
import { FccSharedModule } from 'app/shared';
import { TreeTableModule } from 'primeng/treetable';
import { GrowlModule } from 'primeng/growl';
import { ButtonModule } from 'primeng/button';
import { PanelModule } from 'primeng/panel';
import { CheckboxModule } from 'primeng/checkbox';
import { DropdownModule } from 'primeng/dropdown';
import { ToastModule } from 'primeng/toast';
import {
    OrganizationalInformationComponent,
    OrganizationalInformationRoute
} from './';

const ENTITY_STATES = [...OrganizationalInformationRoute];

@NgModule({
    imports: [FccSharedModule, GrowlModule, ToastModule, PanelModule, ButtonModule, CheckboxModule, DropdownModule, TreeTableModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        OrganizationalInformationComponent
    ],
    entryComponents: [
        OrganizationalInformationComponent
    ],
    providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class FccOrganizationalInformationModule {
    constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
        this.languageHelper.language.subscribe((languageKey: string) => {
            if (languageKey !== undefined) {
                this.languageService.changeLanguage(languageKey);
            }
        });
    }
}
