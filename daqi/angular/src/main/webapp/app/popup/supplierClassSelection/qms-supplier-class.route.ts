import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { QmsSupplierClass } from 'app/shared/model/qms-supplier-class.model';
import { QmsSupplierClassService } from './qms-supplier-class.service';
import { QmsSupplierClassComponent } from './qms-supplier-class.component';
import { IQmsSupplierClass } from 'app/shared/model/qms-supplier-class.model';

@Injectable({ providedIn: 'root' })
export class QmsSupplierClassResolve implements Resolve<IQmsSupplierClass> {
    constructor(private service: QmsSupplierClassService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<QmsSupplierClass> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<QmsSupplierClass>) => response.ok),
                map((qmsSupplierClass: HttpResponse<QmsSupplierClass>) => qmsSupplierClass.body)
            );
        }
        return of(new QmsSupplierClass());
    }
}

export const supplierClassSelectionRoute: Routes = [
    {
        path: 'supplierClassSelection',
        component: QmsSupplierClassComponent,
        data: {
            authorities: [],
            pageTitle: '供应商分类信息'
        }
    }
];