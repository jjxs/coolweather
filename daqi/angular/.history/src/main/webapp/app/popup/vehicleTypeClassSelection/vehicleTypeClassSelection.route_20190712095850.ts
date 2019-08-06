import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { VehicleTypeClassSelectionService } from './vehicleTypeClassSelection.service';
import { VehicleTypeClassSelectionComponent } from './vehicleTypeClassSelection.component';
import { QmsVehicleTypeClass } from 'app/shared/model/qms-vehicle-type-class.model';

import { IQmsVehicleTypeInfo } from 'app/shared/model/qms-vehicle-type-info.model';
@Injectable({ providedIn: 'root' })
export class VehicleTypeClassSelectionResolve implements Resolve<IQmsVehicleTypeInfo> {
    constructor(private service: VehicleTypeClassSelectionService) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<QmsVehicleTypeClass> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<QmsVehicleTypeClass>) => response.ok),
                map((qmsVehicleTypeClass: HttpResponse<QmsVehicleTypeClass>) => qmsVehicleTypeClass.body)
            );
        }
        return of(new QmsVehicleTypeClass());
    }
}


export const VehicleTypeClassSelectionRoute: Routes = [
    {
        path: 'materialProcedureSelection',
        component: VehicleTypeClassSelectionComponent,
        data: {
            authorities: [],
            pageTitle: 'fccApp.qmsVehicleTypeInfo.home.title'
        }
    }
];
