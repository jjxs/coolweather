import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { PapiToken } from 'app/shared/model/papi-token.model';
import { PapiTokenService } from './papi-token.service';
import { PapiTokenComponent } from './papi-token.component';
import { PapiTokenDetailComponent } from './papi-token-detail.component';
import { PapiTokenUpdateComponent } from './papi-token-update.component';
import { PapiTokenDeletePopupComponent } from './papi-token-delete-dialog.component';
import { IPapiToken } from 'app/shared/model/papi-token.model';

@Injectable({ providedIn: 'root' })
export class PapiTokenResolve implements Resolve<IPapiToken> {
    constructor(private service: PapiTokenService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<PapiToken> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<PapiToken>) => response.ok),
                map((papiToken: HttpResponse<PapiToken>) => papiToken.body)
            );
        }
        return of(new PapiToken());
    }
}

export const papiTokenRoute: Routes = [
    {
        path: 'papi-token',
        component: PapiTokenComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'fccApp.papiToken.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'papi-token/:id/view',
        component: PapiTokenDetailComponent,
        resolve: {
            papiToken: PapiTokenResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'fccApp.papiToken.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'papi-token/new',
        component: PapiTokenUpdateComponent,
        resolve: {
            papiToken: PapiTokenResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'fccApp.papiToken.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'papi-token/:id/edit',
        component: PapiTokenUpdateComponent,
        resolve: {
            papiToken: PapiTokenResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'fccApp.papiToken.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const papiTokenPopupRoute: Routes = [
    {
        path: 'papi-token/:id/delete',
        component: PapiTokenDeletePopupComponent,
        resolve: {
            papiToken: PapiTokenResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'fccApp.papiToken.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
