import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { QmsBom } from 'app/shared/model/qms-bom.model';
import { QmsBomService } from './qms-bom.service';
import { QmsBomComponent } from './qms-bom.component';
import { QmsBomDetailComponent } from './qms-bom-detail.component';
import { QmsBomUpdateComponent } from './qms-bom-update.component';
import { QmsBomDeletePopupComponent } from './qms-bom-delete-dialog.component';
import { IQmsBom } from 'app/shared/model/qms-bom.model';

@Injectable({ providedIn: 'root' })
export class QmsBomResolve implements Resolve<IQmsBom> {
    constructor(private service: QmsBomService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<QmsBom> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<QmsBom>) => response.ok),
                map((qmsBom: HttpResponse<QmsBom>) => qmsBom.body)
            );
        }
        return of(new QmsBom());
    }
}

export const qmsBomRoute: Routes = [
    {
        path: 'qms-bom',
        component: QmsBomComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'id,asc',
            pageTitle: 'fccApp.qmsBom.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'qms-bom/:id/view',
        component: QmsBomDetailComponent,
        resolve: {
            qmsBom: QmsBomResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'fccApp.qmsBom.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'qms-bom/new',
        component: QmsBomUpdateComponent,
        resolve: {
            qmsBom: QmsBomResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'fccApp.qmsBom.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'qms-bom/:id/edit',
        component: QmsBomUpdateComponent,
        resolve: {
            qmsBom: QmsBomResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'fccApp.qmsBom.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const qmsBomPopupRoute: Routes = [
    {
        path: 'qms-bom/:id/delete',
        component: QmsBomDeletePopupComponent,
        resolve: {
            qmsBom: QmsBomResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'fccApp.qmsBom.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
