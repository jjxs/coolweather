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
import { InputTextareaModule } from 'primeng/inputtextarea';
import {
    QmsEntryControlDetailsComponent,
    qmsEntryControlDetailsRoute,
    CanDeactivateGuard,
    ConfirmComponent
} from '.';

const ENTITY_STATES = [...qmsEntryControlDetailsRoute];

@NgModule({
    imports: [FccSharedModule, 
        GrowlModule,
        TableModule,
        InputTextareaModule,
        RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        QmsEntryControlDetailsComponent,
        ConfirmComponent
    ],
    entryComponents: [
        QmsEntryControlDetailsComponent,
        ConfirmComponent
    ],
    providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }, CanDeactivateGuard],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class FccQmsEntryControlDetailsModule {
    constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
        this.languageHelper.language.subscribe((languageKey: string) => {
            if (languageKey !== undefined) {
                this.languageService.changeLanguage(languageKey);
            }
        });
    }
}
