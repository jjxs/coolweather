import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { QmsOrganizationInfo } from 'app/shared/model/qms-organization-info.model';
import { OrganizationInfoService } from './organizationalInformation.service';
import { OrganizationalInformationComponent } from './organizationalInformation.component';
import { IQmsOrganizationInfo } from 'app/shared/model/qms-organization-info.model';

@Injectable({ providedIn: 'root' })
export class QmsOrganizationInfoResolve implements Resolve<IQmsOrganizationInfo> {
    constructor(private service: OrganizationInfoService) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<QmsOrganizationInfo> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<QmsOrganizationInfo>) => response.ok),
                map((qmsOrganizationInfo: HttpResponse<QmsOrganizationInfo>) => qmsOrganizationInfo.body)
            );
        }
        return of(new QmsOrganizationInfo());
    }
}

export const OrganizationalInformationRoute: Routes = [
    {
        path: '',
        component: OrganizationalInformationComponent,
        data: {
            authorities: [],
            pageTitle: 'fccApp.qmsOrganizationInfo.home.title'
        }
    }
];
