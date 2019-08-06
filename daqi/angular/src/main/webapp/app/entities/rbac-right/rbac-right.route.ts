import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { RbacRight } from 'app/shared/model/rbac-right.model';
import { RbacRightService } from './rbac-right.service';
import { RbacRightComponent } from './rbac-right.component';
import { RbacRightDetailComponent } from './rbac-right-detail.component';
import { RbacRightUpdateComponent } from './rbac-right-update.component';
import { RbacRightDeletePopupComponent } from './rbac-right-delete-dialog.component';
import { IRbacRight } from 'app/shared/model/rbac-right.model';

@Injectable({ providedIn: 'root' })
export class RbacRightResolve implements Resolve<IRbacRight> {
    constructor(private service: RbacRightService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<RbacRight> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<RbacRight>) => response.ok),
                map((rbacRight: HttpResponse<RbacRight>) => rbacRight.body)
            );
        }
        return of(new RbacRight());
    }
}

export const rbacRightRoute: Routes = [
    {
        path: '',
        component: RbacRightComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'id,asc',
            pageTitle: 'rbacRight.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/view',
        component: RbacRightDetailComponent,
        resolve: {
            rbacRight: RbacRightResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'rbacRight.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'new',
        component: RbacRightUpdateComponent,
        resolve: {
            rbacRight: RbacRightResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'rbacRight.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/edit',
        component: RbacRightUpdateComponent,
        resolve: {
            rbacRight: RbacRightResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'rbacRight.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const rbacRightPopupRoute: Routes = [
    {
        path: 'rbac-right/:id/delete',
        component: RbacRightDeletePopupComponent,
        resolve: {
            rbacRight: RbacRightResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'rbacRight.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
