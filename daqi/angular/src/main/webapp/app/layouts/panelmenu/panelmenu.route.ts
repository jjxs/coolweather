import { Route } from '@angular/router';

import { PanelMenuComponent } from './panelmenu.component';

export const panelmenuRoute: Route = {
    path: '',
    component: PanelMenuComponent,
    outlet: 'panelmenu'
};
