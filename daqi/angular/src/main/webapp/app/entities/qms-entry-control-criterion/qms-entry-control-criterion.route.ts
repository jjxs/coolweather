import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { QmsEntryControlCriterion } from 'app/shared/model/qms-entry-control-criterion.model';
import { QmsEntryControlCriterionService } from './qms-entry-control-criterion.service';
import { QmsEntryControlCriterionComponent } from './qms-entry-control-criterion.component';
import { QmsEntryControlCriterionDetailComponent } from './qms-entry-control-criterion-detail.component';
import { QmsEntryControlCriterionUpdateComponent } from './qms-entry-control-criterion-update.component';
import { QmsEntryControlCriterionDeletePopupComponent } from './qms-entry-control-criterion-delete-dialog.component';
import { IQmsEntryControlCriterion } from 'app/shared/model/qms-entry-control-criterion.model';

@Injectable({ providedIn: 'root' })
export class QmsEntryControlCriterionResolve implements Resolve<IQmsEntryControlCriterion> {
    constructor(private service: QmsEntryControlCriterionService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<QmsEntryControlCriterion> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<QmsEntryControlCriterion>) => response.ok),
                map((qmsEntryControlCriterion: HttpResponse<QmsEntryControlCriterion>) => qmsEntryControlCriterion.body)
            );
        }
        return of(new QmsEntryControlCriterion());
    }
}

export const qmsEntryControlCriterionRoute: Routes = [
    {
        path: 'qms-entry-control-criterion',
        component: QmsEntryControlCriterionComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'id,asc',
            pageTitle: 'fccApp.qmsEntryControlCriterion.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'qms-entry-control-criterion/:id/view',
        component: QmsEntryControlCriterionDetailComponent,
        resolve: {
            qmsEntryControlCriterion: QmsEntryControlCriterionResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'fccApp.qmsEntryControlCriterion.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'qms-entry-control-criterion/new',
        component: QmsEntryControlCriterionUpdateComponent,
        resolve: {
            qmsEntryControlCriterion: QmsEntryControlCriterionResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'fccApp.qmsEntryControlCriterion.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'qms-entry-control-criterion/:id/edit',
        component: QmsEntryControlCriterionUpdateComponent,
        resolve: {
            qmsEntryControlCriterion: QmsEntryControlCriterionResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'fccApp.qmsEntryControlCriterion.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const qmsEntryControlCriterionPopupRoute: Routes = [
    {
        path: 'qms-entry-control-criterion/:id/delete',
        component: QmsEntryControlCriterionDeletePopupComponent,
        resolve: {
            qmsEntryControlCriterion: QmsEntryControlCriterionResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'fccApp.qmsEntryControlCriterion.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
