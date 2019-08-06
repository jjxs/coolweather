import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { QmsVehicleTypeInfo } from 'app/shared/model/qms-vehicle-type-info.model';
import { VehicleTypeInfoService } from './vehicle-type-info.service';
import { VehicleTypeInfoComponent } from './vehicle-type-info.component';
import { VehicleTypeInfoDetailComponent } from './vehicle-type-info-detail.component';
import { VehicleTypeInfoUpdateComponent } from './vehicle-type-info-update.component';
import { VehicleTypeInfoDeletePopupComponent } from './vehicle-type-info-delete-dialog.component';
import { IQmsVehicleTypeInfo } from 'app/shared/model/qms-vehicle-type-info.model';
@Injectable({ providedIn: 'root' })
export class VehicleTypeInfoResolve implements Resolve<IQmsVehicleTypeInfo> {
    constructor(private service: VehicleTypeInfoService) { }

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

export const VehicleTypeInfoRoute: Routes = [
    {
        path: '',
        component: VehicleTypeInfoComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'vehicleType,asc',
            pageTitle: 'fccApp.qmsVehicleTypeInfo.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/view',
        component: VehicleTypeInfoDetailComponent,
        resolve: {
            qmsVehicleTypeInfo: VehicleTypeInfoResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'fccApp.qmsVehicleTypeInfo.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'new',
        component: VehicleTypeInfoUpdateComponent,
        resolve: {
            qmsVehicleTypeInfo: VehicleTypeInfoResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'fccApp.qmsVehicleTypeInfo.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/edit',
        component: VehicleTypeInfoUpdateComponent,
        resolve: {
            qmsVehicleTypeInfo: VehicleTypeInfoResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'fccApp.qmsVehicleTypeInfo.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const VehicleTypeInfoPopupRoute: Routes = [
    {
        path: 'vehicle-type-info/:id/delete',
        component: VehicleTypeInfoDeletePopupComponent,
        resolve: {
            qmsVehicleTypeInfo: VehicleTypeInfoResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'fccApp.qmsVehicleTypeInfo.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
