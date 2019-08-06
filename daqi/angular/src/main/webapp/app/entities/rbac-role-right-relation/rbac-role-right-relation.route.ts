import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { RbacRoleRightRelation } from 'app/shared/model/rbac-role-right-relation.model';
import { RbacRoleRightRelationService } from './rbac-role-right-relation.service';
import { RbacRoleRightRelationComponent } from './rbac-role-right-relation.component';
import { RbacRoleRightRelationDetailComponent } from './rbac-role-right-relation-detail.component';
import { RbacRoleRightRelationUpdateComponent } from './rbac-role-right-relation-update.component';
import { RbacRoleRightRelationDeletePopupComponent } from './rbac-role-right-relation-delete-dialog.component';
import { IRbacRoleRightRelation } from 'app/shared/model/rbac-role-right-relation.model';

@Injectable({ providedIn: 'root' })
export class RbacRoleRightRelationResolve implements Resolve<IRbacRoleRightRelation> {
    constructor(private service: RbacRoleRightRelationService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<RbacRoleRightRelation> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<RbacRoleRightRelation>) => response.ok),
                map((rbacRoleRightRelation: HttpResponse<RbacRoleRightRelation>) => rbacRoleRightRelation.body)
            );
        }
        return of(new RbacRoleRightRelation());
    }
}

export const rbacRoleRightRelationRoute: Routes = [
    {
        path: 'rbac-role-right-relation',
        component: RbacRoleRightRelationComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'id,asc',
            pageTitle: 'fccApp.rbacRoleRightRelation.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'rbac-role-right-relation/:id/view',
        component: RbacRoleRightRelationDetailComponent,
        resolve: {
            rbacRoleRightRelation: RbacRoleRightRelationResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'fccApp.rbacRoleRightRelation.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'rbac-role-right-relation/new',
        component: RbacRoleRightRelationUpdateComponent,
        resolve: {
            rbacRoleRightRelation: RbacRoleRightRelationResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'fccApp.rbacRoleRightRelation.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'rbac-role-right-relation/:id/edit',
        component: RbacRoleRightRelationUpdateComponent,
        resolve: {
            rbacRoleRightRelation: RbacRoleRightRelationResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'fccApp.rbacRoleRightRelation.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const rbacRoleRightRelationPopupRoute: Routes = [
    {
        path: 'rbac-role-right-relation/:id/delete',
        component: RbacRoleRightRelationDeletePopupComponent,
        resolve: {
            rbacRoleRightRelation: RbacRoleRightRelationResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'fccApp.rbacRoleRightRelation.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
