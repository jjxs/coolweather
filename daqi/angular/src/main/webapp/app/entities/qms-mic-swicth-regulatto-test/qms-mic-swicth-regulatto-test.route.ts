import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { QmsMicSwicthRegulattoTest } from 'app/shared/model/qms-mic-swicth-regulatto-test.model';
import { QmsMicSwicthRegulattoTestService } from './qms-mic-swicth-regulatto-test.service';
import { QmsMicSwicthRegulattoTestComponent } from './qms-mic-swicth-regulatto-test.component';
import { QmsMicSwicthRegulattoTestDetailComponent } from './qms-mic-swicth-regulatto-test-detail.component';
import { QmsMicSwicthRegulattoTestUpdateComponent } from './qms-mic-swicth-regulatto-test-update.component';
import { QmsMicSwicthRegulattoTestDeletePopupComponent } from './qms-mic-swicth-regulatto-test-delete-dialog.component';
import { IQmsMicSwicthRegulattoTest } from 'app/shared/model/qms-mic-swicth-regulatto-test.model';

@Injectable({ providedIn: 'root' })
export class QmsMicSwicthRegulattoTestResolve implements Resolve<IQmsMicSwicthRegulattoTest> {
    constructor(private service: QmsMicSwicthRegulattoTestService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<QmsMicSwicthRegulattoTest> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<QmsMicSwicthRegulattoTest>) => response.ok),
                map((qmsMicSwicthRegulattoTest: HttpResponse<QmsMicSwicthRegulattoTest>) => qmsMicSwicthRegulattoTest.body)
            );
        }
        return of(new QmsMicSwicthRegulattoTest());
    }
}

export const qmsMicSwicthRegulattoTestRoute: Routes = [
    {
        path: 'qms-mic-swicth-regulatto-test',
        component: QmsMicSwicthRegulattoTestComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'id,asc',
            pageTitle: 'fccApp.qmsMicSwicthRegulattoTest.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'qms-mic-swicth-regulatto-test/:id/view',
        component: QmsMicSwicthRegulattoTestDetailComponent,
        resolve: {
            qmsMicSwicthRegulattoTest: QmsMicSwicthRegulattoTestResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'fccApp.qmsMicSwicthRegulattoTest.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'qms-mic-swicth-regulatto-test/new',
        component: QmsMicSwicthRegulattoTestUpdateComponent,
        resolve: {
            qmsMicSwicthRegulattoTest: QmsMicSwicthRegulattoTestResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'fccApp.qmsMicSwicthRegulattoTest.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'qms-mic-swicth-regulatto-test/:id/edit',
        component: QmsMicSwicthRegulattoTestUpdateComponent,
        resolve: {
            qmsMicSwicthRegulattoTest: QmsMicSwicthRegulattoTestResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'fccApp.qmsMicSwicthRegulattoTest.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const qmsMicSwicthRegulattoTestPopupRoute: Routes = [
    {
        path: 'qms-mic-swicth-regulatto-test/:id/delete',
        component: QmsMicSwicthRegulattoTestDeletePopupComponent,
        resolve: {
            qmsMicSwicthRegulattoTest: QmsMicSwicthRegulattoTestResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'fccApp.qmsMicSwicthRegulattoTest.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
