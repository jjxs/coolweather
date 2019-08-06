import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { RbacElement } from 'app/shared/model/rbac-element.model';
import { RbacElementService } from './rbac-element.service';
import { RbacElementComponent } from './rbac-element.component';
import { RbacElementDetailComponent } from './rbac-element-detail.component';
import { RbacElementUpdateComponent } from './rbac-element-update.component';
import { RbacElementDeletePopupComponent } from './rbac-element-delete-dialog.component';
import { IRbacElement } from 'app/shared/model/rbac-element.model';

@Injectable({ providedIn: 'root' })
export class RbacElementResolve implements Resolve<IRbacElement> {
    constructor(private service: RbacElementService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<RbacElement> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<RbacElement>) => response.ok),
                map((rbacElement: HttpResponse<RbacElement>) => rbacElement.body)
            );
        }
        return of(new RbacElement());
    }
}

export const rbacElementRoute: Routes = [
    {
        path: 'rbac-element',
        component: RbacElementComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'id,asc',
            pageTitle: 'fccApp.rbacElement.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'rbac-element/:id/view',
        component: RbacElementDetailComponent,
        resolve: {
            rbacElement: RbacElementResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'fccApp.rbacElement.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'rbac-element/new',
        component: RbacElementUpdateComponent,
        resolve: {
            rbacElement: RbacElementResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'fccApp.rbacElement.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'rbac-element/:id/edit',
        component: RbacElementUpdateComponent,
        resolve: {
            rbacElement: RbacElementResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'fccApp.rbacElement.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const rbacElementPopupRoute: Routes = [
    {
        path: 'rbac-element/:id/delete',
        component: RbacElementDeletePopupComponent,
        resolve: {
            rbacElement: RbacElementResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'fccApp.rbacElement.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
