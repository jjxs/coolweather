import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { QmsEntryInspectionResult } from 'app/shared/model/qms-entry-inspection-result.model';
import { QmsEntryInspectionResultService } from './qms-entry-inspection-result.service';
import { QmsEntryInspectionResultComponent } from './qms-entry-inspection-result.component';
import { QmsEntryInspectionResultDetailComponent } from './qms-entry-inspection-result-detail.component';
import { QmsEntryInspectionResultUpdateComponent } from './qms-entry-inspection-result-update.component';
import { QmsEntryInspectionResultDeletePopupComponent } from './qms-entry-inspection-result-delete-dialog.component';
import { IQmsEntryInspectionResult } from 'app/shared/model/qms-entry-inspection-result.model';

@Injectable({ providedIn: 'root' })
export class QmsEntryInspectionResultResolve implements Resolve<IQmsEntryInspectionResult> {
    constructor(private service: QmsEntryInspectionResultService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<QmsEntryInspectionResult> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<QmsEntryInspectionResult>) => response.ok),
                map((qmsEntryInspectionResult: HttpResponse<QmsEntryInspectionResult>) => qmsEntryInspectionResult.body)
            );
        }
        return of(new QmsEntryInspectionResult());
    }
}

export const qmsEntryInspectionResultRoute: Routes = [
    {
        path: 'qms-entry-inspection-result',
        component: QmsEntryInspectionResultComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'id,asc',
            pageTitle: 'fccApp.qmsEntryInspectionResult.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'qms-entry-inspection-result/:id/view',
        component: QmsEntryInspectionResultDetailComponent,
        resolve: {
            qmsEntryInspectionResult: QmsEntryInspectionResultResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'fccApp.qmsEntryInspectionResult.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'qms-entry-inspection-result/new',
        component: QmsEntryInspectionResultUpdateComponent,
        resolve: {
            qmsEntryInspectionResult: QmsEntryInspectionResultResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'fccApp.qmsEntryInspectionResult.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'qms-entry-inspection-result/:id/edit',
        component: QmsEntryInspectionResultUpdateComponent,
        resolve: {
            qmsEntryInspectionResult: QmsEntryInspectionResultResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'fccApp.qmsEntryInspectionResult.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const qmsEntryInspectionResultPopupRoute: Routes = [
    {
        path: 'qms-entry-inspection-result/:id/delete',
        component: QmsEntryInspectionResultDeletePopupComponent,
        resolve: {
            qmsEntryInspectionResult: QmsEntryInspectionResultResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'fccApp.qmsEntryInspectionResult.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
