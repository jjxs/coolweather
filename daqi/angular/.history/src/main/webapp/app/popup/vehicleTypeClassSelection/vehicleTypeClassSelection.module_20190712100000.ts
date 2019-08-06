import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';
import { FccSharedModule } from 'app/shared';
import { TableModule } from 'primeng/table';
import { GrowlModule } from 'primeng/growl';
import { ButtonModule } from 'primeng/button';
import { PanelModule } from 'primeng/panel';
import { RadioButtonModule } from 'primeng/radiobutton';
import { DropdownModule } from 'primeng/dropdown';
import {
    VehicleTypeClassSelectionComponent,
    VehicleTypeClassSelectionRoute
} from './';

// const ENTITY_STATES = [...MaterialProcedureSelectionRoute];

@NgModule({
    imports: [FccSharedModule, TableModule, DropdownModule, GrowlModule, PanelModule, ButtonModule, RadioButtonModule, RouterModule.forChild(MaterialProcedureSelectionRoute)],
    declarations: [
        VehicleTypeClassSelectionComponent
    ],
    entryComponents: [
        VehicleTypeClassSelectionComponent
    ],
    providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class FccMaterialProcedureSelectionModule {
    constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
        this.languageHelper.language.subscribe((languageKey: string) => {
            if (languageKey !== undefined) {
                this.languageService.changeLanguage(languageKey);
            }
        });
    }
}
