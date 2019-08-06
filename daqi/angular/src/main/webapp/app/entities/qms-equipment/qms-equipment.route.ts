import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { QmsEquipment } from 'app/shared/model/qms-equipment.model';
import { QmsEquipmentService } from './qms-equipment.service';
import { QmsEquipmentComponent } from './qms-equipment.component';
import { QmsEquipmentDetailComponent } from './qms-equipment-detail.component';
import { QmsEquipmentUpdateComponent } from './qms-equipment-update.component';
import { QmsEquipmentDeletePopupComponent } from './qms-equipment-delete-dialog.component';
import { IQmsEquipment } from 'app/shared/model/qms-equipment.model';

@Injectable({ providedIn: 'root' })
export class QmsEquipmentResolve implements Resolve<IQmsEquipment> {
    constructor(private service: QmsEquipmentService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<QmsEquipment> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<QmsEquipment>) => response.ok),
                map((qmsEquipment: HttpResponse<QmsEquipment>) => qmsEquipment.body)
            );
        }
        return of(new QmsEquipment());
    }
}

export const qmsEquipmentRoute: Routes = [
    {
        path: 'qms-equipment',
        component: QmsEquipmentComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'id,asc',
            pageTitle: 'fccApp.qmsEquipment.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'qms-equipment/:id/view',
        component: QmsEquipmentDetailComponent,
        resolve: {
            qmsEquipment: QmsEquipmentResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'fccApp.qmsEquipment.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'qms-equipment/new',
        component: QmsEquipmentUpdateComponent,
        resolve: {
            qmsEquipment: QmsEquipmentResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'fccApp.qmsEquipment.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'qms-equipment/:id/edit',
        component: QmsEquipmentUpdateComponent,
        resolve: {
            qmsEquipment: QmsEquipmentResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'fccApp.qmsEquipment.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const qmsEquipmentPopupRoute: Routes = [
    {
        path: 'qms-equipment/:id/delete',
        component: QmsEquipmentDeletePopupComponent,
        resolve: {
            qmsEquipment: QmsEquipmentResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'fccApp.qmsEquipment.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
