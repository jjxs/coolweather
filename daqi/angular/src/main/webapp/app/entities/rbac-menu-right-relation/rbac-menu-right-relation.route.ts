import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { RbacMenuRightRelation } from 'app/shared/model/rbac-menu-right-relation.model';
import { RbacMenuRightRelationService } from './rbac-menu-right-relation.service';
import { RbacMenuRightRelationComponent } from './rbac-menu-right-relation.component';
import { RbacMenuRightRelationDetailComponent } from './rbac-menu-right-relation-detail.component';
import { RbacMenuRightRelationUpdateComponent } from './rbac-menu-right-relation-update.component';
import { RbacMenuRightRelationDeletePopupComponent } from './rbac-menu-right-relation-delete-dialog.component';
import { IRbacMenuRightRelation } from 'app/shared/model/rbac-menu-right-relation.model';

@Injectable({ providedIn: 'root' })
export class RbacMenuRightRelationResolve implements Resolve<IRbacMenuRightRelation> {
    constructor(private service: RbacMenuRightRelationService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<RbacMenuRightRelation> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<RbacMenuRightRelation>) => response.ok),
                map((rbacMenuRightRelation: HttpResponse<RbacMenuRightRelation>) => rbacMenuRightRelation.body)
            );
        }
        return of(new RbacMenuRightRelation());
    }
}

export const rbacMenuRightRelationRoute: Routes = [
    {
        path: 'rbac-menu-right-relation',
        component: RbacMenuRightRelationComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'id,asc',
            pageTitle: 'fccApp.rbacMenuRightRelation.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'rbac-menu-right-relation/:id/view',
        component: RbacMenuRightRelationDetailComponent,
        resolve: {
            rbacMenuRightRelation: RbacMenuRightRelationResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'fccApp.rbacMenuRightRelation.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'rbac-menu-right-relation/new',
        component: RbacMenuRightRelationUpdateComponent,
        resolve: {
            rbacMenuRightRelation: RbacMenuRightRelationResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'fccApp.rbacMenuRightRelation.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'rbac-menu-right-relation/:id/edit',
        component: RbacMenuRightRelationUpdateComponent,
        resolve: {
            rbacMenuRightRelation: RbacMenuRightRelationResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'fccApp.rbacMenuRightRelation.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const rbacMenuRightRelationPopupRoute: Routes = [
    {
        path: 'rbac-menu-right-relation/:id/delete',
        component: RbacMenuRightRelationDeletePopupComponent,
        resolve: {
            rbacMenuRightRelation: RbacMenuRightRelationResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'fccApp.rbacMenuRightRelation.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
