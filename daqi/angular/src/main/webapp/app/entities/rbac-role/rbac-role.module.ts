import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import {TableModule} from 'primeng/table';
import { PaginatorModule } from 'primeng/paginator';
import {ButtonModule} from 'primeng/button';
import {GrowlModule} from 'primeng/growl';
import {DropdownModule} from 'primeng/dropdown';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';
import {TreeModule} from 'primeng/tree';
import {ListboxModule} from 'primeng/listbox';
import { FccSharedModule } from 'app/shared';
import {
    RbacRoleComponent,
    RbacRoleDetailComponent,
    RbacRoleUpdateComponent,
    RbacRoleDeletePopupComponent,
    RbacRoleDeleteDialogComponent,
    rbacRoleRoute,
    rbacRolePopupRoute
} from './';

const ENTITY_STATES = [...rbacRoleRoute, ...rbacRolePopupRoute];

@NgModule({
    imports: [FccSharedModule, RouterModule.forChild(ENTITY_STATES), TableModule,
        PaginatorModule, ButtonModule, GrowlModule, DropdownModule, ListboxModule,
        TreeModule],
    declarations: [
        RbacRoleComponent,
        RbacRoleDetailComponent,
        RbacRoleUpdateComponent,
        RbacRoleDeleteDialogComponent,
        RbacRoleDeletePopupComponent
    ],
    providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
    entryComponents: [RbacRoleComponent, RbacRoleUpdateComponent, RbacRoleDeleteDialogComponent, RbacRoleDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class FccRbacRoleModule {
    constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
        this.languageHelper.language.subscribe((languageKey: string) => {
            if (languageKey !== undefined) {
                this.languageService.changeLanguage(languageKey);
            }
        });
    }
}
