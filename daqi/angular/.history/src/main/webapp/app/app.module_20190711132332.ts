import './vendor.ts';

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgbDatepickerConfig } from '@ng-bootstrap/ng-bootstrap';
import { Ng2Webstorage } from 'ngx-webstorage';
import { NgJhipsterModule } from 'ng-jhipster';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/primeng';
import { TableModule } from 'primeng/table';

import { AuthInterceptor } from './blocks/interceptor/auth.interceptor';
import { AuthExpiredInterceptor } from './blocks/interceptor/auth-expired.interceptor';
import { ErrorHandlerInterceptor } from './blocks/interceptor/errorhandler.interceptor';
import { NotificationInterceptor } from './blocks/interceptor/notification.interceptor';
import { FccSharedModule, FindLanguageFromKeyPipe } from 'app/shared';
import { FccCoreModule } from 'app/core';
import { FccAppRoutingModule } from './app-routing.module';
import { FccHomeModule } from './home/home.module';
import { FccAccountModule } from './account/account.module';
import { PanelMenuModule } from 'primeng/panelmenu';
import { CrrcModule } from './crrc/crrc.module';

import * as moment from 'moment';
// jhipster-needle-angular-add-module-import JHipster will add new module here
import { JhiMainComponent, NavbarComponent, FooterComponent, PageRibbonComponent, ActiveMenuDirective, ErrorComponent, PanelMenuComponent } from './layouts';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FccAppRoutingModule,
    Ng2Webstorage.forRoot({ prefix: 'jhi', separator: '-' }),
    NgJhipsterModule.forRoot({
      // set below to true to make alerts look like toast
      alertAsToast: false,
      alertTimeout: 5000,
      i18nEnabled: true,
      defaultI18nLang: 'zh-cn'
    }),
    FccSharedModule.forRoot(),
    FccCoreModule,
    FccHomeModule,
    FccAccountModule,
    PanelMenuModule,
    CrrcModule,
    ButtonModule,
    InputTextModule,
    TableModule,
    // jhipster-needle-angular-add-module JHipster will add new module here
    // FccEntityModule
  ],
  declarations: [JhiMainComponent, NavbarComponent, ErrorComponent, PageRibbonComponent, ActiveMenuDirective, FooterComponent, PanelMenuComponent],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthExpiredInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorHandlerInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: NotificationInterceptor,
      multi: true
    },
    FindLanguageFromKeyPipe
  ],
  bootstrap: [JhiMainComponent]
})
export class FccAppModule {
  constructor(private dpConfig: NgbDatepickerConfig) {
    this.dpConfig.minDate = { year: moment().year() - 100, month: 1, day: 1 };
  }
}
