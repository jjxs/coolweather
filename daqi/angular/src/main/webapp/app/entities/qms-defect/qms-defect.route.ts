import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { QmsDefect } from 'app/shared/model/qms-defect.model';
import { QmsDefectService } from './qms-defect.service';
import { QmsDefectComponent } from './qms-defect.component';
import { QmsDefectDetailComponent } from './qms-defect-detail.component';
import { QmsDefectUpdateComponent } from './qms-defect-update.component';
import { QmsDefectDeletePopupComponent } from './qms-defect-delete-dialog.component';
import { IQmsDefect } from 'app/shared/model/qms-defect.model';

@Injectable({ providedIn: 'root' })
export class QmsDefectResolve implements Resolve<IQmsDefect> {
    constructor(private service: QmsDefectService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<QmsDefect> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<QmsDefect>) => response.ok),
                map((qmsDefect: HttpResponse<QmsDefect>) => qmsDefect.body)
            );
        }
        return of(new QmsDefect());
    }
}

export const qmsDefectRoute: Routes = [
    {
        path: 'qms-defect',
        component: QmsDefectComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'id,asc',
            pageTitle: 'fccApp.qmsDefect.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'qms-defect/:id/view',
        component: QmsDefectDetailComponent,
        resolve: {
            qmsDefect: QmsDefectResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'fccApp.qmsDefect.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'qms-defect/new',
        component: QmsDefectUpdateComponent,
        resolve: {
            qmsDefect: QmsDefectResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'fccApp.qmsDefect.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'qms-defect/:id/edit',
        component: QmsDefectUpdateComponent,
        resolve: {
            qmsDefect: QmsDefectResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'fccApp.qmsDefect.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const qmsDefectPopupRoute: Routes = [
    {
        path: 'qms-defect/:id/delete',
        component: QmsDefectDeletePopupComponent,
        resolve: {
            qmsDefect: QmsDefectResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'fccApp.qmsDefect.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
