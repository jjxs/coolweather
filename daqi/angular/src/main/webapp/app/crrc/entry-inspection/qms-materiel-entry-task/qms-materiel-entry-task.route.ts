import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { QmsMaterielEntry } from 'app/shared/model/qms-materiel-entry.model';
import { QmsMaterielEntryService } from './qms-materiel-entry-task.service';
import { QmsMaterielEntryTaskComponent } from './qms-materiel-entry-task.component';
import { QmsMaterielEntryTaskDetailComponent } from './qms-materiel-entry-task-detail.component';
import { QmsMaterielEntryTaskUpdateComponent } from './qms-materiel-entry-task-update.component';
import { QmsMaterielEntryTaskDeletePopupComponent } from './qms-materiel-entry-task-delete-dialog.component';
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

export const qmsMaterielEntryTaskRoute: Routes = [
    {
        path: '',
        component: QmsMaterielEntryTaskComponent,
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
        component: QmsMaterielEntryTaskDetailComponent,
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
        component: QmsMaterielEntryTaskUpdateComponent,
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
        component: QmsMaterielEntryTaskUpdateComponent,
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
        component: QmsMaterielEntryTaskDeletePopupComponent,
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
