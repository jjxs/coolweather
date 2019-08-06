import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';
import { FccSharedModule } from 'app/shared';
import { TableModule } from 'primeng/table';
import { GrowlModule } from 'primeng/growl';
import { VehicleTypeClassSelectionComponent } from '../popup/vehicleTypeClassSelection';

import {
    QmsVehicleTypeClassComponent,
    QmsVehicleTypeClassDetailComponent,
    QmsVehicleTypeClassUpdateComponent,
    QmsVehicleTypeClassDeletePopupComponent,
    QmsVehicleTypeClassDeleteDialogComponent,
    qmsVehicleTypeClassRoute,
    qmsVehicleTypeClassPopupRoute
} from './';

const ENTITY_STATES = [...qmsVehicleTypeClassRoute, ...qmsVehicleTypeClassPopupRoute];

@NgModule({
    imports: [GrowlModule, FccSharedModule, TableModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        QmsVehicleTypeClassComponent,
        QmsVehicleTypeClassDetailComponent,
        QmsVehicleTypeClassUpdateComponent,
        QmsVehicleTypeClassDeleteDialogComponent,
        QmsVehicleTypeClassDeletePopupComponent,
        VehicleTypeClassSelectionComponent
    ],
    entryComponents: [
        QmsVehicleTypeClassComponent,
        QmsVehicleTypeClassUpdateComponent,
        QmsVehicleTypeClassDeleteDialogComponent,
        QmsVehicleTypeClassDeletePopupComponent,
        QmsVehicleTypeClassDetailComponent,
        VehicleTypeClassSelectionComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
})
export class FccQmsVehicleTypeClassModule {
    constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
        this.languageHelper.language.subscribe((languageKey: string) => {
            if (languageKey !== undefined) {
                this.languageService.changeLanguage(languageKey);
            }
        });
    }
}
