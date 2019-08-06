import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { QmsMaterielSupplier } from 'app/shared/model/qms-materiel-supplier.model';
import { QmsMaterielSupplierService } from './qms-materiel-supplier.service';
import { QmsMaterielSupplierComponent } from './qms-materiel-supplier.component';
import { QmsMaterielSupplierDetailComponent } from './qms-materiel-supplier-detail.component';
import { QmsMaterielSupplierUpdateComponent } from './qms-materiel-supplier-update.component';
import { QmsMaterielSupplierDeletePopupComponent } from './qms-materiel-supplier-delete-dialog.component';
import { IQmsMaterielSupplier } from 'app/shared/model/qms-materiel-supplier.model';

@Injectable({ providedIn: 'root' })
export class QmsMaterielSupplierResolve implements Resolve<IQmsMaterielSupplier> {
    constructor(private service: QmsMaterielSupplierService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<QmsMaterielSupplier> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<QmsMaterielSupplier>) => response.ok),
                map((qmsMaterielSupplier: HttpResponse<QmsMaterielSupplier>) => qmsMaterielSupplier.body)
            );
        }
        return of(new QmsMaterielSupplier());
    }
}

export const qmsMaterielSupplierRoute: Routes = [
    {
        path: 'qms-materiel-supplier',
        component: QmsMaterielSupplierComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'id,asc',
            pageTitle: 'fccApp.qmsMaterielSupplier.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'qms-materiel-supplier/:id/view',
        component: QmsMaterielSupplierDetailComponent,
        resolve: {
            qmsMaterielSupplier: QmsMaterielSupplierResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'fccApp.qmsMaterielSupplier.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'qms-materiel-supplier/new',
        component: QmsMaterielSupplierUpdateComponent,
        resolve: {
            qmsMaterielSupplier: QmsMaterielSupplierResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'fccApp.qmsMaterielSupplier.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'qms-materiel-supplier/:id/edit',
        component: QmsMaterielSupplierUpdateComponent,
        resolve: {
            qmsMaterielSupplier: QmsMaterielSupplierResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'fccApp.qmsMaterielSupplier.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const qmsMaterielSupplierPopupRoute: Routes = [
    {
        path: 'qms-materiel-supplier/:id/delete',
        component: QmsMaterielSupplierDeletePopupComponent,
        resolve: {
            qmsMaterielSupplier: QmsMaterielSupplierResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'fccApp.qmsMaterielSupplier.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
