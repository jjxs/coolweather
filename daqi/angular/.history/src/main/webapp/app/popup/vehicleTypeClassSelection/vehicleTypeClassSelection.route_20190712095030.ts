import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { QmsVehicleTypeInfo } from 'app/shared/model/qms-vehicle-type-info.model';
import { VehicleTypeClassSelectionService } from './vehicleTypeClassSelection.service';
import { MaterialProcedureSelectionComponent } from './vehicleTypeClassSelection.component';

import { IQmsVehicleTypeInfo } from 'app/shared/model/qms-vehicle-type-info.model';
@Injectable({ providedIn: 'root' })
export class MaterialProcedureSelectResolve implements Resolve<IQmsVehicleTypeInfo> {
    constructor(private service: MaterialProcedureSelectService) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<QmsVehicleTypeInfo> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<QmsVehicleTypeInfo>) => response.ok),
                map((qmsVehicleTypeInfo: HttpResponse<QmsVehicleTypeInfo>) => qmsVehicleTypeInfo.body)
            );
        }
        return of(new QmsVehicleTypeInfo());
    }
}


export const MaterialProcedureSelectionRoute: Routes = [
    {
        path: 'materialProcedureSelection',
        component: MaterialProcedureSelectionComponent,
        data: {
            authorities: [],
            pageTitle: 'fccApp.qmsVehicleTypeInfo.home.title'
        }
    }
];
