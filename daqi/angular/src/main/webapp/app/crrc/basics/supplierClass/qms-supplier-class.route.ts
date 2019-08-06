import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { QmsSupplierClass } from 'app/shared/model/qms-supplier-class.model';
import { QmsSupplierClassService } from './qms-supplier-class.service';
import { QmsSupplierClassComponent } from './qms-supplier-class.component';
import { QmsSupplierClassDetailComponent } from './qms-supplier-class-detail.component';
import { QmsSupplierClassUpdateComponent } from './qms-supplier-class-update.component';
import { QmsSupplierClassDeletePopupComponent } from './qms-supplier-class-delete-dialog.component';
import { IQmsSupplierClass } from 'app/shared/model/qms-supplier-class.model';

@Injectable({ providedIn: 'root' })
export class QmsSupplierClassResolve implements Resolve<IQmsSupplierClass> {
    constructor(private service: QmsSupplierClassService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<QmsSupplierClass> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<QmsSupplierClass>) => response.ok),
                map((qmsSupplierClass: HttpResponse<QmsSupplierClass>) => qmsSupplierClass.body)
            );
        }
        return of(new QmsSupplierClass());
    }
}

export const qmsSupplierClassRoute: Routes = [
    {
        path: '',
        component: QmsSupplierClassComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'id,asc',
            pageTitle: 'fccApp.qmsSupplierClass.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'qms-supplier-class/:id/view',
        component: QmsSupplierClassDetailComponent,
        resolve: {
            qmsSupplierClass: QmsSupplierClassResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'fccApp.qmsSupplierClass.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'qms-supplier-class/new',
        component: QmsSupplierClassUpdateComponent,
        resolve: {
            qmsSupplierClass: QmsSupplierClassResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'fccApp.qmsSupplierClass.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'qms-supplier-class/:id/edit',
        component: QmsSupplierClassUpdateComponent,
        resolve: {
            qmsSupplierClass: QmsSupplierClassResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'fccApp.qmsSupplierClass.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const qmsSupplierClassPopupRoute: Routes = [
    {
        path: 'supplierClass/:id/delete',
        component: QmsSupplierClassDeletePopupComponent,
        resolve: {
            qmsSupplierClass: QmsSupplierClassResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'fccApp.qmsSupplierClass.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
