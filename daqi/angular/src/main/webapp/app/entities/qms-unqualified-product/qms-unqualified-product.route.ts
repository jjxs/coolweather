import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { QmsUnqualifiedProduct } from 'app/shared/model/qms-unqualified-product.model';
import { QmsUnqualifiedProductService } from './qms-unqualified-product.service';
import { QmsUnqualifiedProductComponent } from './qms-unqualified-product.component';
import { QmsUnqualifiedProductDetailComponent } from './qms-unqualified-product-detail.component';
import { QmsUnqualifiedProductUpdateComponent } from './qms-unqualified-product-update.component';
import { QmsUnqualifiedProductDeletePopupComponent } from './qms-unqualified-product-delete-dialog.component';
import { IQmsUnqualifiedProduct } from 'app/shared/model/qms-unqualified-product.model';

@Injectable({ providedIn: 'root' })
export class QmsUnqualifiedProductResolve implements Resolve<IQmsUnqualifiedProduct> {
    constructor(private service: QmsUnqualifiedProductService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<QmsUnqualifiedProduct> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<QmsUnqualifiedProduct>) => response.ok),
                map((qmsUnqualifiedProduct: HttpResponse<QmsUnqualifiedProduct>) => qmsUnqualifiedProduct.body)
            );
        }
        return of(new QmsUnqualifiedProduct());
    }
}

export const qmsUnqualifiedProductRoute: Routes = [
    {
        path: 'qms-unqualified-product',
        component: QmsUnqualifiedProductComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'id,asc',
            pageTitle: 'fccApp.qmsUnqualifiedProduct.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'qms-unqualified-product/:id/view',
        component: QmsUnqualifiedProductDetailComponent,
        resolve: {
            qmsUnqualifiedProduct: QmsUnqualifiedProductResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'fccApp.qmsUnqualifiedProduct.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'qms-unqualified-product/new',
        component: QmsUnqualifiedProductUpdateComponent,
        resolve: {
            qmsUnqualifiedProduct: QmsUnqualifiedProductResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'fccApp.qmsUnqualifiedProduct.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'qms-unqualified-product/:id/edit',
        component: QmsUnqualifiedProductUpdateComponent,
        resolve: {
            qmsUnqualifiedProduct: QmsUnqualifiedProductResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'fccApp.qmsUnqualifiedProduct.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const qmsUnqualifiedProductPopupRoute: Routes = [
    {
        path: 'qms-unqualified-product/:id/delete',
        component: QmsUnqualifiedProductDeletePopupComponent,
        resolve: {
            qmsUnqualifiedProduct: QmsUnqualifiedProductResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'fccApp.qmsUnqualifiedProduct.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
