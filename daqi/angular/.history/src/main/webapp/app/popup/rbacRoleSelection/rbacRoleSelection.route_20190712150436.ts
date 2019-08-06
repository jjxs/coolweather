import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { VehicleTypeClassSelectionComponent } from './rbacRoleSelection.component';
import { IRbacRole } from 'app/shared/model/rbac-role.model';
import { RbacRoleSelectionService } from './rbacRoleSelection.service';


@Injectable({ providedIn: 'root' })
export class RbacRoleSelectionResolve implements Resolve<IRbacRole> {
    constructor(private service: RbacRoleService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<RbacRole> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<RbacRole>) => response.ok),
                map((rbacRole: HttpResponse<RbacRole>) => rbacRole.body)
            );
        }
        return of(new RbacRole());
    }
}


export const VehicleTypeClassSelectionRoute: Routes = [
    {
        path: 'vehicleTypeClassSelection',
        component: VehicleTypeClassSelectionComponent,
        data: {
            authorities: [],
            pageTitle: 'fccApp.qmsVehicleTypeClass.home.title'
        }
    }
];
