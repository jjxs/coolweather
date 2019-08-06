import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { QmsQualityControl } from 'app/shared/model/qms-quality-control.model';
import { QmsQualityControlService } from './qms-quality-control.service';
import { QmsQualityControlComponent } from './qms-quality-control.component';
import { QmsQualityControlDetailComponent } from './qms-quality-control-detail.component';
import { QmsQualityControlUpdateComponent } from './qms-quality-control-update.component';
import { QmsQualityControlDeletePopupComponent } from './qms-quality-control-delete-dialog.component';
import { IQmsQualityControl } from 'app/shared/model/qms-quality-control.model';

@Injectable({ providedIn: 'root' })
export class QmsQualityControlResolve implements Resolve<IQmsQualityControl> {
    constructor(private service: QmsQualityControlService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<QmsQualityControl> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<QmsQualityControl>) => response.ok),
                map((qmsQualityControl: HttpResponse<QmsQualityControl>) => qmsQualityControl.body)
            );
        }
        return of(new QmsQualityControl());
    }
}

export const qmsQualityControlRoute: Routes = [
    {
        path: '',
        component: QmsQualityControlComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'id,asc',
            pageTitle: 'fccApp.qmsQualityControl.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/view',
        component: QmsQualityControlDetailComponent,
        resolve: {
            qmsQualityControl: QmsQualityControlResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'fccApp.qmsQualityControl.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'new',
        component: QmsQualityControlUpdateComponent,
        resolve: {
            qmsQualityControl: QmsQualityControlResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'fccApp.qmsQualityControl.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/edit',
        component: QmsQualityControlUpdateComponent,
        resolve: {
            qmsQualityControl: QmsQualityControlResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'fccApp.qmsQualityControl.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const qmsQualityControlPopupRoute: Routes = [
    {
        path: ':id/delete',
        component: QmsQualityControlDeletePopupComponent,
        resolve: {
            qmsQualityControl: QmsQualityControlResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'fccApp.qmsQualityControl.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
