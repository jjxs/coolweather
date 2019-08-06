import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { QmsNrvTelation } from 'app/shared/model/qms-nrv-telation.model';
import { QmsNrvTelationService } from './qms-nrv-telation.service';
import { QmsNrvTelationComponent } from './qms-nrv-telation.component';
import { QmsNrvTelationDetailComponent } from './qms-nrv-telation-detail.component';
import { QmsNrvTelationUpdateComponent } from './qms-nrv-telation-update.component';
import { QmsNrvTelationDeletePopupComponent } from './qms-nrv-telation-delete-dialog.component';
import { IQmsNrvTelation } from 'app/shared/model/qms-nrv-telation.model';

@Injectable({ providedIn: 'root' })
export class QmsNrvTelationResolve implements Resolve<IQmsNrvTelation> {
    constructor(private service: QmsNrvTelationService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<QmsNrvTelation> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<QmsNrvTelation>) => response.ok),
                map((qmsNrvTelation: HttpResponse<QmsNrvTelation>) => qmsNrvTelation.body)
            );
        }
        return of(new QmsNrvTelation());
    }
}

export const qmsNrvTelationRoute: Routes = [
    {
        path: 'qms-nrv-telation',
        component: QmsNrvTelationComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'id,asc',
            pageTitle: 'fccApp.qmsNrvTelation.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'qms-nrv-telation/:id/view',
        component: QmsNrvTelationDetailComponent,
        resolve: {
            qmsNrvTelation: QmsNrvTelationResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'fccApp.qmsNrvTelation.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'qms-nrv-telation/new',
        component: QmsNrvTelationUpdateComponent,
        resolve: {
            qmsNrvTelation: QmsNrvTelationResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'fccApp.qmsNrvTelation.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'qms-nrv-telation/:id/edit',
        component: QmsNrvTelationUpdateComponent,
        resolve: {
            qmsNrvTelation: QmsNrvTelationResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'fccApp.qmsNrvTelation.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const qmsNrvTelationPopupRoute: Routes = [
    {
        path: 'qms-nrv-telation/:id/delete',
        component: QmsNrvTelationDeletePopupComponent,
        resolve: {
            qmsNrvTelation: QmsNrvTelationResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'fccApp.qmsNrvTelation.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
