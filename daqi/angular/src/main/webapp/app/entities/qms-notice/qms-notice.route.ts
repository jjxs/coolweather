import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { QmsNotice } from 'app/shared/model/qms-notice.model';
import { QmsNoticeService } from './qms-notice.service';
import { QmsNoticeComponent } from './qms-notice.component';
import { QmsNoticeDetailComponent } from './qms-notice-detail.component';
import { QmsNoticeUpdateComponent } from './qms-notice-update.component';
import { QmsNoticeDeletePopupComponent } from './qms-notice-delete-dialog.component';
import { IQmsNotice } from 'app/shared/model/qms-notice.model';

@Injectable({ providedIn: 'root' })
export class QmsNoticeResolve implements Resolve<IQmsNotice> {
    constructor(private service: QmsNoticeService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<QmsNotice> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<QmsNotice>) => response.ok),
                map((qmsNotice: HttpResponse<QmsNotice>) => qmsNotice.body)
            );
        }
        return of(new QmsNotice());
    }
}

export const qmsNoticeRoute: Routes = [
    {
        path: 'qms-notice',
        component: QmsNoticeComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'id,asc',
            pageTitle: 'fccApp.qmsNotice.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'qms-notice/:id/view',
        component: QmsNoticeDetailComponent,
        resolve: {
            qmsNotice: QmsNoticeResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'fccApp.qmsNotice.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'qms-notice/new',
        component: QmsNoticeUpdateComponent,
        resolve: {
            qmsNotice: QmsNoticeResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'fccApp.qmsNotice.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'qms-notice/:id/edit',
        component: QmsNoticeUpdateComponent,
        resolve: {
            qmsNotice: QmsNoticeResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'fccApp.qmsNotice.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const qmsNoticePopupRoute: Routes = [
    {
        path: 'qms-notice/:id/delete',
        component: QmsNoticeDeletePopupComponent,
        resolve: {
            qmsNotice: QmsNoticeResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'fccApp.qmsNotice.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
