import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { FccSharedModule } from 'app/shared';
import { JhiLanguageHelper } from 'app/core';
import { JhiLanguageService } from 'ng-jhipster';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/primeng';
import {TableModule} from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import {TreeTableModule} from 'primeng/treetable';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {DropdownModule} from 'primeng/dropdown';
// import { QmsSupplierDetailComponent} from './basics/supplierInformation/supplier-detail.component'
// import { SupplierUpdateComponent } from './basics/supplierInformation/supplier-update.component'
// import {QmsSupplierDeleteDialogComponent,QmsSupplierDeletePopupComponent} from './basics/supplierInformation/supplier-delete-dialog.component'
import {
   crrcRoute,
  //  SupplierInformationComponent,
} from './';
import { from } from 'rxjs';

@NgModule({
  imports: [
    FccSharedModule,
    ButtonModule,
    InputTextModule,
    TableModule,
    DialogModule,
    TreeTableModule,
    DropdownModule,
    ConfirmDialogModule,
    RouterModule.forChild(
      crrcRoute
    )
  ],
  declarations: [
    // SupplierInformationComponent,
    // QmsSupplierDetailComponent,
    // SupplierUpdateComponent,
    // QmsSupplierDeleteDialogComponent,
    // QmsSupplierDeletePopupComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
})
export class CrrcModule {
  constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
    this.languageHelper.language.subscribe((languageKey: string) => {
      if (languageKey !== undefined) {
        this.languageService.changeLanguage(languageKey);
      }
    });
  }
}
