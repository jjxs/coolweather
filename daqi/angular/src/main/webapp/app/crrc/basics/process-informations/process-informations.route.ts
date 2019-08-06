import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { Observable, of, from } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { QmsBom } from 'app/shared/model/qms-bom.model';
import { ProcessInformationsService } from './process-informations.service';
import { ProcessInformationsComponent } from './process-informations.component';
import { IQmsBom } from 'app/shared/model/qms-bom.model';
import { ProcessInformationsUpdateComponent } from './process-informations-update.component';
import {ProcessInformationsDetailComponent} from './process-informations-detail.component'

@Injectable({ providedIn: 'root' })
export class QmsProcessInformationsResolve implements Resolve<IQmsBom> {
    constructor(private service: ProcessInformationsService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<QmsBom> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<QmsBom>) => response.ok),
                map((qmsBom: HttpResponse<QmsBom>) => qmsBom.body)
            );
        }
        return of(new QmsBom());
    }
}

export const processInformationsRoute: Routes = [
    {
        path: '',
        component: ProcessInformationsComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'id,asc',
            pageTitle: 'fccApp.qmsBom.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'new',
        component: ProcessInformationsUpdateComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'fccApp.qmsBom.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
    ,
    {
        path: 'detail',
        component: ProcessInformationsDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'fccApp.qmsBom.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];
