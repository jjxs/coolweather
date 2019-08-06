import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { QmsMaterielDetails } from 'app/shared/model/qms-materiel-details.model';
import { QmsMaterielDetailsService } from './qms-materiel-details.service';
import { QmsMaterielDetailsComponent } from './qms-materiel-details.component';
import { QmsMaterielDetailsDetailComponent } from './qms-materiel-details-detail.component';
import { QmsMaterielDetailsUpdateComponent } from './qms-materiel-details-update.component';
import { QmsMaterielDetailsDeletePopupComponent } from './qms-materiel-details-delete-dialog.component';
import { IQmsMaterielDetails } from 'app/shared/model/qms-materiel-details.model';

@Injectable({ providedIn: 'root' })
export class QmsMaterielDetailsResolve implements Resolve<IQmsMaterielDetails> {
    constructor(private service: QmsMaterielDetailsService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<QmsMaterielDetails> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<QmsMaterielDetails>) => response.ok),
                map((qmsMaterielDetails: HttpResponse<QmsMaterielDetails>) => qmsMaterielDetails.body)
            );
        }
        return of(new QmsMaterielDetails());
    }
}

export const qmsMaterielDetailsRoute: Routes = [
    {
        path: 'qms-materiel-details',
        component: QmsMaterielDetailsComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'id,asc',
            pageTitle: 'fccApp.qmsMaterielDetails.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'qms-materiel-details/:id/view',
        component: QmsMaterielDetailsDetailComponent,
        resolve: {
            qmsMaterielDetails: QmsMaterielDetailsResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'fccApp.qmsMaterielDetails.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'qms-materiel-details/new',
        component: QmsMaterielDetailsUpdateComponent,
        resolve: {
            qmsMaterielDetails: QmsMaterielDetailsResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'fccApp.qmsMaterielDetails.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'qms-materiel-details/:id/edit',
        component: QmsMaterielDetailsUpdateComponent,
        resolve: {
            qmsMaterielDetails: QmsMaterielDetailsResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'fccApp.qmsMaterielDetails.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const qmsMaterielDetailsPopupRoute: Routes = [
    {
        path: 'qms-materiel-details/:id/delete',
        component: QmsMaterielDetailsDeletePopupComponent,
        resolve: {
            qmsMaterielDetails: QmsMaterielDetailsResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'fccApp.qmsMaterielDetails.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
