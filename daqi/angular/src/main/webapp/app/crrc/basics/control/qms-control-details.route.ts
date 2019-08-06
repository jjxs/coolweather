import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { QmsControlDetails } from 'app/shared/model/qms-control-details.model';
import { QmsControlDetailsService } from './qms-control-details.service';
import { QmsControlDetailsComponent } from './qms-control-details.component';
import { QmsControlDetailsDetailComponent } from './qms-control-details-detail.component';
import { QmsControlDetailsUpdateComponent } from './qms-control-details-update.component';
import { QmsControlDetailsDeletePopupComponent } from './qms-control-details-delete-dialog.component';
import { IQmsControlDetails } from 'app/shared/model/qms-control-details.model';

@Injectable({ providedIn: 'root' })
export class QmsControlDetailsResolve implements Resolve<IQmsControlDetails> {
    constructor(private service: QmsControlDetailsService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<QmsControlDetails> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<QmsControlDetails>) => response.ok),
                map((qmsControlDetails: HttpResponse<QmsControlDetails>) => qmsControlDetails.body)
            );
        }
        return of(new QmsControlDetails());
    }
}

export const qmsControlDetailsRoute: Routes = [
    {
        path: '',
        component: QmsControlDetailsComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'id,asc',
            pageTitle: 'fccApp.qmsControlDetails.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'qms-control-details/:id/view',
        component: QmsControlDetailsDetailComponent,
        resolve: {
            qmsControlDetails: QmsControlDetailsResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'fccApp.qmsControlDetails.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'qms-control-details/new',
        component: QmsControlDetailsUpdateComponent,
        resolve: {
            qmsControlDetails: QmsControlDetailsResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'fccApp.qmsControlDetails.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'qms-control-details/:id/edit',
        component: QmsControlDetailsUpdateComponent,
        resolve: {
            qmsControlDetails: QmsControlDetailsResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'fccApp.qmsControlDetails.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const qmsControlDetailsPopupRoute: Routes = [
    {
        path: 'control/:id/delete',
        component: QmsControlDetailsDeletePopupComponent,
        resolve: {
            qmsControlDetails: QmsControlDetailsResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'fccApp.qmsControlDetails.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
