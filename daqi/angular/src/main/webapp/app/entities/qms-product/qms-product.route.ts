import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { QmsProduct } from 'app/shared/model/qms-product.model';
import { QmsProductService } from './qms-product.service';
import { QmsProductComponent } from './qms-product.component';
import { QmsProductDetailComponent } from './qms-product-detail.component';
import { QmsProductUpdateComponent } from './qms-product-update.component';
import { QmsProductDeletePopupComponent } from './qms-product-delete-dialog.component';
import { IQmsProduct } from 'app/shared/model/qms-product.model';

@Injectable({ providedIn: 'root' })
export class QmsProductResolve implements Resolve<IQmsProduct> {
    constructor(private service: QmsProductService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<QmsProduct> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<QmsProduct>) => response.ok),
                map((qmsProduct: HttpResponse<QmsProduct>) => qmsProduct.body)
            );
        }
        return of(new QmsProduct());
    }
}

export const qmsProductRoute: Routes = [
    {
        path: 'qms-product',
        component: QmsProductComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'id,asc',
            pageTitle: 'fccApp.qmsProduct.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'qms-product/:id/view',
        component: QmsProductDetailComponent,
        resolve: {
            qmsProduct: QmsProductResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'fccApp.qmsProduct.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'qms-product/new',
        component: QmsProductUpdateComponent,
        resolve: {
            qmsProduct: QmsProductResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'fccApp.qmsProduct.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'qms-product/:id/edit',
        component: QmsProductUpdateComponent,
        resolve: {
            qmsProduct: QmsProductResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'fccApp.qmsProduct.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const qmsProductPopupRoute: Routes = [
    {
        path: 'qms-product/:id/delete',
        component: QmsProductDeletePopupComponent,
        resolve: {
            qmsProduct: QmsProductResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'fccApp.qmsProduct.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
