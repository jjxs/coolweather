import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TableModule } from 'primeng/table';
import { FccSharedModule } from 'app/shared';
import { GrowlModule } from 'primeng/growl';
import {
    QmsProcessComponent,
    QmsProcessDetailComponent,
    QmsProcessUpdateComponent,
    QmsProcessDeletePopupComponent,
    QmsProcessDeleteDialogComponent,
    qmsProcessRoute,
    qmsProcessPopupRoute
} from './';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

const ENTITY_STATES = [...qmsProcessRoute, ...qmsProcessPopupRoute];

@NgModule({
    imports: [FccSharedModule, TableModule,GrowlModule,RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        QmsProcessComponent,
        QmsProcessDetailComponent,
        QmsProcessUpdateComponent,
        QmsProcessDeleteDialogComponent,
        QmsProcessDeletePopupComponent
    ],
    entryComponents: [QmsProcessComponent, QmsProcessUpdateComponent, QmsProcessDeleteDialogComponent, QmsProcessDeletePopupComponent],
    providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class FccQmsProcessModule {
    constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
        this.languageHelper.language.subscribe((languageKey: string) => {
            if (languageKey !== undefined) {
                this.languageService.changeLanguage(languageKey);
            }
        });
    }
}
