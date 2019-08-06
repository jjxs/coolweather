import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { QmsUnqualifiedProductDetails } from 'app/shared/model/qms-unqualified-product-details.model';
import { QmsUnqualifiedProductDetailsService } from './qms-unqualified-product-details.service';
import { QmsUnqualifiedProductDetailsComponent } from './qms-unqualified-product-details.component';
import { QmsUnqualifiedProductDetailsDetailComponent } from './qms-unqualified-product-details-detail.component';
import { QmsUnqualifiedProductDetailsUpdateComponent } from './qms-unqualified-product-details-update.component';
import { QmsUnqualifiedProductDetailsDeletePopupComponent } from './qms-unqualified-product-details-delete-dialog.component';
import { IQmsUnqualifiedProductDetails } from 'app/shared/model/qms-unqualified-product-details.model';

@Injectable({ providedIn: 'root' })
export class QmsUnqualifiedProductDetailsResolve implements Resolve<IQmsUnqualifiedProductDetails> {
    constructor(private service: QmsUnqualifiedProductDetailsService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<QmsUnqualifiedProductDetails> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<QmsUnqualifiedProductDetails>) => response.ok),
                map((qmsUnqualifiedProductDetails: HttpResponse<QmsUnqualifiedProductDetails>) => qmsUnqualifiedProductDetails.body)
            );
        }
        return of(new QmsUnqualifiedProductDetails());
    }
}

export const qmsUnqualifiedProductDetailsRoute: Routes = [
    {
        path: 'qms-unqualified-product-details',
        component: QmsUnqualifiedProductDetailsComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'id,asc',
            pageTitle: 'fccApp.qmsUnqualifiedProductDetails.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'qms-unqualified-product-details/:id/view',
        component: QmsUnqualifiedProductDetailsDetailComponent,
        resolve: {
            qmsUnqualifiedProductDetails: QmsUnqualifiedProductDetailsResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'fccApp.qmsUnqualifiedProductDetails.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'qms-unqualified-product-details/new',
        component: QmsUnqualifiedProductDetailsUpdateComponent,
        resolve: {
            qmsUnqualifiedProductDetails: QmsUnqualifiedProductDetailsResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'fccApp.qmsUnqualifiedProductDetails.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'qms-unqualified-product-details/:id/edit',
        component: QmsUnqualifiedProductDetailsUpdateComponent,
        resolve: {
            qmsUnqualifiedProductDetails: QmsUnqualifiedProductDetailsResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'fccApp.qmsUnqualifiedProductDetails.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const qmsUnqualifiedProductDetailsPopupRoute: Routes = [
    {
        path: 'qms-unqualified-product-details/:id/delete',
        component: QmsUnqualifiedProductDetailsDeletePopupComponent,
        resolve: {
            qmsUnqualifiedProductDetails: QmsUnqualifiedProductDetailsResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'fccApp.qmsUnqualifiedProductDetails.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
