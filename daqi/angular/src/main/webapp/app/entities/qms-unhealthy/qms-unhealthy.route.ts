import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { QmsUnhealthy } from 'app/shared/model/qms-unhealthy.model';
import { QmsUnhealthyService } from './qms-unhealthy.service';
import { QmsUnhealthyComponent } from './qms-unhealthy.component';
import { QmsUnhealthyDetailComponent } from './qms-unhealthy-detail.component';
import { QmsUnhealthyUpdateComponent } from './qms-unhealthy-update.component';
import { QmsUnhealthyDeletePopupComponent } from './qms-unhealthy-delete-dialog.component';
import { IQmsUnhealthy } from 'app/shared/model/qms-unhealthy.model';

@Injectable({ providedIn: 'root' })
export class QmsUnhealthyResolve implements Resolve<IQmsUnhealthy> {
    constructor(private service: QmsUnhealthyService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<QmsUnhealthy> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<QmsUnhealthy>) => response.ok),
                map((qmsUnhealthy: HttpResponse<QmsUnhealthy>) => qmsUnhealthy.body)
            );
        }
        return of(new QmsUnhealthy());
    }
}

export const qmsUnhealthyRoute: Routes = [
    {
        path: 'qms-unhealthy',
        component: QmsUnhealthyComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'id,asc',
            pageTitle: 'fccApp.qmsUnhealthy.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'qms-unhealthy/:id/view',
        component: QmsUnhealthyDetailComponent,
        resolve: {
            qmsUnhealthy: QmsUnhealthyResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'fccApp.qmsUnhealthy.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'qms-unhealthy/new',
        component: QmsUnhealthyUpdateComponent,
        resolve: {
            qmsUnhealthy: QmsUnhealthyResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'fccApp.qmsUnhealthy.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'qms-unhealthy/:id/edit',
        component: QmsUnhealthyUpdateComponent,
        resolve: {
            qmsUnhealthy: QmsUnhealthyResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'fccApp.qmsUnhealthy.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const qmsUnhealthyPopupRoute: Routes = [
    {
        path: 'qms-unhealthy/:id/delete',
        component: QmsUnhealthyDeletePopupComponent,
        resolve: {
            qmsUnhealthy: QmsUnhealthyResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'fccApp.qmsUnhealthy.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
