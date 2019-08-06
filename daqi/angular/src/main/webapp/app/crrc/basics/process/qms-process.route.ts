import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { QmsProcess } from 'app/shared/model/qms-process.model';
import { QmsProcessService } from './qms-process.service';
import { QmsProcessComponent } from './qms-process.component';
import { QmsProcessDetailComponent } from './qms-process-detail.component';
import { QmsProcessUpdateComponent } from './qms-process-update.component';
import { QmsProcessDeletePopupComponent } from './qms-process-delete-dialog.component';
import { IQmsProcess } from 'app/shared/model/qms-process.model';

@Injectable({ providedIn: 'root' })
export class QmsProcessResolve implements Resolve<IQmsProcess> {
    constructor(private service: QmsProcessService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<QmsProcess> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<QmsProcess>) => response.ok),
                map((qmsProcess: HttpResponse<QmsProcess>) => qmsProcess.body)
            );
        }
        return of(new QmsProcess());
    }
}

export const qmsProcessRoute: Routes = [
    {
        path: '',
        component: QmsProcessComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'id,asc',
            pageTitle: 'fccApp.qmsProcess.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'qms-process/:id/view',
        component: QmsProcessDetailComponent,
        resolve: {
            qmsProcess: QmsProcessResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'fccApp.qmsProcess.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'qms-process/new',
        component: QmsProcessUpdateComponent,
        resolve: {
            qmsProcess: QmsProcessResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'fccApp.qmsProcess.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'qms-process/:id/edit',
        component: QmsProcessUpdateComponent,
        resolve: {
            qmsProcess: QmsProcessResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'fccApp.qmsProcess.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const qmsProcessPopupRoute: Routes = [
    {
        path: 'process/:id/delete',
        component: QmsProcessDeletePopupComponent,
        resolve: {
            qmsProcess: QmsProcessResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'fccApp.qmsProcess.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
