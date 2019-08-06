import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { QmsProductionInspection } from 'app/shared/model/qms-production-inspection.model';
import { QmsProductionInspectionSelfService } from './qms-production-inspection.self.service';
import { QmsProductionInspectionSelfComponent } from './qms-production-inspection.self.component';
import { IQmsProductionInspection } from 'app/shared/model/qms-production-inspection.model';

@Injectable({ providedIn: 'root' })
export class QmsProductionInspectionSelfResolve implements Resolve<IQmsProductionInspection> {
    constructor(private service: QmsProductionInspectionSelfService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<QmsProductionInspection> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<QmsProductionInspection>) => response.ok),
                map((qmsProductionInspection: HttpResponse<QmsProductionInspection>) => qmsProductionInspection.body)
            );
        }
        return of(new QmsProductionInspection());
    }
}

export const QmsProductionInspectionRoute: Routes = [
    {
        path: '',
        component: QmsProductionInspectionSelfComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'id,asc',
            pageTitle: 'fccApp.qmsProductionInspection.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
];
