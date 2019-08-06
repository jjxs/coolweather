import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';
import { FccSharedModule } from 'app/shared';
import { DropdownModule } from 'primeng/dropdown';
import { TableModule } from 'primeng/table';
import { GrowlModule } from 'primeng/growl';
import { ButtonModule } from 'primeng/button';
import { PanelModule } from 'primeng/panel';
import { RadioButtonModule } from 'primeng/radiobutton';

import {
    QmsMaterielSupplierComponent,
    QmsMaterielSupplierDetailComponent,
    QmsMaterielSupplierUpdateComponent,
    QmsMaterielSupplierDeletePopupComponent,
    QmsMaterielSupplierDeleteDialogComponent,
    qmsMaterielSupplierRoute,
    qmsMaterielSupplierPopupRoute
} from '.';

const ENTITY_STATES = [...qmsMaterielSupplierRoute, ...qmsMaterielSupplierPopupRoute];

@NgModule({
    imports: [FccSharedModule,
        DropdownModule,
        TableModule,
        GrowlModule,
        ButtonModule,
        PanelModule,
        RadioButtonModule,
        RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        QmsMaterielSupplierComponent,
        QmsMaterielSupplierDetailComponent,
        QmsMaterielSupplierUpdateComponent,
        QmsMaterielSupplierDeleteDialogComponent,
        QmsMaterielSupplierDeletePopupComponent,
    ],
    entryComponents: [
        QmsMaterielSupplierComponent,
        QmsMaterielSupplierUpdateComponent,
        QmsMaterielSupplierDeleteDialogComponent,
        QmsMaterielSupplierDeletePopupComponent,
    ],
    providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class FccQmsMaterielSupplierModule {
    constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
        this.languageHelper.language.subscribe((languageKey: string) => {
            if (languageKey !== undefined) {
                this.languageService.changeLanguage(languageKey);
            }
        });
    }
}
