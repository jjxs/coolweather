import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { QmsUnhealthy } from 'app/shared/model/qms-unhealthy.model';
import { AdverseReactionInformationService } from './adverse-reaction-information.service';
import { AdverseReactionInformationComponent } from './adverse-reaction-information.component';
import { IQmsUnhealthy } from 'app/shared/model/qms-unhealthy.model';

@Injectable({ providedIn: 'root' })
export class QmsUnhealthyResolve implements Resolve<IQmsUnhealthy> {
    constructor(private service: AdverseReactionInformationService) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<QmsUnhealthy> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<QmsUnhealthy>) => response.ok),
                map((qmsUnhealthy: HttpResponse<QmsUnhealthy>) => qmsUnhealthy.body)
            );
        }
        return of(new QmsUnhealthy());
    }
}

export const AdverseReactionInformationRoute: Routes = [
    {
        path: '',
        component: AdverseReactionInformationComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'id,asc',
            pageTitle: 'fccApp.qmsUnhealthy.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

