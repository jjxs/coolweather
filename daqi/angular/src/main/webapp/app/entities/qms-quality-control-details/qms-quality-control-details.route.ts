import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { QmsQualityControlDetails } from 'app/shared/model/qms-quality-control-details.model';
import { QmsQualityControlDetailsService } from './qms-quality-control-details.service';
import { QmsQualityControlDetailsComponent } from './qms-quality-control-details.component';
import { QmsQualityControlDetailsDetailComponent } from './qms-quality-control-details-detail.component';
import { QmsQualityControlDetailsUpdateComponent } from './qms-quality-control-details-update.component';
import { QmsQualityControlDetailsDeletePopupComponent } from './qms-quality-control-details-delete-dialog.component';
import { IQmsQualityControlDetails } from 'app/shared/model/qms-quality-control-details.model';

@Injectable({ providedIn: 'root' })
export class QmsQualityControlDetailsResolve implements Resolve<IQmsQualityControlDetails> {
    constructor(private service: QmsQualityControlDetailsService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<QmsQualityControlDetails> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<QmsQualityControlDetails>) => response.ok),
                map((qmsQualityControlDetails: HttpResponse<QmsQualityControlDetails>) => qmsQualityControlDetails.body)
            );
        }
        return of(new QmsQualityControlDetails());
    }
}

export const qmsQualityControlDetailsRoute: Routes = [
    {
        path: 'qms-quality-control-details',
        component: QmsQualityControlDetailsComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'id,asc',
            pageTitle: 'fccApp.qmsQualityControlDetails.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'qms-quality-control-details/:id/view',
        component: QmsQualityControlDetailsDetailComponent,
        resolve: {
            qmsQualityControlDetails: QmsQualityControlDetailsResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'fccApp.qmsQualityControlDetails.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'qms-quality-control-details/new',
        component: QmsQualityControlDetailsUpdateComponent,
        resolve: {
            qmsQualityControlDetails: QmsQualityControlDetailsResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'fccApp.qmsQualityControlDetails.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'qms-quality-control-details/:id/edit',
        component: QmsQualityControlDetailsUpdateComponent,
        resolve: {
            qmsQualityControlDetails: QmsQualityControlDetailsResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'fccApp.qmsQualityControlDetails.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const qmsQualityControlDetailsPopupRoute: Routes = [
    {
        path: 'qms-quality-control-details/:id/delete',
        component: QmsQualityControlDetailsDeletePopupComponent,
        resolve: {
            qmsQualityControlDetails: QmsQualityControlDetailsResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'fccApp.qmsQualityControlDetails.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
