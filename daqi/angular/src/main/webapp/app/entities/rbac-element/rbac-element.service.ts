import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IRbacElement } from 'app/shared/model/rbac-element.model';

type EntityResponseType = HttpResponse<IRbacElement>;
type EntityArrayResponseType = HttpResponse<IRbacElement[]>;

@Injectable({ providedIn: 'root' })
export class RbacElementService {
    public resourceUrl = SERVER_API_URL + 'api/rbac-elements';

    constructor(private http: HttpClient) {}

    create(rbacElement: IRbacElement): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(rbacElement);
        return this.http
            .post<IRbacElement>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(rbacElement: IRbacElement): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(rbacElement);
        return this.http
            .put<IRbacElement>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<IRbacElement>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IRbacElement[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    protected convertDateFromClient(rbacElement: IRbacElement): IRbacElement {
        const copy: IRbacElement = Object.assign({}, rbacElement, {
            insDateTime: rbacElement.insDateTime != null && rbacElement.insDateTime.isValid() ? rbacElement.insDateTime.toJSON() : null,
            updDateTime: rbacElement.updDateTime != null && rbacElement.updDateTime.isValid() ? rbacElement.updDateTime.toJSON() : null,
            delDateTime: rbacElement.delDateTime != null && rbacElement.delDateTime.isValid() ? rbacElement.delDateTime.toJSON() : null,
            triggerDateTime:
                rbacElement.triggerDateTime != null && rbacElement.triggerDateTime.isValid() ? rbacElement.triggerDateTime.toJSON() : null
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
            res.body.forEach((rbacElement: IRbacElement) => {
                rbacElement.insDateTime = rbacElement.insDateTime != null ? moment(rbacElement.insDateTime) : null;
                rbacElement.updDateTime = rbacElement.updDateTime != null ? moment(rbacElement.updDateTime) : null;
                rbacElement.delDateTime = rbacElement.delDateTime != null ? moment(rbacElement.delDateTime) : null;
                rbacElement.triggerDateTime = rbacElement.triggerDateTime != null ? moment(rbacElement.triggerDateTime) : null;
            });
        }
        return res;
    }
}
