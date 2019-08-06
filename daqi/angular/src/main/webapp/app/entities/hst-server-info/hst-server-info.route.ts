import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { HstServerInfo } from 'app/shared/model/hst-server-info.model';
import { HstServerInfoService } from './hst-server-info.service';
import { HstServerInfoComponent } from './hst-server-info.component';
import { HstServerInfoDetailComponent } from './hst-server-info-detail.component';
import { HstServerInfoUpdateComponent } from './hst-server-info-update.component';
import { HstServerInfoDeletePopupComponent } from './hst-server-info-delete-dialog.component';
import { IHstServerInfo } from 'app/shared/model/hst-server-info.model';

@Injectable({ providedIn: 'root' })
export class HstServerInfoResolve implements Resolve<IHstServerInfo> {
    constructor(private service: HstServerInfoService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<HstServerInfo> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<HstServerInfo>) => response.ok),
                map((hstServerInfo: HttpResponse<HstServerInfo>) => hstServerInfo.body)
            );
        }
        return of(new HstServerInfo());
    }
}

export const hstServerInfoRoute: Routes = [
    {
        path: 'hst-server-info',
        component: HstServerInfoComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'fccApp.hstServerInfo.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'hst-server-info/:id/view',
        component: HstServerInfoDetailComponent,
        resolve: {
            hstServerInfo: HstServerInfoResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'fccApp.hstServerInfo.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'hst-server-info/new',
        component: HstServerInfoUpdateComponent,
        resolve: {
            hstServerInfo: HstServerInfoResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'fccApp.hstServerInfo.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'hst-server-info/:id/edit',
        component: HstServerInfoUpdateComponent,
        resolve: {
            hstServerInfo: HstServerInfoResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'fccApp.hstServerInfo.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const hstServerInfoPopupRoute: Routes = [
    {
        path: 'hst-server-info/:id/delete',
        component: HstServerInfoDeletePopupComponent,
        resolve: {
            hstServerInfo: HstServerInfoResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'fccApp.hstServerInfo.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
