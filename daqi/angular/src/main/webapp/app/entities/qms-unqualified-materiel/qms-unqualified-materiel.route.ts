import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { QmsUnqualifiedMateriel } from 'app/shared/model/qms-unqualified-materiel.model';
import { QmsUnqualifiedMaterielService } from './qms-unqualified-materiel.service';
import { QmsUnqualifiedMaterielComponent } from './qms-unqualified-materiel.component';
import { QmsUnqualifiedMaterielDetailComponent } from './qms-unqualified-materiel-detail.component';
import { QmsUnqualifiedMaterielUpdateComponent } from './qms-unqualified-materiel-update.component';
import { QmsUnqualifiedMaterielDeletePopupComponent } from './qms-unqualified-materiel-delete-dialog.component';
import { IQmsUnqualifiedMateriel } from 'app/shared/model/qms-unqualified-materiel.model';

@Injectable({ providedIn: 'root' })
export class QmsUnqualifiedMaterielResolve implements Resolve<IQmsUnqualifiedMateriel> {
    constructor(private service: QmsUnqualifiedMaterielService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<QmsUnqualifiedMateriel> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<QmsUnqualifiedMateriel>) => response.ok),
                map((qmsUnqualifiedMateriel: HttpResponse<QmsUnqualifiedMateriel>) => qmsUnqualifiedMateriel.body)
            );
        }
        return of(new QmsUnqualifiedMateriel());
    }
}

export const qmsUnqualifiedMaterielRoute: Routes = [
    {
        path: 'qms-unqualified-materiel',
        component: QmsUnqualifiedMaterielComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'id,asc',
            pageTitle: 'fccApp.qmsUnqualifiedMateriel.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'qms-unqualified-materiel/:id/view',
        component: QmsUnqualifiedMaterielDetailComponent,
        resolve: {
            qmsUnqualifiedMateriel: QmsUnqualifiedMaterielResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'fccApp.qmsUnqualifiedMateriel.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'qms-unqualified-materiel/new',
        component: QmsUnqualifiedMaterielUpdateComponent,
        resolve: {
            qmsUnqualifiedMateriel: QmsUnqualifiedMaterielResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'fccApp.qmsUnqualifiedMateriel.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'qms-unqualified-materiel/:id/edit',
        component: QmsUnqualifiedMaterielUpdateComponent,
        resolve: {
            qmsUnqualifiedMateriel: QmsUnqualifiedMaterielResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'fccApp.qmsUnqualifiedMateriel.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const qmsUnqualifiedMaterielPopupRoute: Routes = [
    {
        path: 'qms-unqualified-materiel/:id/delete',
        component: QmsUnqualifiedMaterielDeletePopupComponent,
        resolve: {
            qmsUnqualifiedMateriel: QmsUnqualifiedMaterielResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'fccApp.qmsUnqualifiedMateriel.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
