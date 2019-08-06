import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { QmsInspectionDetails } from 'app/shared/model/qms-inspection-details.model';
import { QmsInspectionDetailsService } from './qms-inspection-details.service';
import { QmsInspectionDetailsComponent } from './qms-inspection-details.component';
import { QmsInspectionDetailsDetailComponent } from './qms-inspection-details-detail.component';
import { QmsInspectionDetailsUpdateComponent } from './qms-inspection-details-update.component';
import { QmsInspectionDetailsDeletePopupComponent } from './qms-inspection-details-delete-dialog.component';
import { IQmsInspectionDetails } from 'app/shared/model/qms-inspection-details.model';

@Injectable({ providedIn: 'root' })
export class QmsInspectionDetailsResolve implements Resolve<IQmsInspectionDetails> {
    constructor(private service: QmsInspectionDetailsService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<QmsInspectionDetails> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<QmsInspectionDetails>) => response.ok),
                map((qmsInspectionDetails: HttpResponse<QmsInspectionDetails>) => qmsInspectionDetails.body)
            );
        }
        return of(new QmsInspectionDetails());
    }
}

export const qmsInspectionDetailsRoute: Routes = [
    {
        path: 'qms-inspection-details',
        component: QmsInspectionDetailsComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'id,asc',
            pageTitle: 'fccApp.qmsInspectionDetails.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'qms-inspection-details/:id/view',
        component: QmsInspectionDetailsDetailComponent,
        resolve: {
            qmsInspectionDetails: QmsInspectionDetailsResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'fccApp.qmsInspectionDetails.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'qms-inspection-details/new',
        component: QmsInspectionDetailsUpdateComponent,
        resolve: {
            qmsInspectionDetails: QmsInspectionDetailsResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'fccApp.qmsInspectionDetails.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'qms-inspection-details/:id/edit',
        component: QmsInspectionDetailsUpdateComponent,
        resolve: {
            qmsInspectionDetails: QmsInspectionDetailsResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'fccApp.qmsInspectionDetails.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const qmsInspectionDetailsPopupRoute: Routes = [
    {
        path: 'qms-inspection-details/:id/delete',
        component: QmsInspectionDetailsDeletePopupComponent,
        resolve: {
            qmsInspectionDetails: QmsInspectionDetailsResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'fccApp.qmsInspectionDetails.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
