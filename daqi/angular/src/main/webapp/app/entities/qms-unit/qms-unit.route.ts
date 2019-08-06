import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { QmsUnit } from 'app/shared/model/qms-unit.model';
import { QmsUnitService } from './qms-unit.service';
import { QmsUnitComponent } from './qms-unit.component';
import { QmsUnitDetailComponent } from './qms-unit-detail.component';
import { QmsUnitUpdateComponent } from './qms-unit-update.component';
import { QmsUnitDeletePopupComponent } from './qms-unit-delete-dialog.component';
import { IQmsUnit } from 'app/shared/model/qms-unit.model';

@Injectable({ providedIn: 'root' })
export class QmsUnitResolve implements Resolve<IQmsUnit> {
    constructor(private service: QmsUnitService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<QmsUnit> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<QmsUnit>) => response.ok),
                map((qmsUnit: HttpResponse<QmsUnit>) => qmsUnit.body)
            );
        }
        return of(new QmsUnit());
    }
}

export const qmsUnitRoute: Routes = [
    {
        path: '',
        component: QmsUnitComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'id,asc',
            pageTitle: 'fccApp.qmsUnit.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'qms-unit/:id/view',
        component: QmsUnitDetailComponent,
        resolve: {
            qmsUnit: QmsUnitResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'fccApp.qmsUnit.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'qms-unit/new',
        component: QmsUnitUpdateComponent,
        resolve: {
            qmsUnit: QmsUnitResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'fccApp.qmsUnit.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'qms-unit/:id/edit',
        component: QmsUnitUpdateComponent,
        resolve: {
            qmsUnit: QmsUnitResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'fccApp.qmsUnit.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const qmsUnitPopupRoute: Routes = [
    {
        path: 'qms-unit/:id/delete',
        component: QmsUnitDeletePopupComponent,
        resolve: {
            qmsUnit: QmsUnitResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'fccApp.qmsUnit.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
