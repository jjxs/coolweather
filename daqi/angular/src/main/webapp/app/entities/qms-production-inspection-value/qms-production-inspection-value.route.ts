import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { QmsProductionInspectionValue } from 'app/shared/model/qms-production-inspection-value.model';
import { QmsProductionInspectionValueService } from './qms-production-inspection-value.service';
import { QmsProductionInspectionValueComponent } from './qms-production-inspection-value.component';
import { QmsProductionInspectionValueDetailComponent } from './qms-production-inspection-value-detail.component';
import { QmsProductionInspectionValueUpdateComponent } from './qms-production-inspection-value-update.component';
import { QmsProductionInspectionValueDeletePopupComponent } from './qms-production-inspection-value-delete-dialog.component';
import { IQmsProductionInspectionValue } from 'app/shared/model/qms-production-inspection-value.model';

@Injectable({ providedIn: 'root' })
export class QmsProductionInspectionValueResolve implements Resolve<IQmsProductionInspectionValue> {
    constructor(private service: QmsProductionInspectionValueService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<QmsProductionInspectionValue> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<QmsProductionInspectionValue>) => response.ok),
                map((qmsProductionInspectionValue: HttpResponse<QmsProductionInspectionValue>) => qmsProductionInspectionValue.body)
            );
        }
        return of(new QmsProductionInspectionValue());
    }
}

export const qmsProductionInspectionValueRoute: Routes = [
    {
        path: 'qms-production-inspection-value',
        component: QmsProductionInspectionValueComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'id,asc',
            pageTitle: 'fccApp.qmsProductionInspectionValue.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'qms-production-inspection-value/:id/view',
        component: QmsProductionInspectionValueDetailComponent,
        resolve: {
            qmsProductionInspectionValue: QmsProductionInspectionValueResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'fccApp.qmsProductionInspectionValue.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'qms-production-inspection-value/new',
        component: QmsProductionInspectionValueUpdateComponent,
        resolve: {
            qmsProductionInspectionValue: QmsProductionInspectionValueResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'fccApp.qmsProductionInspectionValue.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'qms-production-inspection-value/:id/edit',
        component: QmsProductionInspectionValueUpdateComponent,
        resolve: {
            qmsProductionInspectionValue: QmsProductionInspectionValueResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'fccApp.qmsProductionInspectionValue.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const qmsProductionInspectionValuePopupRoute: Routes = [
    {
        path: 'qms-production-inspection-value/:id/delete',
        component: QmsProductionInspectionValueDeletePopupComponent,
        resolve: {
            qmsProductionInspectionValue: QmsProductionInspectionValueResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'fccApp.qmsProductionInspectionValue.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
