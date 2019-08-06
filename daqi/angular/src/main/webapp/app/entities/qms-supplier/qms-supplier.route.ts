import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { QmsSupplier } from 'app/shared/model/qms-supplier.model';
import { QmsSupplierService } from './qms-supplier.service';
import { QmsSupplierComponent } from './qms-supplier.component';
import { QmsSupplierDetailComponent } from './qms-supplier-detail.component';
import { QmsSupplierUpdateComponent } from './qms-supplier-update.component';
import { QmsSupplierDeletePopupComponent } from './qms-supplier-delete-dialog.component';
import { IQmsSupplier } from 'app/shared/model/qms-supplier.model';

@Injectable({ providedIn: 'root' })
export class QmsSupplierResolve implements Resolve<IQmsSupplier> {
    constructor(private service: QmsSupplierService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<QmsSupplier> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<QmsSupplier>) => response.ok),
                map((qmsSupplier: HttpResponse<QmsSupplier>) => qmsSupplier.body)
            );
        }
        return of(new QmsSupplier());
    }
}

export const qmsSupplierRoute: Routes = [
    {
        path: 'qms-supplier',
        component: QmsSupplierComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'id,asc',
            pageTitle: 'fccApp.qmsSupplier.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'qms-supplier/:id/view',
        component: QmsSupplierDetailComponent,
        resolve: {
            qmsSupplier: QmsSupplierResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'fccApp.qmsSupplier.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'qms-supplier/new',
        component: QmsSupplierUpdateComponent,
        resolve: {
            qmsSupplier: QmsSupplierResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'fccApp.qmsSupplier.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'qms-supplier/:id/edit',
        component: QmsSupplierUpdateComponent,
        resolve: {
            qmsSupplier: QmsSupplierResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'fccApp.qmsSupplier.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const qmsSupplierPopupRoute: Routes = [
    {
        path: 'qms-supplier/:id/delete',
        component: QmsSupplierDeletePopupComponent,
        resolve: {
            qmsSupplier: QmsSupplierResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'fccApp.qmsSupplier.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
