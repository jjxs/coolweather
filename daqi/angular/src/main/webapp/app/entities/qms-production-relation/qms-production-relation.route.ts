import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { QmsProductionRelation } from 'app/shared/model/qms-production-relation.model';
import { QmsProductionRelationService } from './qms-production-relation.service';
import { QmsProductionRelationComponent } from './qms-production-relation.component';
import { QmsProductionRelationDetailComponent } from './qms-production-relation-detail.component';
import { QmsProductionRelationUpdateComponent } from './qms-production-relation-update.component';
import { QmsProductionRelationDeletePopupComponent } from './qms-production-relation-delete-dialog.component';
import { IQmsProductionRelation } from 'app/shared/model/qms-production-relation.model';

@Injectable({ providedIn: 'root' })
export class QmsProductionRelationResolve implements Resolve<IQmsProductionRelation> {
    constructor(private service: QmsProductionRelationService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<QmsProductionRelation> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<QmsProductionRelation>) => response.ok),
                map((qmsProductionRelation: HttpResponse<QmsProductionRelation>) => qmsProductionRelation.body)
            );
        }
        return of(new QmsProductionRelation());
    }
}

export const qmsProductionRelationRoute: Routes = [
    {
        path: 'qms-production-relation',
        component: QmsProductionRelationComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'id,asc',
            pageTitle: 'fccApp.qmsProductionRelation.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'qms-production-relation/:id/view',
        component: QmsProductionRelationDetailComponent,
        resolve: {
            qmsProductionRelation: QmsProductionRelationResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'fccApp.qmsProductionRelation.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'qms-production-relation/new',
        component: QmsProductionRelationUpdateComponent,
        resolve: {
            qmsProductionRelation: QmsProductionRelationResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'fccApp.qmsProductionRelation.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'qms-production-relation/:id/edit',
        component: QmsProductionRelationUpdateComponent,
        resolve: {
            qmsProductionRelation: QmsProductionRelationResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'fccApp.qmsProductionRelation.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const qmsProductionRelationPopupRoute: Routes = [
    {
        path: 'qms-production-relation/:id/delete',
        component: QmsProductionRelationDeletePopupComponent,
        resolve: {
            qmsProductionRelation: QmsProductionRelationResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'fccApp.qmsProductionRelation.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
