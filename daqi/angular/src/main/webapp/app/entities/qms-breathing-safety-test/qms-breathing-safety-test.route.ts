import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { QmsBreathingSafetyTest } from 'app/shared/model/qms-breathing-safety-test.model';
import { QmsBreathingSafetyTestService } from './qms-breathing-safety-test.service';
import { QmsBreathingSafetyTestComponent } from './qms-breathing-safety-test.component';
import { QmsBreathingSafetyTestDetailComponent } from './qms-breathing-safety-test-detail.component';
import { QmsBreathingSafetyTestUpdateComponent } from './qms-breathing-safety-test-update.component';
import { QmsBreathingSafetyTestDeletePopupComponent } from './qms-breathing-safety-test-delete-dialog.component';
import { IQmsBreathingSafetyTest } from 'app/shared/model/qms-breathing-safety-test.model';

@Injectable({ providedIn: 'root' })
export class QmsBreathingSafetyTestResolve implements Resolve<IQmsBreathingSafetyTest> {
    constructor(private service: QmsBreathingSafetyTestService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<QmsBreathingSafetyTest> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<QmsBreathingSafetyTest>) => response.ok),
                map((qmsBreathingSafetyTest: HttpResponse<QmsBreathingSafetyTest>) => qmsBreathingSafetyTest.body)
            );
        }
        return of(new QmsBreathingSafetyTest());
    }
}

export const qmsBreathingSafetyTestRoute: Routes = [
    {
        path: 'qms-breathing-safety-test',
        component: QmsBreathingSafetyTestComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'id,asc',
            pageTitle: 'fccApp.qmsBreathingSafetyTest.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'qms-breathing-safety-test/:id/view',
        component: QmsBreathingSafetyTestDetailComponent,
        resolve: {
            qmsBreathingSafetyTest: QmsBreathingSafetyTestResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'fccApp.qmsBreathingSafetyTest.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'qms-breathing-safety-test/new',
        component: QmsBreathingSafetyTestUpdateComponent,
        resolve: {
            qmsBreathingSafetyTest: QmsBreathingSafetyTestResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'fccApp.qmsBreathingSafetyTest.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'qms-breathing-safety-test/:id/edit',
        component: QmsBreathingSafetyTestUpdateComponent,
        resolve: {
            qmsBreathingSafetyTest: QmsBreathingSafetyTestResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'fccApp.qmsBreathingSafetyTest.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const qmsBreathingSafetyTestPopupRoute: Routes = [
    {
        path: 'qms-breathing-safety-test/:id/delete',
        component: QmsBreathingSafetyTestDeletePopupComponent,
        resolve: {
            qmsBreathingSafetyTest: QmsBreathingSafetyTestResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'fccApp.qmsBreathingSafetyTest.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
