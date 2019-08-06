import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { QmsMateriel } from 'app/shared/model/qms-materiel.model';
import { QmsMaterielService } from './qms-materiel.service';
import { QmsMaterielComponent } from './qms-materiel.component';
import { QmsMaterielDetailComponent } from './qms-materiel-detail.component';
import { QmsMaterielUpdateComponent } from './qms-materiel-update.component';
import { QmsMaterielDeletePopupComponent } from './qms-materiel-delete-dialog.component';
import { IQmsMateriel } from 'app/shared/model/qms-materiel.model';

@Injectable({ providedIn: 'root' })
export class QmsMaterielResolve implements Resolve<IQmsMateriel> {
    constructor(private service: QmsMaterielService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<QmsMateriel> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<QmsMateriel>) => response.ok),
                map((qmsMateriel: HttpResponse<QmsMateriel>) => qmsMateriel.body)
            );
        }
        return of(new QmsMateriel());
    }
}

export const qmsMaterielRoute: Routes = [
    {
        path: 'qms-materiel',
        component: QmsMaterielComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'id,asc',
            pageTitle: 'fccApp.qmsMateriel.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'qms-materiel/:id/view',
        component: QmsMaterielDetailComponent,
        resolve: {
            qmsMateriel: QmsMaterielResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'fccApp.qmsMateriel.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'qms-materiel/new',
        component: QmsMaterielUpdateComponent,
        resolve: {
            qmsMateriel: QmsMaterielResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'fccApp.qmsMateriel.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'qms-materiel/:id/edit',
        component: QmsMaterielUpdateComponent,
        resolve: {
            qmsMateriel: QmsMaterielResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'fccApp.qmsMateriel.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const qmsMaterielPopupRoute: Routes = [
    {
        path: 'qms-materiel/:id/delete',
        component: QmsMaterielDeletePopupComponent,
        resolve: {
            qmsMateriel: QmsMaterielResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'fccApp.qmsMateriel.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
