import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { FccSharedModule } from 'app/shared';
import { TableModule } from 'primeng/table';
import { GrowlModule } from 'primeng/growl';
import { ButtonModule } from 'primeng/button';
import {
    EntryControlDetailsInfoComponent,
    EntryControlDetailsDetailInfoComponent,
    EntryControlDetailsInfoUpdateComponent,
    EntryControlDetailsInfoDeletePopupComponent,
    EntryControlDetailsInfoDeleteDialogComponent,
    entryControlDetailsInfoRoute,
    entryControlDetailsInfoPopupRoute
} from './';

const ENTITY_STATES = [...entryControlDetailsInfoRoute, ...entryControlDetailsInfoPopupRoute];

@NgModule({
    imports: [FccSharedModule, TableModule, GrowlModule, ButtonModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        EntryControlDetailsInfoComponent,
        EntryControlDetailsDetailInfoComponent,
        EntryControlDetailsInfoUpdateComponent,
        EntryControlDetailsInfoDeleteDialogComponent,
        EntryControlDetailsInfoDeletePopupComponent
    ],
    entryComponents: [
        EntryControlDetailsInfoComponent,
        EntryControlDetailsInfoUpdateComponent,
        EntryControlDetailsInfoDeleteDialogComponent,
        EntryControlDetailsInfoDeletePopupComponent
    ],
    providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class FccEntryControlDetailsInfoModule {
    constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
        this.languageHelper.language.subscribe((languageKey: string) => {
            if (languageKey !== undefined) {
                this.languageService.changeLanguage(languageKey);
            }
        });
    }
}
