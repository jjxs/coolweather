import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { QmsProductionInspection } from 'app/shared/model/qms-production-inspection.model';
import { QmsProductionInspectionSelfService } from './qms-production-inspection.self.service';
import { QmsProductionInspectionSelfComponent } from './qms-production-inspection.self.component';
import { QmsProductionInspectionDetailComponent } from './qms-production-inspection-detail.component';
import { QmsProductionInspectionUpdateComponent } from './qms-production-inspection-update.component';
import { QmsProductionInspectionCheckComponent } from './qms-production-inspection-check.component';

import { QmsProductionInspectionDeletePopupComponent } from './qms-production-inspection-delete-dialog.component';
import { IQmsProductionInspection } from 'app/shared/model/qms-production-inspection.model';

@Injectable({ providedIn: 'root' })
export class QmsProductionInspectionResolve implements Resolve<IQmsProductionInspection> {
    constructor(private service: QmsProductionInspectionService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<QmsProductionInspection> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<QmsProductionInspection>) => response.ok),
                map((qmsProductionInspection: HttpResponse<QmsProductionInspection>) => qmsProductionInspection.body)
            );
        }
        return of(new QmsProductionInspection());
    }
}

export const qmsProductionInspectionRoute: Routes = [
    {
        path: '',
        component: QmsProductionInspectionComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'id,asc',
            pageTitle: 'fccApp.qmsProductionInspection.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'qms-production-inspection/:id/view',
        component: QmsProductionInspectionDetailComponent,
        resolve: {
            qmsProductionInspection: QmsProductionInspectionResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'fccApp.qmsProductionInspection.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'qms-production-inspection/new',
        component: QmsProductionInspectionUpdateComponent,
        resolve: {
            qmsProductionInspection: QmsProductionInspectionResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'fccApp.qmsProductionInspection.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'qms-production-inspection/check',
        component: QmsProductionInspectionCheckComponent,
        resolve: {
            qmsProductionInspection: QmsProductionInspectionResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'fccApp.qmsProductionInspection.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'qms-production-inspection/:id/edit',
        component: QmsProductionInspectionUpdateComponent,
        resolve: {
            qmsProductionInspection: QmsProductionInspectionResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'fccApp.qmsProductionInspection.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const qmsProductionInspectionPopupRoute: Routes = [
    {
        path: 'qms-production-inspection/:id/delete',
        component: QmsProductionInspectionDeletePopupComponent,
        resolve: {
            qmsProductionInspection: QmsProductionInspectionResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'fccApp.qmsProductionInspection.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
