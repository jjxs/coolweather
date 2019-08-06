import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';
import { FccSharedModule } from 'app/shared';
import { TreeTableModule } from 'primeng/treetable';
import { GrowlModule } from 'primeng/growl';
import { ToastModule } from 'primeng/toast';
import { CheckboxModule } from 'primeng/checkbox';
import {
    AdverseReactionInformationComponent,
    AdverseReactionInformationRoute
} from './';

// const ENTITY_STATES = [...AdverseReactionInformationRoute, ...AdverseReactionInformationRoute];

@NgModule({
    imports: [FccSharedModule, CheckboxModule, TreeTableModule, ToastModule, GrowlModule, RouterModule.forChild(AdverseReactionInformationRoute)],
    declarations: [
        AdverseReactionInformationComponent
    ],
    entryComponents: [
        AdverseReactionInformationComponent
    ],
    providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class FccAdverseReactionInformationModule {
    constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
        this.languageHelper.language.subscribe((languageKey: string) => {
            if (languageKey !== undefined) {
                this.languageService.changeLanguage(languageKey);
            }
        });
    }
}
