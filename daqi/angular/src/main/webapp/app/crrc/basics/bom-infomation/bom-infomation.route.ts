import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { QmsBom } from 'app/shared/model/qms-bom.model';
import { BomInformationService } from './bom-infomation.service';
import { BomInformationComponent } from './bom-infomation.component';
import { IQmsBom } from 'app/shared/model/qms-bom.model';

@Injectable({ providedIn: 'root' })
export class QmsBomResolve implements Resolve<IQmsBom> {
    constructor(private service: BomInformationService) {}

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

export const bomInformationRoute: Routes = [
    {
        path: '',
        component: BomInformationComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'id,asc',
            pageTitle: 'fccApp.qmsBom.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];
