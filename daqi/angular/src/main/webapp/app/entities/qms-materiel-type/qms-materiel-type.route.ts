import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { QmsMaterielType } from 'app/shared/model/qms-materiel-type.model';
import { QmsMaterielTypeService } from './qms-materiel-type.service';
import { QmsMaterielTypeComponent } from './qms-materiel-type.component';
import { QmsMaterielTypeDetailComponent } from './qms-materiel-type-detail.component';
import { QmsMaterielTypeUpdateComponent } from './qms-materiel-type-update.component';
import { QmsMaterielTypeDeletePopupComponent } from './qms-materiel-type-delete-dialog.component';
import { IQmsMaterielType } from 'app/shared/model/qms-materiel-type.model';

@Injectable({ providedIn: 'root' })
export class QmsMaterielTypeResolve implements Resolve<IQmsMaterielType> {
    constructor(private service: QmsMaterielTypeService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<QmsMaterielType> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<QmsMaterielType>) => response.ok),
                map((qmsMaterielType: HttpResponse<QmsMaterielType>) => qmsMaterielType.body)
            );
        }
        return of(new QmsMaterielType());
    }
}

export const qmsMaterielTypeRoute: Routes = [
    {
        path: 'qms-materiel-type',
        component: QmsMaterielTypeComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'id,asc',
            pageTitle: 'fccApp.qmsMaterielType.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'qms-materiel-type/:id/view',
        component: QmsMaterielTypeDetailComponent,
        resolve: {
            qmsMaterielType: QmsMaterielTypeResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'fccApp.qmsMaterielType.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'qms-materiel-type/new',
        component: QmsMaterielTypeUpdateComponent,
        resolve: {
            qmsMaterielType: QmsMaterielTypeResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'fccApp.qmsMaterielType.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'qms-materiel-type/:id/edit',
        component: QmsMaterielTypeUpdateComponent,
        resolve: {
            qmsMaterielType: QmsMaterielTypeResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'fccApp.qmsMaterielType.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const qmsMaterielTypePopupRoute: Routes = [
    {
        path: 'qms-materiel-type/:id/delete',
        component: QmsMaterielTypeDeletePopupComponent,
        resolve: {
            qmsMaterielType: QmsMaterielTypeResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'fccApp.qmsMaterielType.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
