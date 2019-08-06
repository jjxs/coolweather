import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { QmsInspectionInfo } from 'app/shared/model/qms-inspection-info.model';
import { QmsInspectionInfoService } from './qms-inspection-info.service';
import { QmsInspectionInfoComponent } from './qms-inspection-info.component';
import { QmsInspectionInfoDetailComponent } from './qms-inspection-info-detail.component';
import { QmsInspectionInfoUpdateComponent } from './qms-inspection-info-update.component';
import { QmsInspectionInfoDeletePopupComponent } from './qms-inspection-info-delete-dialog.component';
import { IQmsInspectionInfo } from 'app/shared/model/qms-inspection-info.model';

@Injectable({ providedIn: 'root' })
export class QmsInspectionInfoResolve implements Resolve<IQmsInspectionInfo> {
    constructor(private service: QmsInspectionInfoService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<QmsInspectionInfo> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<QmsInspectionInfo>) => response.ok),
                map((qmsInspectionInfo: HttpResponse<QmsInspectionInfo>) => qmsInspectionInfo.body)
            );
        }
        return of(new QmsInspectionInfo());
    }
}

export const qmsInspectionInfoRoute: Routes = [
    {
        path: 'qms-inspection-info',
        component: QmsInspectionInfoComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'id,asc',
            pageTitle: 'fccApp.qmsInspectionInfo.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'qms-inspection-info/:id/view',
        component: QmsInspectionInfoDetailComponent,
        resolve: {
            qmsInspectionInfo: QmsInspectionInfoResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'fccApp.qmsInspectionInfo.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'qms-inspection-info/new',
        component: QmsInspectionInfoUpdateComponent,
        resolve: {
            qmsInspectionInfo: QmsInspectionInfoResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'fccApp.qmsInspectionInfo.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'qms-inspection-info/:id/edit',
        component: QmsInspectionInfoUpdateComponent,
        resolve: {
            qmsInspectionInfo: QmsInspectionInfoResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'fccApp.qmsInspectionInfo.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const qmsInspectionInfoPopupRoute: Routes = [
    {
        path: 'qms-inspection-info/:id/delete',
        component: QmsInspectionInfoDeletePopupComponent,
        resolve: {
            qmsInspectionInfo: QmsInspectionInfoResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'fccApp.qmsInspectionInfo.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
