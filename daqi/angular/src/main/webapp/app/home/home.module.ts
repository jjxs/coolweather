import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { FccSharedModule } from 'app/shared';
import { HOME_ROUTE, HomeComponent } from './';
import {ButtonModule} from 'primeng/button';

@NgModule({
    imports: [FccSharedModule, RouterModule.forChild([HOME_ROUTE]), ButtonModule],
    declarations: [HomeComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class FccHomeModule {}
