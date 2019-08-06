import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { FccSharedModule } from 'app/shared';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';
import { TableModule } from 'primeng/table';
import { GrowlModule } from 'primeng/growl';
import { ButtonModule } from 'primeng/button';
import { PanelModule } from 'primeng/panel';
import { DropdownModule } from 'primeng/dropdown';
import { QmsBomTechnologyComponent } from '../../popup/bomTechnologySelection/qms-bom-technology.component'

import {
    QmsProductionInspectionComponent,
    QmsProductionInspectionDetailComponent,
    QmsProductionInspectionUpdateComponent,
    QmsProductionInspectionCheckComponent,
    QmsProductionInspectionDeletePopupComponent,
    QmsProductionInspectionDeleteDialogComponent,
    qmsProductionInspectionRoute,
    qmsProductionInspectionPopupRoute
} from './';

const ENTITY_STATES = [...qmsProductionInspectionRoute, ...qmsProductionInspectionPopupRoute];

@NgModule({
    imports: [DropdownModule, TableModule, PanelModule, ButtonModule, GrowlModule, FccSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        QmsProductionInspectionComponent,
        QmsProductionInspectionDetailComponent,
        QmsProductionInspectionUpdateComponent,
        QmsProductionInspectionCheckComponent,
        QmsProductionInspectionDeleteDialogComponent,
        QmsProductionInspectionDeletePopupComponent,
        QmsBomTechnologyComponent
    ],
    entryComponents: [
        QmsProductionInspectionComponent,
        QmsProductionInspectionUpdateComponent,
        QmsProductionInspectionCheckComponent,
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
