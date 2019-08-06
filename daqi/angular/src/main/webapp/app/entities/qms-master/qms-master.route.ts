import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { QmsMaster } from 'app/shared/model/qms-master.model';
import { QmsMasterService } from './qms-master.service';
import { QmsMasterComponent } from './qms-master.component';
import { QmsMasterDetailComponent } from './qms-master-detail.component';
import { QmsMasterUpdateComponent } from './qms-master-update.component';
import { QmsMasterDeletePopupComponent } from './qms-master-delete-dialog.component';
import { IQmsMaster } from 'app/shared/model/qms-master.model';

@Injectable({ providedIn: 'root' })
export class QmsMasterResolve implements Resolve<IQmsMaster> {
    constructor(private service: QmsMasterService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<QmsMaster> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<QmsMaster>) => response.ok),
                map((qmsMaster: HttpResponse<QmsMaster>) => qmsMaster.body)
            );
        }
        return of(new QmsMaster());
    }
}

export const qmsMasterRoute: Routes = [
    {
        path: 'qms-master',
        component: QmsMasterComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'id,asc',
            pageTitle: 'fccApp.qmsMaster.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'qms-master/:id/view',
        component: QmsMasterDetailComponent,
        resolve: {
            qmsMaster: QmsMasterResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'fccApp.qmsMaster.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'qms-master/new',
        component: QmsMasterUpdateComponent,
        resolve: {
            qmsMaster: QmsMasterResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'fccApp.qmsMaster.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'qms-master/:id/edit',
        component: QmsMasterUpdateComponent,
        resolve: {
            qmsMaster: QmsMasterResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'fccApp.qmsMaster.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const qmsMasterPopupRoute: Routes = [
    {
        path: 'qms-master/:id/delete',
        component: QmsMasterDeletePopupComponent,
        resolve: {
            qmsMaster: QmsMasterResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'fccApp.qmsMaster.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
