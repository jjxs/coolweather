import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { QmsCarRecordbookDetails } from 'app/shared/model/qms-car-recordbook-details.model';
import { QmsCarRecordbookDetailsService } from './qms-car-recordbook-details.service';
import { QmsCarRecordbookDetailsComponent } from './qms-car-recordbook-details.component';
import { QmsCarRecordbookDetailsDetailComponent } from './qms-car-recordbook-details-detail.component';
import { QmsCarRecordbookDetailsUpdateComponent } from './qms-car-recordbook-details-update.component';
import { QmsCarRecordbookDetailsDeletePopupComponent } from './qms-car-recordbook-details-delete-dialog.component';
import { IQmsCarRecordbookDetails } from 'app/shared/model/qms-car-recordbook-details.model';

@Injectable({ providedIn: 'root' })
export class QmsCarRecordbookDetailsResolve implements Resolve<IQmsCarRecordbookDetails> {
    constructor(private service: QmsCarRecordbookDetailsService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<QmsCarRecordbookDetails> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<QmsCarRecordbookDetails>) => response.ok),
                map((qmsCarRecordbookDetails: HttpResponse<QmsCarRecordbookDetails>) => qmsCarRecordbookDetails.body)
            );
        }
        return of(new QmsCarRecordbookDetails());
    }
}

export const qmsCarRecordbookDetailsRoute: Routes = [
    {
        path: 'qms-car-recordbook-details',
        component: QmsCarRecordbookDetailsComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'id,asc',
            pageTitle: 'fccApp.qmsCarRecordbookDetails.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'qms-car-recordbook-details/:id/view',
        component: QmsCarRecordbookDetailsDetailComponent,
        resolve: {
            qmsCarRecordbookDetails: QmsCarRecordbookDetailsResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'fccApp.qmsCarRecordbookDetails.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'qms-car-recordbook-details/new',
        component: QmsCarRecordbookDetailsUpdateComponent,
        resolve: {
            qmsCarRecordbookDetails: QmsCarRecordbookDetailsResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'fccApp.qmsCarRecordbookDetails.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'qms-car-recordbook-details/:id/edit',
        component: QmsCarRecordbookDetailsUpdateComponent,
        resolve: {
            qmsCarRecordbookDetails: QmsCarRecordbookDetailsResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'fccApp.qmsCarRecordbookDetails.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const qmsCarRecordbookDetailsPopupRoute: Routes = [
    {
        path: 'qms-car-recordbook-details/:id/delete',
        component: QmsCarRecordbookDetailsDeletePopupComponent,
        resolve: {
            qmsCarRecordbookDetails: QmsCarRecordbookDetailsResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'fccApp.qmsCarRecordbookDetails.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
