import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { QmsDefect } from 'app/shared/model/qms-defect.model';
import { DefectInformationService } from './defect-information.service';
import { DefectInformationComponent } from './defect-information.component';
import { IQmsDefect } from 'app/shared/model/qms-defect.model';

@Injectable({ providedIn: 'root' })
export class DefectResolve implements Resolve<IQmsDefect> {
    constructor(private service: DefectInformationService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<QmsDefect> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<QmsDefect>) => response.ok),
                map((qmsDefect: HttpResponse<QmsDefect>) => qmsDefect.body)
            );
        }
        return of(new QmsDefect());
    }
}

export const DefectInformationRoute: Routes = [
    {
        path: '',
        component: DefectInformationComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'id,asc',
            pageTitle: 'fccApp.qmsDefect.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

