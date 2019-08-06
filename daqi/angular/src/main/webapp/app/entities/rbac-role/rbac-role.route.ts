import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { RbacRole } from 'app/shared/model/rbac-role.model';
import { RbacRoleService } from './rbac-role.service';
import { RbacRoleComponent } from './rbac-role.component';
import { RbacRoleDetailComponent } from './rbac-role-detail.component';
import { RbacRoleUpdateComponent } from './rbac-role-update.component';
import { RbacRoleDeletePopupComponent } from './rbac-role-delete-dialog.component';
import { IRbacRole } from 'app/shared/model/rbac-role.model';

@Injectable({ providedIn: 'root' })
export class RbacRoleResolve implements Resolve<IRbacRole> {
    constructor(private service: RbacRoleService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<RbacRole> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<RbacRole>) => response.ok),
                map((rbacRole: HttpResponse<RbacRole>) => rbacRole.body)
            );
        }
        return of(new RbacRole());
    }
}

export const rbacRoleRoute: Routes = [
    {
        path: '',
        component: RbacRoleComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'id,asc',
            pageTitle: 'rbacRole.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/view',
        component: RbacRoleDetailComponent,
        resolve: {
            rbacRole: RbacRoleResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'rbacRole.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'new',
        component: RbacRoleUpdateComponent,
        resolve: {
            rbacRole: RbacRoleResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'rbacRole.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/edit',
        component: RbacRoleUpdateComponent,
        resolve: {
            rbacRole: RbacRoleResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'rbacRole.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const rbacRolePopupRoute: Routes = [
    {
        path: 'rbac-role/:id/delete',
        component: RbacRoleDeletePopupComponent,
        resolve: {
            rbacRole: RbacRoleResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'rbacRole.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
