import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TableModule } from 'primeng/table';
import { FccSharedModule } from 'app/shared';
import { GrowlModule } from 'primeng/growl';
import {DropdownModule} from 'primeng/dropdown';
import {QmsUnitComponent} from 'app/popup/unitSelection/qms-unit.component';
import {QmsMaterielTypeComponent} from 'app/popup/materialTypeSelection/qms-materiel-type.component';
import { JhiLanguageHelper } from 'app/core';
import { ButtonModule } from 'primeng/button';
import { PanelModule } from 'primeng/panel';
import { JhiLanguageService } from 'ng-jhipster';
import {
    QmsMaterielComponent,
    QmsMaterielDetailComponent,
    QmsMaterielUpdateComponent,
    QmsMaterielDeletePopupComponent,
    QmsMaterielDeleteDialogComponent,
    qmsMaterielRoute,
    qmsMaterielPopupRoute
} from './';

const ENTITY_STATES = [...qmsMaterielRoute, ...qmsMaterielPopupRoute];

@NgModule({
    imports: [FccSharedModule,TableModule, ButtonModule,PanelModule,GrowlModule, DropdownModule,RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        QmsMaterielComponent,
        QmsMaterielDetailComponent,
        QmsMaterielUpdateComponent,
        QmsMaterielDeleteDialogComponent,
        QmsMaterielDeletePopupComponent,
        QmsUnitComponent,
        QmsMaterielTypeComponent,
        
    ],
    entryComponents: [QmsMaterielComponent, 
        QmsMaterielUpdateComponent, 
        QmsMaterielDeleteDialogComponent, 
        QmsMaterielDeletePopupComponent,
        QmsUnitComponent,
        QmsMaterielTypeComponent,
        
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
})
export class FccQmsMaterielModule {
    constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
        this.languageHelper.language.subscribe((languageKey: string) => {
            if (languageKey !== undefined) {
                this.languageService.changeLanguage(languageKey);
            }
        });
    }
}
