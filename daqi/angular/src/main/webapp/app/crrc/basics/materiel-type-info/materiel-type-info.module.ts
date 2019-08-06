import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';
import { TreeTableModule } from 'primeng/treetable';
import { GrowlModule } from 'primeng/growl';
import { FccSharedModule } from 'app/shared';
import { ToastModule } from 'primeng/toast';
import {
    MaterielTypeInfoComponent,
    MaterielTypeInfoRoute
} from './';

// const ENTITY_STATES = [...MaterielTypeInfoRoute, ...MaterielTypeInfoRoute];

@NgModule({
    imports: [FccSharedModule, TreeTableModule, ToastModule, GrowlModule, RouterModule.forChild(MaterielTypeInfoRoute)],
    declarations: [
        MaterielTypeInfoComponent
    ],
    entryComponents: [
        MaterielTypeInfoComponent
    ],
    providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class FccMaterielTypeInfoModule {
    constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
        this.languageHelper.language.subscribe((languageKey: string) => {
            if (languageKey !== undefined) {
                this.languageService.changeLanguage(languageKey);
            }
        });
    }
}
