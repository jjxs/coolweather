import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { QmsVehicleTypeClass } from 'app/shared/model/qms-vehicle-type-class.model';
import { QmsVehicleTypeClassService } from './qms-vehicle-type-class.service';
import { QmsVehicleTypeClassComponent } from './qms-vehicle-type-class.component';
import { QmsVehicleTypeClassDetailComponent } from './qms-vehicle-type-class-detail.component';
import { QmsVehicleTypeClassUpdateComponent } from './qms-vehicle-type-class-update.component';
import { QmsVehicleTypeClassDeletePopupComponent } from './qms-vehicle-type-class-delete-dialog.component';
import { IQmsVehicleTypeClass } from 'app/shared/model/qms-vehicle-type-class.model';

@Injectable({ providedIn: 'root' })
export class QmsVehicleTypeClassResolve implements Resolve<IQmsVehicleTypeClass> {
    constructor(private service: QmsVehicleTypeClassService) {}

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

export const qmsVehicleTypeClassRoute: Routes = [
    {
        path: '',
        component: QmsVehicleTypeClassComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'id,asc',
            pageTitle: 'fccApp.qmsVehicleTypeClass.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'qms-vehicle-type-class/:id/view',
        component: QmsVehicleTypeClassDetailComponent,
        resolve: {
            qmsVehicleTypeClass: QmsVehicleTypeClassResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'fccApp.qmsVehicleTypeClass.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'qms-vehicle-type-class/new',
        component: QmsVehicleTypeClassUpdateComponent,
        resolve: {
            qmsVehicleTypeClass: QmsVehicleTypeClassResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'fccApp.qmsVehicleTypeClass.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'qms-vehicle-type-class/:id/edit',
        component: QmsVehicleTypeClassUpdateComponent,
        resolve: {
            qmsVehicleTypeClass: QmsVehicleTypeClassResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'fccApp.qmsVehicleTypeClass.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const qmsVehicleTypeClassPopupRoute: Routes = [
    {
        path: 'qms-vehicle-type-class/:id/delete',
        component: QmsVehicleTypeClassDeletePopupComponent,
        resolve: {
            qmsVehicleTypeClass: QmsVehicleTypeClassResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'fccApp.qmsVehicleTypeClass.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
