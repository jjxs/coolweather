import { Routes } from '@angular/router';

// import { qmsSupplierRoute, qmsSupplierPopupRoute} from './';

const CRRC_ROUTES = [];

export const crrcRoute: Routes = [
  {
    path: '',
    children: CRRC_ROUTES
  }
];
