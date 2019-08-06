import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { QmsBomTechnology } from 'app/shared/model/qms-bom-technology.model';
import { QmsBomTechnologyService } from './qms-bom-technology.service';
import { QmsBomTechnologyComponent } from './qms-bom-technology.component';
import { QmsBomTechnologyDetailComponent } from './qms-bom-technology-detail.component';
import { QmsBomTechnologyUpdateComponent } from './qms-bom-technology-update.component';
import { QmsBomTechnologyDeletePopupComponent } from './qms-bom-technology-delete-dialog.component';
import { IQmsBomTechnology } from 'app/shared/model/qms-bom-technology.model';

@Injectable({ providedIn: 'root' })
export class QmsBomTechnologyResolve implements Resolve<IQmsBomTechnology> {
    constructor(private service: QmsBomTechnologyService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<QmsBomTechnology> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<QmsBomTechnology>) => response.ok),
                map((qmsBomTechnology: HttpResponse<QmsBomTechnology>) => qmsBomTechnology.body)
            );
        }
        return of(new QmsBomTechnology());
    }
}

export const qmsBomTechnologyRoute: Routes = [
    {
        path: 'qms-bom-technology',
        component: QmsBomTechnologyComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'id,asc',
            pageTitle: 'fccApp.qmsBomTechnology.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'qms-bom-technology/:id/view',
        component: QmsBomTechnologyDetailComponent,
        resolve: {
            qmsBomTechnology: QmsBomTechnologyResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'fccApp.qmsBomTechnology.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'qms-bom-technology/new',
        component: QmsBomTechnologyUpdateComponent,
        resolve: {
            qmsBomTechnology: QmsBomTechnologyResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'fccApp.qmsBomTechnology.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'qms-bom-technology/:id/edit',
        component: QmsBomTechnologyUpdateComponent,
        resolve: {
            qmsBomTechnology: QmsBomTechnologyResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'fccApp.qmsBomTechnology.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const qmsBomTechnologyPopupRoute: Routes = [
    {
        path: 'qms-bom-technology/:id/delete',
        component: QmsBomTechnologyDeletePopupComponent,
        resolve: {
            qmsBomTechnology: QmsBomTechnologyResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'fccApp.qmsBomTechnology.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
