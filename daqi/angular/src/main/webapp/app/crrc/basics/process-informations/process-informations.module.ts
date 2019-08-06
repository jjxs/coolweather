import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';
import { FccSharedModule } from 'app/shared';
import { TreeTableModule } from 'primeng/treetable';
import { GrowlModule } from 'primeng/growl';
import { DropdownModule } from 'primeng/dropdown';
import { TableModule } from 'primeng/table';
import { TabMenuModule } from 'primeng/tabmenu';
import { TabViewModule } from 'primeng/tabview';
import { PanelModule } from 'primeng/panel';
import { RadioButtonModule } from 'primeng/radiobutton';
import { CalendarModule } from 'primeng/calendar';
import { InputTextModule } from 'primeng/inputtext';
import { PaginatorModule } from 'primeng/paginator';
import { CheckboxModule } from 'primeng/checkbox';
import { ToastModule } from 'primeng/toast';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import {
    ProcessInformationsComponent,
    processInformationsRoute,
    ProcessInformationsUpdateComponent,
    ProcessSelectionPopupComponent,
    ProcessInformationsDetailComponent

} from './';

// const ENTITY_STATES = [...bomInformationRoute, ...bomInformationRoute];

@NgModule({
    imports: [FccSharedModule, ProgressSpinnerModule, ToastModule, TreeTableModule, CheckboxModule, RadioButtonModule, CalendarModule, PaginatorModule, InputTextModule, TabMenuModule, TabViewModule, PanelModule, TableModule, GrowlModule, DropdownModule, RouterModule.forChild(processInformationsRoute)],
    declarations: [
        ProcessInformationsComponent,
        ProcessInformationsUpdateComponent,
        ProcessSelectionPopupComponent,
        ProcessInformationsDetailComponent
    ],
    entryComponents: [
        ProcessInformationsComponent,
        ProcessInformationsUpdateComponent,
        ProcessSelectionPopupComponent,
        ProcessInformationsDetailComponent
    ],
    providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class FccProcessInformationsModule {
    constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
        this.languageHelper.language.subscribe((languageKey: string) => {
            if (languageKey !== undefined) {
                this.languageService.changeLanguage(languageKey);
            }
        });
    }
}
