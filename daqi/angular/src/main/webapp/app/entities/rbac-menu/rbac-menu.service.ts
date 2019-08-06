import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IRbacMenu } from 'app/shared/model/rbac-menu.model';

type EntityResponseType = HttpResponse<IRbacMenu>;
type EntityArrayResponseType = HttpResponse<IRbacMenu[]>;

@Injectable({ providedIn: 'root' })
export class RbacMenuService {
    public resourceUrl = SERVER_API_URL + 'api/rbac-menus';

    constructor(private http: HttpClient) {}

    create(rbacMenu: IRbacMenu): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(rbacMenu);
        return this.http
            .post<IRbacMenu>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(rbacMenu: IRbacMenu): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(rbacMenu);
        return this.http
            .put<IRbacMenu>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<IRbacMenu>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IRbacMenu[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    protected convertDateFromClient(rbacMenu: IRbacMenu): IRbacMenu {
        const copy: IRbacMenu = Object.assign({}, rbacMenu, {
            insDateTime: rbacMenu.insDateTime != null && rbacMenu.insDateTime.isValid() ? rbacMenu.insDateTime.toJSON() : null,
            updDateTime: rbacMenu.updDateTime != null && rbacMenu.updDateTime.isValid() ? rbacMenu.updDateTime.toJSON() : null,
            delDateTime: rbacMenu.delDateTime != null && rbacMenu.delDateTime.isValid() ? rbacMenu.delDateTime.toJSON() : null,
            triggerDateTime:
                rbacMenu.triggerDateTime != null && rbacMenu.triggerDateTime.isValid() ? rbacMenu.triggerDateTime.toJSON() : null
        });
        return copy;
    }

    protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
        if (res.body) {
            res.body.insDateTime = res.body.insDateTime != null ? moment(res.body.insDateTime) : null;
            res.body.updDateTime = res.body.updDateTime != null ? moment(res.body.updDateTime) : null;
            res.body.delDateTime = res.body.delDateTime != null ? moment(res.body.delDateTime) : null;
            res.body.triggerDateTime = res.body.triggerDateTime != null ? moment(res.body.triggerDateTime) : null;
        }
        return res;
    }

    protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        if (res.body) {
            res.body.forEach((rbacMenu: IRbacMenu) => {
                rbacMenu.insDateTime = rbacMenu.insDateTime != null ? moment(rbacMenu.insDateTime) : null;
                rbacMenu.updDateTime = rbacMenu.updDateTime != null ? moment(rbacMenu.updDateTime) : null;
                rbacMenu.delDateTime = rbacMenu.delDateTime != null ? moment(rbacMenu.delDateTime) : null;
                rbacMenu.triggerDateTime = rbacMenu.triggerDateTime != null ? moment(rbacMenu.triggerDateTime) : null;
            });
        }
        return res;
    }
}
