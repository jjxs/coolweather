import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { QmsProcessRoute } from 'app/shared/model/qms-process-route.model';
import { QmsProcessRouteService } from './qms-process-route.service';
import { QmsProcessRouteComponent } from './qms-process-route.component';
import { QmsProcessRouteDetailComponent } from './qms-process-route-detail.component';
import { QmsProcessRouteUpdateComponent } from './qms-process-route-update.component';
import { QmsProcessRouteDeletePopupComponent } from './qms-process-route-delete-dialog.component';
import { IQmsProcessRoute } from 'app/shared/model/qms-process-route.model';

@Injectable({ providedIn: 'root' })
export class QmsProcessRouteResolve implements Resolve<IQmsProcessRoute> {
    constructor(private service: QmsProcessRouteService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<QmsProcessRoute> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<QmsProcessRoute>) => response.ok),
                map((qmsProcessRoute: HttpResponse<QmsProcessRoute>) => qmsProcessRoute.body)
            );
        }
        return of(new QmsProcessRoute());
    }
}

export const qmsProcessRouteRoute: Routes = [
    {
        path: 'qms-process-route',
        component: QmsProcessRouteComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'id,asc',
            pageTitle: 'fccApp.qmsProcessRoute.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'qms-process-route/:id/view',
        component: QmsProcessRouteDetailComponent,
        resolve: {
            qmsProcessRoute: QmsProcessRouteResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'fccApp.qmsProcessRoute.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'qms-process-route/new',
        component: QmsProcessRouteUpdateComponent,
        resolve: {
            qmsProcessRoute: QmsProcessRouteResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'fccApp.qmsProcessRoute.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'qms-process-route/:id/edit',
        component: QmsProcessRouteUpdateComponent,
        resolve: {
            qmsProcessRoute: QmsProcessRouteResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'fccApp.qmsProcessRoute.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const qmsProcessRoutePopupRoute: Routes = [
    {
        path: 'qms-process-route/:id/delete',
        component: QmsProcessRouteDeletePopupComponent,
        resolve: {
            qmsProcessRoute: QmsProcessRouteResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'fccApp.qmsProcessRoute.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
