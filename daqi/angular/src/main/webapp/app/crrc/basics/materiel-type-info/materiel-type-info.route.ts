import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { QmsMaterielType } from 'app/shared/model/qms-materiel-type.model';
import { MaterielTypeInfoService } from './materiel-type-info.service';
import { MaterielTypeInfoComponent } from './materiel-type-info.component';
import { IQmsMaterielType } from 'app/shared/model/qms-materiel-type.model';

@Injectable({ providedIn: 'root' })
export class QmsMaterielTypeResolve implements Resolve<IQmsMaterielType> {
    constructor(private service: MaterielTypeInfoService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<QmsMaterielType> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<QmsMaterielType>) => response.ok),
                map((qmsMaterielType: HttpResponse<QmsMaterielType>) => qmsMaterielType.body)
            );
        }
        return of(new QmsMaterielType());
    }
}

export const MaterielTypeInfoRoute: Routes = [
    {
        path: '',
        component: MaterielTypeInfoComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'id,asc',
            pageTitle: 'fccApp.qmsMaterielType.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

