import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { QmsIntelligentTriggerTest } from 'app/shared/model/qms-intelligent-trigger-test.model';
import { QmsIntelligentTriggerTestService } from './qms-intelligent-trigger-test.service';
import { QmsIntelligentTriggerTestComponent } from './qms-intelligent-trigger-test.component';
import { QmsIntelligentTriggerTestDetailComponent } from './qms-intelligent-trigger-test-detail.component';
import { QmsIntelligentTriggerTestUpdateComponent } from './qms-intelligent-trigger-test-update.component';
import { QmsIntelligentTriggerTestDeletePopupComponent } from './qms-intelligent-trigger-test-delete-dialog.component';
import { IQmsIntelligentTriggerTest } from 'app/shared/model/qms-intelligent-trigger-test.model';

@Injectable({ providedIn: 'root' })
export class QmsIntelligentTriggerTestResolve implements Resolve<IQmsIntelligentTriggerTest> {
    constructor(private service: QmsIntelligentTriggerTestService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<QmsIntelligentTriggerTest> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<QmsIntelligentTriggerTest>) => response.ok),
                map((qmsIntelligentTriggerTest: HttpResponse<QmsIntelligentTriggerTest>) => qmsIntelligentTriggerTest.body)
            );
        }
        return of(new QmsIntelligentTriggerTest());
    }
}

export const qmsIntelligentTriggerTestRoute: Routes = [
    {
        path: 'qms-intelligent-trigger-test',
        component: QmsIntelligentTriggerTestComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'id,asc',
            pageTitle: 'fccApp.qmsIntelligentTriggerTest.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'qms-intelligent-trigger-test/:id/view',
        component: QmsIntelligentTriggerTestDetailComponent,
        resolve: {
            qmsIntelligentTriggerTest: QmsIntelligentTriggerTestResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'fccApp.qmsIntelligentTriggerTest.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'qms-intelligent-trigger-test/new',
        component: QmsIntelligentTriggerTestUpdateComponent,
        resolve: {
            qmsIntelligentTriggerTest: QmsIntelligentTriggerTestResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'fccApp.qmsIntelligentTriggerTest.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'qms-intelligent-trigger-test/:id/edit',
        component: QmsIntelligentTriggerTestUpdateComponent,
        resolve: {
            qmsIntelligentTriggerTest: QmsIntelligentTriggerTestResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'fccApp.qmsIntelligentTriggerTest.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const qmsIntelligentTriggerTestPopupRoute: Routes = [
    {
        path: 'qms-intelligent-trigger-test/:id/delete',
        component: QmsIntelligentTriggerTestDeletePopupComponent,
        resolve: {
            qmsIntelligentTriggerTest: QmsIntelligentTriggerTestResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'fccApp.qmsIntelligentTriggerTest.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
