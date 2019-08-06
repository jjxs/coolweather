import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { QmsBogiepressurePositiveTest } from 'app/shared/model/qms-bogiepressure-positive-test.model';
import { QmsBogiepressurePositiveTestService } from './qms-bogiepressure-positive-test.service';
import { QmsBogiepressurePositiveTestComponent } from './qms-bogiepressure-positive-test.component';
import { QmsBogiepressurePositiveTestDetailComponent } from './qms-bogiepressure-positive-test-detail.component';
import { QmsBogiepressurePositiveTestUpdateComponent } from './qms-bogiepressure-positive-test-update.component';
import { QmsBogiepressurePositiveTestDeletePopupComponent } from './qms-bogiepressure-positive-test-delete-dialog.component';
import { IQmsBogiepressurePositiveTest } from 'app/shared/model/qms-bogiepressure-positive-test.model';

@Injectable({ providedIn: 'root' })
export class QmsBogiepressurePositiveTestResolve implements Resolve<IQmsBogiepressurePositiveTest> {
    constructor(private service: QmsBogiepressurePositiveTestService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<QmsBogiepressurePositiveTest> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<QmsBogiepressurePositiveTest>) => response.ok),
                map((qmsBogiepressurePositiveTest: HttpResponse<QmsBogiepressurePositiveTest>) => qmsBogiepressurePositiveTest.body)
            );
        }
        return of(new QmsBogiepressurePositiveTest());
    }
}

export const qmsBogiepressurePositiveTestRoute: Routes = [
    {
        path: 'qms-bogiepressure-positive-test',
        component: QmsBogiepressurePositiveTestComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'id,asc',
            pageTitle: 'fccApp.qmsBogiepressurePositiveTest.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'qms-bogiepressure-positive-test/:id/view',
        component: QmsBogiepressurePositiveTestDetailComponent,
        resolve: {
            qmsBogiepressurePositiveTest: QmsBogiepressurePositiveTestResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'fccApp.qmsBogiepressurePositiveTest.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'qms-bogiepressure-positive-test/new',
        component: QmsBogiepressurePositiveTestUpdateComponent,
        resolve: {
            qmsBogiepressurePositiveTest: QmsBogiepressurePositiveTestResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'fccApp.qmsBogiepressurePositiveTest.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'qms-bogiepressure-positive-test/:id/edit',
        component: QmsBogiepressurePositiveTestUpdateComponent,
        resolve: {
            qmsBogiepressurePositiveTest: QmsBogiepressurePositiveTestResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'fccApp.qmsBogiepressurePositiveTest.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const qmsBogiepressurePositiveTestPopupRoute: Routes = [
    {
        path: 'qms-bogiepressure-positive-test/:id/delete',
        component: QmsBogiepressurePositiveTestDeletePopupComponent,
        resolve: {
            qmsBogiepressurePositiveTest: QmsBogiepressurePositiveTestResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'fccApp.qmsBogiepressurePositiveTest.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
