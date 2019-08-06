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
import { CalendarModule } from 'primeng/calendar';
import {
    QmsMaterielEntryComponent,
    QmsMaterielEntryDetailComponent,
    QmsMaterielEntryUpdateComponent,
    QmsMaterielEntryDeletePopupComponent,
    QmsMaterielEntryDeleteDialogComponent,
    qmsMaterielEntryRoute,
    qmsMaterielEntryPopupRoute,
    ConfirmComponent,
} from './';
import { NgbCalendar, NgbCalendarHebrew } from '@ng-bootstrap/ng-bootstrap';

const ENTITY_STATES = [...qmsMaterielEntryRoute, ...qmsMaterielEntryPopupRoute];

@NgModule({
    imports: [FccSharedModule,
        GrowlModule,
        TableModule,
        InputTextareaModule,
        DropdownModule,
        RadioButtonModule,
        CalendarModule,
        RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        QmsMaterielEntryComponent,
        QmsMaterielEntryDetailComponent,
        QmsMaterielEntryUpdateComponent,
        QmsMaterielEntryDeleteDialogComponent,
        QmsMaterielEntryDeletePopupComponent,
        ConfirmComponent,
    ],
    entryComponents: [
        QmsMaterielEntryComponent,
        QmsMaterielEntryUpdateComponent,
        QmsMaterielEntryDeleteDialogComponent,
        QmsMaterielEntryDeletePopupComponent,
        ConfirmComponent,
    ],
    providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService },
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class FccQmsMaterielEntryModule {
    constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
        this.languageHelper.language.subscribe((languageKey: string) => {
            if (languageKey !== undefined) {
                this.languageService.changeLanguage(languageKey);
            }
        });
    }
}
