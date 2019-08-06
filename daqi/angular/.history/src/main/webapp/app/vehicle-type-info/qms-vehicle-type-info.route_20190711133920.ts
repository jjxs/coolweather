import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { QmsVehicleTypeInfo } from 'app/shared/model/qms-vehicle-type-info.model';
import { QmsVehicleTypeInfoService } from './qms-vehicle-type-info.service';
import { QmsVehicleTypeInfoComponent } from './qms-vehicle-type-info.component';
import { QmsVehicleTypeInfoDetailComponent } from './qms-vehicle-type-info-detail.component';
import { QmsVehicleTypeInfoUpdateComponent } from './qms-vehicle-type-info-update.component';
import { QmsVehicleTypeInfoDeletePopupComponent } from './qms-vehicle-type-info-delete-dialog.component';
import { IQmsVehicleTypeInfo } from 'app/shared/model/qms-vehicle-type-info.model';

@Injectable({ providedIn: 'root' })
export class QmsVehicleTypeInfoResolve implements Resolve<IQmsVehicleTypeInfo> {
    constructor(private service: QmsVehicleTypeInfoService) {}

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

export const qmsVehicleTypeInfoRoute: Routes = [
    {
        path: 'qms-vehicle-type-info',
        component: QmsVehicleTypeInfoComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'id,asc',
            pageTitle: 'fccApp.qmsVehicleTypeInfo.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'qms-vehicle-type-info/:id/view',
        component: QmsVehicleTypeInfoDetailComponent,
        resolve: {
            qmsVehicleTypeInfo: QmsVehicleTypeInfoResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'fccApp.qmsVehicleTypeInfo.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'qms-vehicle-type-info/new',
        component: QmsVehicleTypeInfoUpdateComponent,
        resolve: {
            qmsVehicleTypeInfo: QmsVehicleTypeInfoResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'fccApp.qmsVehicleTypeInfo.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'qms-vehicle-type-info/:id/edit',
        component: QmsVehicleTypeInfoUpdateComponent,
        resolve: {
            qmsVehicleTypeInfo: QmsVehicleTypeInfoResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'fccApp.qmsVehicleTypeInfo.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const qmsVehicleTypeInfoPopupRoute: Routes = [
    {
        path: 'qms-vehicle-type-info/:id/delete',
        component: QmsVehicleTypeInfoDeletePopupComponent,
        resolve: {
            qmsVehicleTypeInfo: QmsVehicleTypeInfoResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'fccApp.qmsVehicleTypeInfo.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
