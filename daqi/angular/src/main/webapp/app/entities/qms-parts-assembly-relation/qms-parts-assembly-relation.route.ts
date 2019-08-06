import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { QmsPartsAssemblyRelation } from 'app/shared/model/qms-parts-assembly-relation.model';
import { QmsPartsAssemblyRelationService } from './qms-parts-assembly-relation.service';
import { QmsPartsAssemblyRelationComponent } from './qms-parts-assembly-relation.component';
import { QmsPartsAssemblyRelationDetailComponent } from './qms-parts-assembly-relation-detail.component';
import { QmsPartsAssemblyRelationUpdateComponent } from './qms-parts-assembly-relation-update.component';
import { QmsPartsAssemblyRelationDeletePopupComponent } from './qms-parts-assembly-relation-delete-dialog.component';
import { IQmsPartsAssemblyRelation } from 'app/shared/model/qms-parts-assembly-relation.model';

@Injectable({ providedIn: 'root' })
export class QmsPartsAssemblyRelationResolve implements Resolve<IQmsPartsAssemblyRelation> {
    constructor(private service: QmsPartsAssemblyRelationService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<QmsPartsAssemblyRelation> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<QmsPartsAssemblyRelation>) => response.ok),
                map((qmsPartsAssemblyRelation: HttpResponse<QmsPartsAssemblyRelation>) => qmsPartsAssemblyRelation.body)
            );
        }
        return of(new QmsPartsAssemblyRelation());
    }
}

export const qmsPartsAssemblyRelationRoute: Routes = [
    {
        path: 'qms-parts-assembly-relation',
        component: QmsPartsAssemblyRelationComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'id,asc',
            pageTitle: 'fccApp.qmsPartsAssemblyRelation.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'qms-parts-assembly-relation/:id/view',
        component: QmsPartsAssemblyRelationDetailComponent,
        resolve: {
            qmsPartsAssemblyRelation: QmsPartsAssemblyRelationResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'fccApp.qmsPartsAssemblyRelation.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'qms-parts-assembly-relation/new',
        component: QmsPartsAssemblyRelationUpdateComponent,
        resolve: {
            qmsPartsAssemblyRelation: QmsPartsAssemblyRelationResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'fccApp.qmsPartsAssemblyRelation.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'qms-parts-assembly-relation/:id/edit',
        component: QmsPartsAssemblyRelationUpdateComponent,
        resolve: {
            qmsPartsAssemblyRelation: QmsPartsAssemblyRelationResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'fccApp.qmsPartsAssemblyRelation.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const qmsPartsAssemblyRelationPopupRoute: Routes = [
    {
        path: 'qms-parts-assembly-relation/:id/delete',
        component: QmsPartsAssemblyRelationDeletePopupComponent,
        resolve: {
            qmsPartsAssemblyRelation: QmsPartsAssemblyRelationResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'fccApp.qmsPartsAssemblyRelation.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
