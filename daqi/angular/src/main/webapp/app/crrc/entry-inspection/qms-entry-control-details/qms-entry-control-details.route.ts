import { Injectable, Component } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { Observable, of, from } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { QmsEntryControlDetails } from 'app/shared/model/qms-entry-control-details.model';
import { QmsEntryControlDetailsService } from './qms-entry-control-details.service';
import { QmsEntryControlDetailsComponent } from './qms-entry-control-details.component';
import { IQmsEntryControlDetails } from 'app/shared/model/qms-entry-control-details.model';
import { CanDeactivate } from '@angular/router';
import { ConfirmComponent } from './confirm-dialog.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LocalStorageService, SessionStorageService } from 'ngx-webstorage';
@Injectable()
export class CanDeactivateGuard implements CanDeactivate<QmsEntryControlDetailsComponent> {

    constructor(private modalService: NgbModal,
        private localStorage: LocalStorageService) {
    }
    canDeactivate(
        component: QmsEntryControlDetailsComponent,
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean> | Promise<boolean> | boolean {
        if (this.localStorage.retrieve('editFlag') === '1') {
            const res = this.modalService.open(ConfirmComponent as Component, { backdrop: 'static', keyboard: false, size: 'lg' })
            res.componentInstance.leave = true;
            const result = res.result.then(
                function (result) {
                    return result;
                }
            )
            return result;
        } else {
            return true;
        }
    }

}
export const qmsEntryControlDetailsRoute: Routes = [
    {
        path: '',
        component: QmsEntryControlDetailsComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'id,asc',
            pageTitle: 'fccApp.qmsEntryControlDetails.home.title'
        },
        canActivate: [UserRouteAccessService],
        canDeactivate: [CanDeactivateGuard]
    },
];
