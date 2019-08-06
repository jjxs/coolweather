import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { HstServerInfoDetails } from 'app/shared/model/hst-server-info-details.model';
import { HstServerInfoDetailsService } from './hst-server-info-details.service';
import { HstServerInfoDetailsComponent } from './hst-server-info-details.component';
import { HstServerInfoDetailsDetailComponent } from './hst-server-info-details-detail.component';
import { HstServerInfoDetailsUpdateComponent } from './hst-server-info-details-update.component';
import { HstServerInfoDetailsDeletePopupComponent } from './hst-server-info-details-delete-dialog.component';
import { IHstServerInfoDetails } from 'app/shared/model/hst-server-info-details.model';

@Injectable({ providedIn: 'root' })
export class HstServerInfoDetailsResolve implements Resolve<IHstServerInfoDetails> {
    constructor(private service: HstServerInfoDetailsService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<HstServerInfoDetails> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<HstServerInfoDetails>) => response.ok),
                map((hstServerInfoDetails: HttpResponse<HstServerInfoDetails>) => hstServerInfoDetails.body)
            );
        }
        return of(new HstServerInfoDetails());
    }
}

export const hstServerInfoDetailsRoute: Routes = [
    {
        path: 'hst-server-info-details',
        component: HstServerInfoDetailsComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'fccApp.hstServerInfoDetails.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'hst-server-info-details/:id/view',
        component: HstServerInfoDetailsDetailComponent,
        resolve: {
            hstServerInfoDetails: HstServerInfoDetailsResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'fccApp.hstServerInfoDetails.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'hst-server-info-details/new',
        component: HstServerInfoDetailsUpdateComponent,
        resolve: {
            hstServerInfoDetails: HstServerInfoDetailsResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'fccApp.hstServerInfoDetails.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'hst-server-info-details/:id/edit',
        component: HstServerInfoDetailsUpdateComponent,
        resolve: {
            hstServerInfoDetails: HstServerInfoDetailsResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'fccApp.hstServerInfoDetails.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const hstServerInfoDetailsPopupRoute: Routes = [
    {
        path: 'hst-server-info-details/:id/delete',
        component: HstServerInfoDetailsDeletePopupComponent,
        resolve: {
            hstServerInfoDetails: HstServerInfoDetailsResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'fccApp.hstServerInfoDetails.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
