import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import {TableModule} from 'primeng/table';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';
import { PaginatorModule } from 'primeng/paginator';
import { FccSharedModule } from 'app/shared';
import {ButtonModule} from 'primeng/button';
import {PasswordModule} from 'primeng/password';
import {GrowlModule} from 'primeng/growl';
import {DropdownModule} from 'primeng/dropdown';

import {
    RbacUserComponent,
    RbacUserDetailComponent,
    RbacUserUpdateComponent,
    RbacUserDeletePopupComponent,
    RbacUserDeleteDialogComponent,
    rbacUserRoute,
    rbacUserPopupRoute
} from './';

const ENTITY_STATES = [...rbacUserRoute, ...rbacUserPopupRoute];

@NgModule({
    imports: [FccSharedModule, RouterModule.forChild(ENTITY_STATES),
        TableModule, ButtonModule, PaginatorModule, PasswordModule, GrowlModule, DropdownModule],
    declarations: [
        RbacUserComponent,
        RbacUserDetailComponent,
        RbacUserUpdateComponent,
        RbacUserDeleteDialogComponent,
        RbacUserDeletePopupComponent,
    ],
    entryComponents: [RbacUserComponent, RbacUserUpdateComponent, RbacUserDeleteDialogComponent, RbacUserDeletePopupComponent],
    providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class FccRbacUserModule {

    constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
        this.languageHelper.language.subscribe((languageKey: string) => {
            if (languageKey !== undefined) {
                this.languageService.changeLanguage(languageKey);
            }
        });
    }

}
