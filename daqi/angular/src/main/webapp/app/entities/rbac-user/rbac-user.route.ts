import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { RbacUser } from 'app/shared/model/rbac-user.model';
import { RbacUserService } from './rbac-user.service';
import { RbacUserComponent } from './rbac-user.component';
import { RbacUserDetailComponent } from './rbac-user-detail.component';
import { RbacUserUpdateComponent } from './rbac-user-update.component';
import { RbacUserDeletePopupComponent } from './rbac-user-delete-dialog.component';
import { IRbacUser } from 'app/shared/model/rbac-user.model';

@Injectable({ providedIn: 'root' })
export class RbacUserResolve implements Resolve<IRbacUser> {
    constructor(private service: RbacUserService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<RbacUser> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<RbacUser>) => response.ok),
                map((rbacUser: HttpResponse<RbacUser>) => rbacUser.body)
            );
        }
        return of(new RbacUser());
    }
}

export const rbacUserRoute: Routes = [
    {
        path: '',
        component: RbacUserComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'id,asc',
            pageTitle: 'rbacUser.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/view',
        component: RbacUserDetailComponent,
        resolve: {
            rbacUser: RbacUserResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'rbacUser.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'new',
        component: RbacUserUpdateComponent,
        resolve: {
            rbacUser: RbacUserResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'rbacUser.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/edit',
        component: RbacUserUpdateComponent,
        resolve: {
            rbacUser: RbacUserResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'rbacUser.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const rbacUserPopupRoute: Routes = [
    {
        path: 'rbac-user/:id/delete',
        component: RbacUserDeletePopupComponent,
        resolve: {
            rbacUser: RbacUserResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'rbacUser.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
