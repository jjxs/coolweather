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
import { PanelModule } from 'primeng/panel';
import {
    RbacRightComponent,
    RbacRightDetailComponent,
    RbacRightUpdateComponent,
    RbacRightDeletePopupComponent,
    RbacRightDeleteDialogComponent,
    rbacRightRoute,
    rbacRightPopupRoute
} from './';

const ENTITY_STATES = [...rbacRightRoute, ...rbacRightPopupRoute];

@NgModule({
    imports: [FccSharedModule, RouterModule.forChild(ENTITY_STATES), TableModule, PaginatorModule,PanelModule,
        ButtonModule, GrowlModule, DropdownModule, TreeModule, ListboxModule],
    declarations: [
        RbacRightComponent,
        RbacRightDetailComponent,
        RbacRightUpdateComponent,
        RbacRightDeleteDialogComponent,
        RbacRightDeletePopupComponent
    ],
    providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
    entryComponents: [RbacRightComponent, RbacRightUpdateComponent, RbacRightDeleteDialogComponent, RbacRightDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class FccRbacRightModule {
    constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
        this.languageHelper.language.subscribe((languageKey: string) => {
            if (languageKey !== undefined) {
                this.languageService.changeLanguage(languageKey);
            }
        });
    }
}
