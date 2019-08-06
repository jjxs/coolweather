import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { QmsEntryControlDetails } from 'app/shared/model/qms-entry-control-details.model';
import { EntryControlDetailsInfoService } from './entry-control-detailsInfo.service';
import { EntryControlDetailsInfoComponent } from './entry-control-detailsInfo.component';
import { EntryControlDetailsDetailInfoComponent } from './entry-control-detailsInfo-detail.component';
import { EntryControlDetailsInfoUpdateComponent } from './entry-control-detailsInfo-update.component';
import { EntryControlDetailsInfoDeletePopupComponent } from './entry-control-detailsInfo-delete-dialog.component';
import { IQmsEntryControlDetails } from 'app/shared/model/qms-entry-control-details.model';

@Injectable({ providedIn: 'root' })
export class QmsEntryControlDetailsResolve implements Resolve<IQmsEntryControlDetails> {
    constructor(private service: EntryControlDetailsInfoService) {}

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

export const entryControlDetailsInfoRoute: Routes = [
    {
        path: '',
        component: EntryControlDetailsInfoComponent,
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
        path: ':id/view',
        component: EntryControlDetailsDetailInfoComponent,
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
        path: 'new',
        component: EntryControlDetailsInfoUpdateComponent,
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
        path: ':id/edit',
        component: EntryControlDetailsInfoUpdateComponent,
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

export const entryControlDetailsInfoPopupRoute: Routes = [
    {
        path: 'entry-control-detailsInfo/:id/delete',
        component: EntryControlDetailsInfoDeletePopupComponent,
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
