import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { RbacUserRightRelation } from 'app/shared/model/rbac-user-right-relation.model';
import { RbacUserRightRelationService } from './rbac-user-right-relation.service';
import { RbacUserRightRelationComponent } from './rbac-user-right-relation.component';
import { RbacUserRightRelationDetailComponent } from './rbac-user-right-relation-detail.component';
import { RbacUserRightRelationUpdateComponent } from './rbac-user-right-relation-update.component';
import { RbacUserRightRelationDeletePopupComponent } from './rbac-user-right-relation-delete-dialog.component';
import { IRbacUserRightRelation } from 'app/shared/model/rbac-user-right-relation.model';

@Injectable({ providedIn: 'root' })
export class RbacUserRightRelationResolve implements Resolve<IRbacUserRightRelation> {
    constructor(private service: RbacUserRightRelationService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<RbacUserRightRelation> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<RbacUserRightRelation>) => response.ok),
                map((rbacUserRightRelation: HttpResponse<RbacUserRightRelation>) => rbacUserRightRelation.body)
            );
        }
        return of(new RbacUserRightRelation());
    }
}

export const rbacUserRightRelationRoute: Routes = [
    {
        path: 'rbac-user-right-relation',
        component: RbacUserRightRelationComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'id,asc',
            pageTitle: 'fccApp.rbacUserRightRelation.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'rbac-user-right-relation/:id/view',
        component: RbacUserRightRelationDetailComponent,
        resolve: {
            rbacUserRightRelation: RbacUserRightRelationResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'fccApp.rbacUserRightRelation.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'rbac-user-right-relation/new',
        component: RbacUserRightRelationUpdateComponent,
        resolve: {
            rbacUserRightRelation: RbacUserRightRelationResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'fccApp.rbacUserRightRelation.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'rbac-user-right-relation/:id/edit',
        component: RbacUserRightRelationUpdateComponent,
        resolve: {
            rbacUserRightRelation: RbacUserRightRelationResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'fccApp.rbacUserRightRelation.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const rbacUserRightRelationPopupRoute: Routes = [
    {
        path: 'rbac-user-right-relation/:id/delete',
        component: RbacUserRightRelationDeletePopupComponent,
        resolve: {
            rbacUserRightRelation: RbacUserRightRelationResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'fccApp.rbacUserRightRelation.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
