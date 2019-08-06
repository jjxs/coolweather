import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { QmsEntryInspection } from 'app/shared/model/qms-entry-inspection.model';
import { QmsEntryInspectionService } from './qms-entry-inspection.service';
import { QmsEntryInspectionComponent } from './qms-entry-inspection.component';
import { QmsEntryInspectionDetailComponent } from './qms-entry-inspection-detail.component';
import { QmsEntryInspectionUpdateComponent } from './qms-entry-inspection-update.component';
import { QmsEntryInspectionDeletePopupComponent } from './qms-entry-inspection-delete-dialog.component';
import { IQmsEntryInspection } from 'app/shared/model/qms-entry-inspection.model';

@Injectable({ providedIn: 'root' })
export class QmsEntryInspectionResolve implements Resolve<IQmsEntryInspection> {
    constructor(private service: QmsEntryInspectionService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<QmsEntryInspection> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<QmsEntryInspection>) => response.ok),
                map((qmsEntryInspection: HttpResponse<QmsEntryInspection>) => qmsEntryInspection.body)
            );
        }
        return of(new QmsEntryInspection());
    }
}

export const qmsEntryInspectionRoute: Routes = [
    {
        path: 'qms-entry-inspection',
        component: QmsEntryInspectionComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'id,asc',
            pageTitle: 'fccApp.qmsEntryInspection.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'qms-entry-inspection/:id/view',
        component: QmsEntryInspectionDetailComponent,
        resolve: {
            qmsEntryInspection: QmsEntryInspectionResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'fccApp.qmsEntryInspection.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'qms-entry-inspection/new',
        component: QmsEntryInspectionUpdateComponent,
        resolve: {
            qmsEntryInspection: QmsEntryInspectionResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'fccApp.qmsEntryInspection.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'qms-entry-inspection/:id/edit',
        component: QmsEntryInspectionUpdateComponent,
        resolve: {
            qmsEntryInspection: QmsEntryInspectionResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'fccApp.qmsEntryInspection.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const qmsEntryInspectionPopupRoute: Routes = [
    {
        path: 'qms-entry-inspection/:id/delete',
        component: QmsEntryInspectionDeletePopupComponent,
        resolve: {
            qmsEntryInspection: QmsEntryInspectionResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'fccApp.qmsEntryInspection.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
