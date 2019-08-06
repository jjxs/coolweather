import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { RbacMenu } from 'app/shared/model/rbac-menu.model';
import { RbacMenuService } from './rbac-menu.service';
import { RbacMenuComponent } from './rbac-menu.component';
import { RbacMenuDetailComponent } from './rbac-menu-detail.component';
import { RbacMenuUpdateComponent } from './rbac-menu-update.component';
import { RbacMenuDeletePopupComponent } from './rbac-menu-delete-dialog.component';
import { IRbacMenu } from 'app/shared/model/rbac-menu.model';

@Injectable({ providedIn: 'root' })
export class RbacMenuResolve implements Resolve<IRbacMenu> {
    constructor(private service: RbacMenuService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<RbacMenu> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<RbacMenu>) => response.ok),
                map((rbacMenu: HttpResponse<RbacMenu>) => rbacMenu.body)
            );
        }
        return of(new RbacMenu());
    }
}

export const rbacMenuRoute: Routes = [
    {
        path: '',
        component: RbacMenuComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'id,asc',
            pageTitle: 'fccApp.rbacMenu.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'rbac-menu/:id/view',
        component: RbacMenuDetailComponent,
        resolve: {
            rbacMenu: RbacMenuResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'fccApp.rbacMenu.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'rbac-menu/new',
        component: RbacMenuUpdateComponent,
        resolve: {
            rbacMenu: RbacMenuResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'fccApp.rbacMenu.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'rbac-menu/:id/edit',
        component: RbacMenuUpdateComponent,
        resolve: {
            rbacMenu: RbacMenuResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'fccApp.rbacMenu.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const rbacMenuPopupRoute: Routes = [
    {
        path: 'rbac-menu/:id/delete',
        component: RbacMenuDeletePopupComponent,
        resolve: {
            rbacMenu: RbacMenuResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'fccApp.rbacMenu.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
