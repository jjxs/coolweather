import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { QmsProductionInspectionResult } from 'app/shared/model/qms-production-inspection-result.model';
import { QmsProductionInspectionResultService } from './qms-production-inspection-result.service';
import { QmsProductionInspectionResultComponent } from './qms-production-inspection-result.component';
import { QmsProductionInspectionResultDetailComponent } from './qms-production-inspection-result-detail.component';
import { QmsProductionInspectionResultUpdateComponent } from './qms-production-inspection-result-update.component';
import { QmsProductionInspectionResultDeletePopupComponent } from './qms-production-inspection-result-delete-dialog.component';
import { IQmsProductionInspectionResult } from 'app/shared/model/qms-production-inspection-result.model';

@Injectable({ providedIn: 'root' })
export class QmsProductionInspectionResultResolve implements Resolve<IQmsProductionInspectionResult> {
    constructor(private service: QmsProductionInspectionResultService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<QmsProductionInspectionResult> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<QmsProductionInspectionResult>) => response.ok),
                map((qmsProductionInspectionResult: HttpResponse<QmsProductionInspectionResult>) => qmsProductionInspectionResult.body)
            );
        }
        return of(new QmsProductionInspectionResult());
    }
}

export const qmsProductionInspectionResultRoute: Routes = [
    {
        path: 'qms-production-inspection-result',
        component: QmsProductionInspectionResultComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'id,asc',
            pageTitle: 'fccApp.qmsProductionInspectionResult.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'qms-production-inspection-result/:id/view',
        component: QmsProductionInspectionResultDetailComponent,
        resolve: {
            qmsProductionInspectionResult: QmsProductionInspectionResultResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'fccApp.qmsProductionInspectionResult.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'qms-production-inspection-result/new',
        component: QmsProductionInspectionResultUpdateComponent,
        resolve: {
            qmsProductionInspectionResult: QmsProductionInspectionResultResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'fccApp.qmsProductionInspectionResult.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'qms-production-inspection-result/:id/edit',
        component: QmsProductionInspectionResultUpdateComponent,
        resolve: {
            qmsProductionInspectionResult: QmsProductionInspectionResultResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'fccApp.qmsProductionInspectionResult.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const qmsProductionInspectionResultPopupRoute: Routes = [
    {
        path: 'qms-production-inspection-result/:id/delete',
        component: QmsProductionInspectionResultDeletePopupComponent,
        resolve: {
            qmsProductionInspectionResult: QmsProductionInspectionResultResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'fccApp.qmsProductionInspectionResult.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
