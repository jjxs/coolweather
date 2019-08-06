import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TableModule } from 'primeng/table';
import { FccSharedModule } from 'app/shared';
import { GrowlModule } from 'primeng/growl';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';
import {
    QmsProductComponent,
    QmsProductDetailComponent,
    QmsProductUpdateComponent,
    QmsProductDeletePopupComponent,
    QmsProductDeleteDialogComponent,
    qmsProductRoute,
    qmsProductPopupRoute
} from './';

const ENTITY_STATES = [...qmsProductRoute, ...qmsProductPopupRoute];

@NgModule({
    imports: [FccSharedModule,TableModule,GrowlModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        QmsProductComponent,
        QmsProductDetailComponent,
        QmsProductUpdateComponent,
        QmsProductDeleteDialogComponent,
        QmsProductDeletePopupComponent
    ],
    entryComponents: [QmsProductComponent, QmsProductUpdateComponent, QmsProductDeleteDialogComponent, QmsProductDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
})
export class FccQmsProductModule {
    constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
        this.languageHelper.language.subscribe((languageKey: string) => {
            if (languageKey !== undefined) {
                this.languageService.changeLanguage(languageKey);
            }
        });
    }
}
