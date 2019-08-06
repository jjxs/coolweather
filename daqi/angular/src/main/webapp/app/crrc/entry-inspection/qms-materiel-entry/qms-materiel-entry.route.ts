import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { QmsMaterielEntry } from 'app/shared/model/qms-materiel-entry.model';
import { QmsMaterielEntryService } from './qms-materiel-entry.service';
import { QmsMaterielEntryComponent } from './qms-materiel-entry.component';
import { QmsMaterielEntryDetailComponent } from './qms-materiel-entry-detail.component';
import { QmsMaterielEntryUpdateComponent } from './qms-materiel-entry-update.component';
import { QmsMaterielEntryDeletePopupComponent } from './qms-materiel-entry-delete-dialog.component';
import { IQmsMaterielEntry } from 'app/shared/model/qms-materiel-entry.model';

@Injectable({ providedIn: 'root' })
export class QmsMaterielEntryResolve implements Resolve<IQmsMaterielEntry> {
    constructor(private service: QmsMaterielEntryService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<QmsMaterielEntry> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<QmsMaterielEntry>) => response.ok),
                map((qmsMaterielEntry: HttpResponse<QmsMaterielEntry>) => qmsMaterielEntry.body)
            );
        }
        return of(new QmsMaterielEntry());
    }
}

export const qmsMaterielEntryRoute: Routes = [
    {
        path: '',
        component: QmsMaterielEntryComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'id,asc',
            pageTitle: 'fccApp.qmsMaterielEntry.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/view',
        component: QmsMaterielEntryDetailComponent,
        resolve: {
            qmsMaterielEntry: QmsMaterielEntryResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'fccApp.qmsMaterielEntry.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'new',
        component: QmsMaterielEntryUpdateComponent,
        resolve: {
            qmsMaterielEntry: QmsMaterielEntryResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'fccApp.qmsMaterielEntry.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/edit',
        component: QmsMaterielEntryUpdateComponent,
        resolve: {
            qmsMaterielEntry: QmsMaterielEntryResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'fccApp.qmsMaterielEntry.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const qmsMaterielEntryPopupRoute: Routes = [
    {
        path: 'qms-materiel-entry/:id/delete',
        component: QmsMaterielEntryDeletePopupComponent,
        resolve: {
            qmsMaterielEntry: QmsMaterielEntryResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'fccApp.qmsMaterielEntry.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
