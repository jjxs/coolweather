import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { QmsProduct } from 'app/shared/model/qms-product.model';
import { QmsProductService } from './qms-product.service';
import { QmsProductComponent1 } from './qms-product.component';
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
        path: '',
        component: QmsProductComponent1,
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
    
];

export const qmsProductPopupRoute: Routes = [
   
];
