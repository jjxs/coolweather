import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';
import { FccSharedModule } from 'app/shared';
import { TableModule } from 'primeng/table';
import { GrowlModule } from 'primeng/growl';
import { ButtonModule } from 'primeng/button';
import { PanelModule } from 'primeng/panel';
import {
    VehicleTypeInfoComponent,
    VehicleTypeInfoDetailComponent,
    VehicleTypeInfoUpdateComponent,
    VehicleTypeInfoDeletePopupComponent,
    VehicleTypeInfoDeleteDialogComponent,
    VehicleTypeInfoRoute,
    VehicleTypeInfoPopupRoute
} from './';

const ENTITY_STATES = [...VehicleTypeInfoRoute, ...VehicleTypeInfoPopupRoute];

@NgModule({
    imports: [FccSharedModule, TableModule, GrowlModule, PanelModule, ButtonModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        VehicleTypeInfoComponent,
        VehicleTypeInfoDetailComponent,
        VehicleTypeInfoUpdateComponent,
        VehicleTypeInfoDeleteDialogComponent,
        VehicleTypeInfoDeletePopupComponent
    ],
    entryComponents: [
        VehicleTypeInfoComponent,
        VehicleTypeInfoUpdateComponent,
        VehicleTypeInfoDeleteDialogComponent,
        VehicleTypeInfoDeletePopupComponent
    ],
    providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class FccVehicleTypeInfoModule {
    constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
        this.languageHelper.language.subscribe((languageKey: string) => {
            if (languageKey !== undefined) {
                this.languageService.changeLanguage(languageKey);
            }
        });
    }
}
