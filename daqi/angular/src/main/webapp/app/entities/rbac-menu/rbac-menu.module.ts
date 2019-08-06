import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { FccSharedModule } from 'app/shared';
import {
    RbacMenuComponent,
    RbacMenuDetailComponent,
    RbacMenuUpdateComponent,
    RbacMenuDeletePopupComponent,
    RbacMenuDeleteDialogComponent,
    rbacMenuRoute,
    rbacMenuPopupRoute
} from './';

const ENTITY_STATES = [...rbacMenuRoute, ...rbacMenuPopupRoute];

@NgModule({
    imports: [FccSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        RbacMenuComponent,
        RbacMenuDetailComponent,
        RbacMenuUpdateComponent,
        RbacMenuDeleteDialogComponent,
        RbacMenuDeletePopupComponent
    ],
    entryComponents: [RbacMenuComponent, RbacMenuUpdateComponent, RbacMenuDeleteDialogComponent, RbacMenuDeletePopupComponent],
    providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class FccRbacMenuModule {
    constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
        this.languageHelper.language.subscribe((languageKey: string) => {
            if (languageKey !== undefined) {
                this.languageService.changeLanguage(languageKey);
            }
        });
    }
}
