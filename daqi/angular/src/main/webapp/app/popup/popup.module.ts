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
import { CheckboxModule } from 'primeng/checkbox';
import { TreeModule } from 'primeng/tree';
import { RbacRoleSelectionComponent } from './rbacRoleSelection';
import { VehicleTypeClassSelectionComponent } from './vehicleTypeClassSelection';
import { MaterialSelectionComponent } from './materialSelection';
import { SupplierSelectionComponent } from './supplierSeletion';
import { ProcessSelectionComponent } from './processSelection';
import { EntryInspectionSelectionComponent } from './entryInspectionSelection';
import { VehicleTypeSelectionComponent } from './vehicleTypeSelection';
import { QmsBomTechnologyComponent } from './bomTechnologySelection';
import { MaterialSelectionInspectComponent } from './materialSelectionInpsect';
import { SupplierSelectionInspectComponent } from './supplierSeletionInspect';
import { QmsProductComponent } from './productSelection';
import { MaterielDetailsSelectionComponent } from './materielDetailsSelection';
import { UserSelectComponent } from './userSelect';
import { BomInformationComponent1 } from 'app/popup/bomTreeSelection/bom-infomation.component'
import { TreeTableModule } from 'primeng/treetable';


@NgModule({
    imports: [FccSharedModule, TableModule, DropdownModule, GrowlModule, PanelModule, ButtonModule, RadioButtonModule, CheckboxModule, TreeTableModule, TreeModule],
    declarations: [
        RbacRoleSelectionComponent,
        VehicleTypeClassSelectionComponent,
        MaterialSelectionComponent,
        SupplierSelectionComponent,
        ProcessSelectionComponent,
        EntryInspectionSelectionComponent,
        VehicleTypeSelectionComponent,
        QmsBomTechnologyComponent,
        SupplierSelectionInspectComponent,
        MaterialSelectionInspectComponent,
        QmsProductComponent,
        MaterielDetailsSelectionComponent,
        UserSelectComponent,
        BomInformationComponent1
    ],
    entryComponents: [
        RbacRoleSelectionComponent,
        VehicleTypeClassSelectionComponent,
        MaterialSelectionComponent,
        SupplierSelectionComponent,
        ProcessSelectionComponent,
        EntryInspectionSelectionComponent,
        VehicleTypeSelectionComponent,
        QmsBomTechnologyComponent,
        SupplierSelectionInspectComponent,
        MaterialSelectionInspectComponent,
        QmsProductComponent,
        MaterielDetailsSelectionComponent,
        UserSelectComponent,
        BomInformationComponent1
    ],
    providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PopupModule {
    constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
        this.languageHelper.language.subscribe((languageKey: string) => {
            if (languageKey !== undefined) {
                this.languageService.changeLanguage(languageKey);
            }
        });
    }
}
