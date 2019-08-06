import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { QmsApproveFlow } from 'app/shared/model/qms-approve-flow.model';
import { QmsApproveFlowService } from './qms-approve-flow.service';
import { QmsApproveFlowComponent } from './qms-approve-flow.component';
import { QmsApproveFlowDetailComponent } from './qms-approve-flow-detail.component';
import { QmsApproveFlowUpdateComponent } from './qms-approve-flow-update.component';
import { QmsApproveFlowDeletePopupComponent } from './qms-approve-flow-delete-dialog.component';
import { IQmsApproveFlow } from 'app/shared/model/qms-approve-flow.model';

@Injectable({ providedIn: 'root' })
export class QmsApproveFlowResolve implements Resolve<IQmsApproveFlow> {
    constructor(private service: QmsApproveFlowService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<QmsApproveFlow> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<QmsApproveFlow>) => response.ok),
                map((qmsApproveFlow: HttpResponse<QmsApproveFlow>) => qmsApproveFlow.body)
            );
        }
        return of(new QmsApproveFlow());
    }
}

export const qmsApproveFlowRoute: Routes = [
    {
        path: 'qms-approve-flow',
        component: QmsApproveFlowComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'id,asc',
            pageTitle: 'fccApp.qmsApproveFlow.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'qms-approve-flow/:id/view',
        component: QmsApproveFlowDetailComponent,
        resolve: {
            qmsApproveFlow: QmsApproveFlowResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'fccApp.qmsApproveFlow.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'qms-approve-flow/new',
        component: QmsApproveFlowUpdateComponent,
        resolve: {
            qmsApproveFlow: QmsApproveFlowResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'fccApp.qmsApproveFlow.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'qms-approve-flow/:id/edit',
        component: QmsApproveFlowUpdateComponent,
        resolve: {
            qmsApproveFlow: QmsApproveFlowResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'fccApp.qmsApproveFlow.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const qmsApproveFlowPopupRoute: Routes = [
    {
        path: 'qms-approve-flow/:id/delete',
        component: QmsApproveFlowDeletePopupComponent,
        resolve: {
            qmsApproveFlow: QmsApproveFlowResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'fccApp.qmsApproveFlow.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
