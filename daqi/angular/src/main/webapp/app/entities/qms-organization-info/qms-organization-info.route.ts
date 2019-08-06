import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { QmsOrganizationInfo } from 'app/shared/model/qms-organization-info.model';
import { QmsOrganizationInfoService } from './qms-organization-info.service';
import { QmsOrganizationInfoComponent } from './qms-organization-info.component';
import { QmsOrganizationInfoDetailComponent } from './qms-organization-info-detail.component';
import { QmsOrganizationInfoUpdateComponent } from './qms-organization-info-update.component';
import { QmsOrganizationInfoDeletePopupComponent } from './qms-organization-info-delete-dialog.component';
import { IQmsOrganizationInfo } from 'app/shared/model/qms-organization-info.model';

@Injectable({ providedIn: 'root' })
export class QmsOrganizationInfoResolve implements Resolve<IQmsOrganizationInfo> {
    constructor(private service: QmsOrganizationInfoService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<QmsOrganizationInfo> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<QmsOrganizationInfo>) => response.ok),
                map((qmsOrganizationInfo: HttpResponse<QmsOrganizationInfo>) => qmsOrganizationInfo.body)
            );
        }
        return of(new QmsOrganizationInfo());
    }
}

export const qmsOrganizationInfoRoute: Routes = [
    {
        path: 'qms-organization-info',
        component: QmsOrganizationInfoComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'id,asc',
            pageTitle: 'fccApp.qmsOrganizationInfo.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'qms-organization-info/:id/view',
        component: QmsOrganizationInfoDetailComponent,
        resolve: {
            qmsOrganizationInfo: QmsOrganizationInfoResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'fccApp.qmsOrganizationInfo.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'qms-organization-info/new',
        component: QmsOrganizationInfoUpdateComponent,
        resolve: {
            qmsOrganizationInfo: QmsOrganizationInfoResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'fccApp.qmsOrganizationInfo.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'qms-organization-info/:id/edit',
        component: QmsOrganizationInfoUpdateComponent,
        resolve: {
            qmsOrganizationInfo: QmsOrganizationInfoResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'fccApp.qmsOrganizationInfo.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const qmsOrganizationInfoPopupRoute: Routes = [
    {
        path: 'qms-organization-info/:id/delete',
        component: QmsOrganizationInfoDeletePopupComponent,
        resolve: {
            qmsOrganizationInfo: QmsOrganizationInfoResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'fccApp.qmsOrganizationInfo.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
