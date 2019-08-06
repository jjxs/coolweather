import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { QmsProductionTask } from 'app/shared/model/qms-production-task.model';
import { QmsProductionTaskService } from './qms-production-task.service';
import { QmsProductionTaskComponent } from './qms-production-task.component';
import { QmsProductionTaskDetailComponent } from './qms-production-task-detail.component';
import { QmsProductionTaskUpdateComponent } from './qms-production-task-update.component';
import { QmsProductionTaskDeletePopupComponent } from './qms-production-task-delete-dialog.component';
import { IQmsProductionTask } from 'app/shared/model/qms-production-task.model';

@Injectable({ providedIn: 'root' })
export class QmsProductionTaskResolve implements Resolve<IQmsProductionTask> {
    constructor(private service: QmsProductionTaskService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<QmsProductionTask> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<QmsProductionTask>) => response.ok),
                map((qmsProductionTask: HttpResponse<QmsProductionTask>) => qmsProductionTask.body)
            );
        }
        return of(new QmsProductionTask());
    }
}

export const qmsProductionTaskRoute: Routes = [
    {
        path: 'qms-production-task',
        component: QmsProductionTaskComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'id,asc',
            pageTitle: 'fccApp.qmsProductionTask.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'qms-production-task/:id/view',
        component: QmsProductionTaskDetailComponent,
        resolve: {
            qmsProductionTask: QmsProductionTaskResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'fccApp.qmsProductionTask.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'qms-production-task/new',
        component: QmsProductionTaskUpdateComponent,
        resolve: {
            qmsProductionTask: QmsProductionTaskResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'fccApp.qmsProductionTask.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'qms-production-task/:id/edit',
        component: QmsProductionTaskUpdateComponent,
        resolve: {
            qmsProductionTask: QmsProductionTaskResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'fccApp.qmsProductionTask.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const qmsProductionTaskPopupRoute: Routes = [
    {
        path: 'qms-production-task/:id/delete',
        component: QmsProductionTaskDeletePopupComponent,
        resolve: {
            qmsProductionTask: QmsProductionTaskResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'fccApp.qmsProductionTask.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
