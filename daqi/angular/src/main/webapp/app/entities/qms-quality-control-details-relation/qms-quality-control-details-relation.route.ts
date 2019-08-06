import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { QmsQualityControlDetailsRelation } from 'app/shared/model/qms-quality-control-details-relation.model';
import { QmsQualityControlDetailsRelationService } from './qms-quality-control-details-relation.service';
import { QmsQualityControlDetailsRelationComponent } from './qms-quality-control-details-relation.component';
import { QmsQualityControlDetailsRelationDetailComponent } from './qms-quality-control-details-relation-detail.component';
import { QmsQualityControlDetailsRelationUpdateComponent } from './qms-quality-control-details-relation-update.component';
import { QmsQualityControlDetailsRelationDeletePopupComponent } from './qms-quality-control-details-relation-delete-dialog.component';
import { IQmsQualityControlDetailsRelation } from 'app/shared/model/qms-quality-control-details-relation.model';

@Injectable({ providedIn: 'root' })
export class QmsQualityControlDetailsRelationResolve implements Resolve<IQmsQualityControlDetailsRelation> {
    constructor(private service: QmsQualityControlDetailsRelationService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<QmsQualityControlDetailsRelation> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<QmsQualityControlDetailsRelation>) => response.ok),
                map(
                    (qmsQualityControlDetailsRelation: HttpResponse<QmsQualityControlDetailsRelation>) =>
                        qmsQualityControlDetailsRelation.body
                )
            );
        }
        return of(new QmsQualityControlDetailsRelation());
    }
}

export const qmsQualityControlDetailsRelationRoute: Routes = [
    {
        path: 'qms-quality-control-details-relation',
        component: QmsQualityControlDetailsRelationComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'id,asc',
            pageTitle: 'fccApp.qmsQualityControlDetailsRelation.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'qms-quality-control-details-relation/:id/view',
        component: QmsQualityControlDetailsRelationDetailComponent,
        resolve: {
            qmsQualityControlDetailsRelation: QmsQualityControlDetailsRelationResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'fccApp.qmsQualityControlDetailsRelation.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'qms-quality-control-details-relation/new',
        component: QmsQualityControlDetailsRelationUpdateComponent,
        resolve: {
            qmsQualityControlDetailsRelation: QmsQualityControlDetailsRelationResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'fccApp.qmsQualityControlDetailsRelation.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'qms-quality-control-details-relation/:id/edit',
        component: QmsQualityControlDetailsRelationUpdateComponent,
        resolve: {
            qmsQualityControlDetailsRelation: QmsQualityControlDetailsRelationResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'fccApp.qmsQualityControlDetailsRelation.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const qmsQualityControlDetailsRelationPopupRoute: Routes = [
    {
        path: 'qms-quality-control-details-relation/:id/delete',
        component: QmsQualityControlDetailsRelationDeletePopupComponent,
        resolve: {
            qmsQualityControlDetailsRelation: QmsQualityControlDetailsRelationResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'fccApp.qmsQualityControlDetailsRelation.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
