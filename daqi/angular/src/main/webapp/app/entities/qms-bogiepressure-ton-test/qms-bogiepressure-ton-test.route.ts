import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { QmsBogiepressureTonTest } from 'app/shared/model/qms-bogiepressure-ton-test.model';
import { QmsBogiepressureTonTestService } from './qms-bogiepressure-ton-test.service';
import { QmsBogiepressureTonTestComponent } from './qms-bogiepressure-ton-test.component';
import { QmsBogiepressureTonTestDetailComponent } from './qms-bogiepressure-ton-test-detail.component';
import { QmsBogiepressureTonTestUpdateComponent } from './qms-bogiepressure-ton-test-update.component';
import { QmsBogiepressureTonTestDeletePopupComponent } from './qms-bogiepressure-ton-test-delete-dialog.component';
import { IQmsBogiepressureTonTest } from 'app/shared/model/qms-bogiepressure-ton-test.model';

@Injectable({ providedIn: 'root' })
export class QmsBogiepressureTonTestResolve implements Resolve<IQmsBogiepressureTonTest> {
    constructor(private service: QmsBogiepressureTonTestService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<QmsBogiepressureTonTest> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<QmsBogiepressureTonTest>) => response.ok),
                map((qmsBogiepressureTonTest: HttpResponse<QmsBogiepressureTonTest>) => qmsBogiepressureTonTest.body)
            );
        }
        return of(new QmsBogiepressureTonTest());
    }
}

export const qmsBogiepressureTonTestRoute: Routes = [
    {
        path: 'qms-bogiepressure-ton-test',
        component: QmsBogiepressureTonTestComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'id,asc',
            pageTitle: 'fccApp.qmsBogiepressureTonTest.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'qms-bogiepressure-ton-test/:id/view',
        component: QmsBogiepressureTonTestDetailComponent,
        resolve: {
            qmsBogiepressureTonTest: QmsBogiepressureTonTestResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'fccApp.qmsBogiepressureTonTest.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'qms-bogiepressure-ton-test/new',
        component: QmsBogiepressureTonTestUpdateComponent,
        resolve: {
            qmsBogiepressureTonTest: QmsBogiepressureTonTestResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'fccApp.qmsBogiepressureTonTest.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'qms-bogiepressure-ton-test/:id/edit',
        component: QmsBogiepressureTonTestUpdateComponent,
        resolve: {
            qmsBogiepressureTonTest: QmsBogiepressureTonTestResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'fccApp.qmsBogiepressureTonTest.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const qmsBogiepressureTonTestPopupRoute: Routes = [
    {
        path: 'qms-bogiepressure-ton-test/:id/delete',
        component: QmsBogiepressureTonTestDeletePopupComponent,
        resolve: {
            qmsBogiepressureTonTest: QmsBogiepressureTonTestResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'fccApp.qmsBogiepressureTonTest.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
