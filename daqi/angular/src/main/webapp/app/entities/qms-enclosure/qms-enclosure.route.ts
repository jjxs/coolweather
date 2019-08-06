import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { QmsEnclosure } from 'app/shared/model/qms-enclosure.model';
import { QmsEnclosureService } from './qms-enclosure.service';
import { QmsEnclosureComponent } from './qms-enclosure.component';
import { QmsEnclosureDetailComponent } from './qms-enclosure-detail.component';
import { QmsEnclosureUpdateComponent } from './qms-enclosure-update.component';
import { QmsEnclosureDeletePopupComponent } from './qms-enclosure-delete-dialog.component';
import { IQmsEnclosure } from 'app/shared/model/qms-enclosure.model';

@Injectable({ providedIn: 'root' })
export class QmsEnclosureResolve implements Resolve<IQmsEnclosure> {
    constructor(private service: QmsEnclosureService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<QmsEnclosure> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<QmsEnclosure>) => response.ok),
                map((qmsEnclosure: HttpResponse<QmsEnclosure>) => qmsEnclosure.body)
            );
        }
        return of(new QmsEnclosure());
    }
}

export const qmsEnclosureRoute: Routes = [
    {
        path: 'qms-enclosure',
        component: QmsEnclosureComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'id,asc',
            pageTitle: 'fccApp.qmsEnclosure.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'qms-enclosure/:id/view',
        component: QmsEnclosureDetailComponent,
        resolve: {
            qmsEnclosure: QmsEnclosureResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'fccApp.qmsEnclosure.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'qms-enclosure/new',
        component: QmsEnclosureUpdateComponent,
        resolve: {
            qmsEnclosure: QmsEnclosureResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'fccApp.qmsEnclosure.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'qms-enclosure/:id/edit',
        component: QmsEnclosureUpdateComponent,
        resolve: {
            qmsEnclosure: QmsEnclosureResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'fccApp.qmsEnclosure.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const qmsEnclosurePopupRoute: Routes = [
    {
        path: 'qms-enclosure/:id/delete',
        component: QmsEnclosureDeletePopupComponent,
        resolve: {
            qmsEnclosure: QmsEnclosureResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'fccApp.qmsEnclosure.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
