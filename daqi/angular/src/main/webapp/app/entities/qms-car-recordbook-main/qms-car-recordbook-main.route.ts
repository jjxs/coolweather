import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { QmsCarRecordbookMain } from 'app/shared/model/qms-car-recordbook-main.model';
import { QmsCarRecordbookMainService } from './qms-car-recordbook-main.service';
import { QmsCarRecordbookMainComponent } from './qms-car-recordbook-main.component';
import { QmsCarRecordbookMainDetailComponent } from './qms-car-recordbook-main-detail.component';
import { QmsCarRecordbookMainUpdateComponent } from './qms-car-recordbook-main-update.component';
import { QmsCarRecordbookMainDeletePopupComponent } from './qms-car-recordbook-main-delete-dialog.component';
import { IQmsCarRecordbookMain } from 'app/shared/model/qms-car-recordbook-main.model';

@Injectable({ providedIn: 'root' })
export class QmsCarRecordbookMainResolve implements Resolve<IQmsCarRecordbookMain> {
    constructor(private service: QmsCarRecordbookMainService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<QmsCarRecordbookMain> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<QmsCarRecordbookMain>) => response.ok),
                map((qmsCarRecordbookMain: HttpResponse<QmsCarRecordbookMain>) => qmsCarRecordbookMain.body)
            );
        }
        return of(new QmsCarRecordbookMain());
    }
}

export const qmsCarRecordbookMainRoute: Routes = [
    {
        path: 'qms-car-recordbook-main',
        component: QmsCarRecordbookMainComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'id,asc',
            pageTitle: 'fccApp.qmsCarRecordbookMain.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'qms-car-recordbook-main/:id/view',
        component: QmsCarRecordbookMainDetailComponent,
        resolve: {
            qmsCarRecordbookMain: QmsCarRecordbookMainResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'fccApp.qmsCarRecordbookMain.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'qms-car-recordbook-main/new',
        component: QmsCarRecordbookMainUpdateComponent,
        resolve: {
            qmsCarRecordbookMain: QmsCarRecordbookMainResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'fccApp.qmsCarRecordbookMain.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'qms-car-recordbook-main/:id/edit',
        component: QmsCarRecordbookMainUpdateComponent,
        resolve: {
            qmsCarRecordbookMain: QmsCarRecordbookMainResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'fccApp.qmsCarRecordbookMain.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const qmsCarRecordbookMainPopupRoute: Routes = [
    {
        path: 'qms-car-recordbook-main/:id/delete',
        component: QmsCarRecordbookMainDeletePopupComponent,
        resolve: {
            qmsCarRecordbookMain: QmsCarRecordbookMainResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'fccApp.qmsCarRecordbookMain.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
