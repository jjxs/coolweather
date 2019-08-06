import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { QmsEntryControlDetails } from 'app/shared/model/qms-entry-control-details.model';
import { QmsEntryControlDetailsService } from './qms-entry-control-details.service';
import { QmsEntryControlDetailsComponent } from './qms-entry-control-details.component';
import { QmsEntryControlDetailsDetailComponent } from './qms-entry-control-details-detail.component';
import { QmsEntryControlDetailsUpdateComponent } from './qms-entry-control-details-update.component';
import { QmsEntryControlDetailsDeletePopupComponent } from './qms-entry-control-details-delete-dialog.component';
import { IQmsEntryControlDetails } from 'app/shared/model/qms-entry-control-details.model';

@Injectable({ providedIn: 'root' })
export class QmsEntryControlDetailsResolve implements Resolve<IQmsEntryControlDetails> {
    constructor(private service: QmsEntryControlDetailsService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<QmsEntryControlDetails> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<QmsEntryControlDetails>) => response.ok),
                map((qmsEntryControlDetails: HttpResponse<QmsEntryControlDetails>) => qmsEntryControlDetails.body)
            );
        }
        return of(new QmsEntryControlDetails());
    }
}

export const qmsEntryControlDetailsRoute: Routes = [
    {
        path: 'qms-entry-control-details',
        component: QmsEntryControlDetailsComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'id,asc',
            pageTitle: 'fccApp.qmsEntryControlDetails.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'qms-entry-control-details/:id/view',
        component: QmsEntryControlDetailsDetailComponent,
        resolve: {
            qmsEntryControlDetails: QmsEntryControlDetailsResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'fccApp.qmsEntryControlDetails.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'qms-entry-control-details/new',
        component: QmsEntryControlDetailsUpdateComponent,
        resolve: {
            qmsEntryControlDetails: QmsEntryControlDetailsResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'fccApp.qmsEntryControlDetails.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'qms-entry-control-details/:id/edit',
        component: QmsEntryControlDetailsUpdateComponent,
        resolve: {
            qmsEntryControlDetails: QmsEntryControlDetailsResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'fccApp.qmsEntryControlDetails.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const qmsEntryControlDetailsPopupRoute: Routes = [
    {
        path: 'qms-entry-control-details/:id/delete',
        component: QmsEntryControlDetailsDeletePopupComponent,
        resolve: {
            qmsEntryControlDetails: QmsEntryControlDetailsResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'fccApp.qmsEntryControlDetails.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
