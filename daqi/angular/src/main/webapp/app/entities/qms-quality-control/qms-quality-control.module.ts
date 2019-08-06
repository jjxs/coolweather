import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { FccSharedModule } from 'app/shared';
import {
    QmsQualityControlComponent,
    QmsQualityControlDetailComponent,
    QmsQualityControlUpdateComponent,
    QmsQualityControlDeletePopupComponent,
    QmsQualityControlDeleteDialogComponent,
    qmsQualityControlRoute,
    qmsQualityControlPopupRoute
} from './';
import {JhiLanguageHelper} from 'app/core';
import {JhiLanguageService} from 'ng-jhipster';

const ENTITY_STATES = [...qmsQualityControlRoute, ...qmsQualityControlPopupRoute];

@NgModule({
    imports: [FccSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        QmsQualityControlComponent,
        QmsQualityControlDetailComponent,
        QmsQualityControlUpdateComponent,
        QmsQualityControlDeleteDialogComponent,
        QmsQualityControlDeletePopupComponent
    ],
    entryComponents: [
        QmsQualityControlComponent,
        QmsQualityControlUpdateComponent,
        QmsQualityControlDeleteDialogComponent,
        QmsQualityControlDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }]
})
export class FccQmsQualityControlModule {
    constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
        this.languageHelper.language.subscribe((languageKey: string) => {
            if (languageKey !== undefined) {
                this.languageService.changeLanguage(languageKey);
            }
        });
    }
}
