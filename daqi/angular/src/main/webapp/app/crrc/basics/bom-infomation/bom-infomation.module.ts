import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';
import { FccSharedModule } from 'app/shared';
import { TreeTableModule } from 'primeng/treetable';
import { GrowlModule } from 'primeng/growl';
import { DropdownModule } from 'primeng/dropdown';
import { ToastModule } from 'primeng/toast';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

import {
    BomInformationComponent,
    bomInformationRoute
} from './';

// const ENTITY_STATES = [...bomInformationRoute, ...bomInformationRoute];

@NgModule({
    imports: [FccSharedModule, TreeTableModule, ToastModule, GrowlModule, DropdownModule, ProgressSpinnerModule, RouterModule.forChild(bomInformationRoute)],
    declarations: [
        BomInformationComponent
    ],
    entryComponents: [
        BomInformationComponent
    ],
    providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class FccBomInformationModule {
    constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
        this.languageHelper.language.subscribe((languageKey: string) => {
            if (languageKey !== undefined) {
                this.languageService.changeLanguage(languageKey);
            }
        });
    }
}
