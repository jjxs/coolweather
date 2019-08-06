import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IRbacUserRightRelation } from 'app/shared/model/rbac-user-right-relation.model';

type EntityResponseType = HttpResponse<IRbacUserRightRelation>;
type EntityArrayResponseType = HttpResponse<IRbacUserRightRelation[]>;

@Injectable({ providedIn: 'root' })
export class RbacUserRightRelationService {
    public resourceUrl = SERVER_API_URL + 'api/rbac-user-right-relations';

    constructor(private http: HttpClient) {}

    create(rbacUserRightRelation: IRbacUserRightRelation): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(rbacUserRightRelation);
        return this.http
            .post<IRbacUserRightRelation>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(rbacUserRightRelation: IRbacUserRightRelation): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(rbacUserRightRelation);
        return this.http
            .put<IRbacUserRightRelation>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<IRbacUserRightRelation>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IRbacUserRightRelation[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    protected convertDateFromClient(rbacUserRightRelation: IRbacUserRightRelation): IRbacUserRightRelation {
        const copy: IRbacUserRightRelation = Object.assign({}, rbacUserRightRelation, {
            insDateTime:
                rbacUserRightRelation.insDateTime != null && rbacUserRightRelation.insDateTime.isValid()
                    ? rbacUserRightRelation.insDateTime.toJSON()
                    : null,
            updDateTime:
                rbacUserRightRelation.updDateTime != null && rbacUserRightRelation.updDateTime.isValid()
                    ? rbacUserRightRelation.updDateTime.toJSON()
                    : null,
            delDateTime:
                rbacUserRightRelation.delDateTime != null && rbacUserRightRelation.delDateTime.isValid()
                    ? rbacUserRightRelation.delDateTime.toJSON()
                    : null,
            triggerDateTime:
                rbacUserRightRelation.triggerDateTime != null && rbacUserRightRelation.triggerDateTime.isValid()
                    ? rbacUserRightRelation.triggerDateTime.toJSON()
                    : null
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
            res.body.forEach((rbacUserRightRelation: IRbacUserRightRelation) => {
                rbacUserRightRelation.insDateTime =
                    rbacUserRightRelation.insDateTime != null ? moment(rbacUserRightRelation.insDateTime) : null;
                rbacUserRightRelation.updDateTime =
                    rbacUserRightRelation.updDateTime != null ? moment(rbacUserRightRelation.updDateTime) : null;
                rbacUserRightRelation.delDateTime =
                    rbacUserRightRelation.delDateTime != null ? moment(rbacUserRightRelation.delDateTime) : null;
                rbacUserRightRelation.triggerDateTime =
                    rbacUserRightRelation.triggerDateTime != null ? moment(rbacUserRightRelation.triggerDateTime) : null;
            });
        }
        return res;
    }
}
