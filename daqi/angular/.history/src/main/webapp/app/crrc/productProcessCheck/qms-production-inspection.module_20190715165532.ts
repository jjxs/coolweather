import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { FccSharedModule } from 'app/shared';
import {
    QmsProductionInspectionComponent,
    QmsProductionInspectionDetailComponent,
    QmsProductionInspectionUpdateComponent,
    QmsProductionInspectionDeletePopupComponent,
    QmsProductionInspectionDeleteDialogComponent,
    qmsProductionInspectionRoute,
    qmsProductionInspectionPopupRoute
} from './';

const ENTITY_STATES = [...qmsProductionInspectionRoute, ...qmsProductionInspectionPopupRoute];

@NgModule({
    imports: [FccSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        QmsProductionInspectionComponent,
        QmsProductionInspectionDetailComponent,
        QmsProductionInspectionUpdateComponent,
        QmsProductionInspectionDeleteDialogComponent,
        QmsProductionInspectionDeletePopupComponent
    ],
    entryComponents: [
        QmsProductionInspectionComponent,
        QmsProductionInspectionUpdateComponent,
        QmsProductionInspectionDeleteDialogComponent,
        QmsProductionInspectionDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],

})
export class FccQmsProductionInspectionModule {
    constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
        this.languageHelper.language.subscribe((languageKey: string) => {
            if (languageKey !== undefined) {
                this.languageService.changeLanguage(languageKey);
            }
        });
    }
}