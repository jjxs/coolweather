import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { QmsApproveResult } from 'app/shared/model/qms-approve-result.model';
import { QmsApproveResultService } from './qms-approve-result.service';
import { QmsApproveResultComponent } from './qms-approve-result.component';
import { QmsApproveResultDetailComponent } from './qms-approve-result-detail.component';
import { QmsApproveResultUpdateComponent } from './qms-approve-result-update.component';
import { QmsApproveResultDeletePopupComponent } from './qms-approve-result-delete-dialog.component';
import { IQmsApproveResult } from 'app/shared/model/qms-approve-result.model';

@Injectable({ providedIn: 'root' })
export class QmsApproveResultResolve implements Resolve<IQmsApproveResult> {
    constructor(private service: QmsApproveResultService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<QmsApproveResult> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<QmsApproveResult>) => response.ok),
                map((qmsApproveResult: HttpResponse<QmsApproveResult>) => qmsApproveResult.body)
            );
        }
        return of(new QmsApproveResult());
    }
}

export const qmsApproveResultRoute: Routes = [
    {
        path: 'qms-approve-result',
        component: QmsApproveResultComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'id,asc',
            pageTitle: 'fccApp.qmsApproveResult.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'qms-approve-result/:id/view',
        component: QmsApproveResultDetailComponent,
        resolve: {
            qmsApproveResult: QmsApproveResultResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'fccApp.qmsApproveResult.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'qms-approve-result/new',
        component: QmsApproveResultUpdateComponent,
        resolve: {
            qmsApproveResult: QmsApproveResultResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'fccApp.qmsApproveResult.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'qms-approve-result/:id/edit',
        component: QmsApproveResultUpdateComponent,
        resolve: {
            qmsApproveResult: QmsApproveResultResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'fccApp.qmsApproveResult.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const qmsApproveResultPopupRoute: Routes = [
    {
        path: 'qms-approve-result/:id/delete',
        component: QmsApproveResultDeletePopupComponent,
        resolve: {
            qmsApproveResult: QmsApproveResultResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'fccApp.qmsApproveResult.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
