import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IRbacRoleRightRelation } from 'app/shared/model/rbac-role-right-relation.model';

type EntityResponseType = HttpResponse<IRbacRoleRightRelation>;
type EntityArrayResponseType = HttpResponse<IRbacRoleRightRelation[]>;

@Injectable({ providedIn: 'root' })
export class RbacRoleRightRelationService {
    public resourceUrl = SERVER_API_URL + 'api/rbac-role-right-relations';

    constructor(private http: HttpClient) {}

    create(rbacRoleRightRelation: IRbacRoleRightRelation): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(rbacRoleRightRelation);
        return this.http
            .post<IRbacRoleRightRelation>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(rbacRoleRightRelation: IRbacRoleRightRelation): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(rbacRoleRightRelation);
        return this.http
            .put<IRbacRoleRightRelation>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<IRbacRoleRightRelation>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IRbacRoleRightRelation[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

     //获取权限
     findRoleRight(id: number): Observable<any> {
        return this.http.get<any>(`${this.resourceUrl + '/RoleRightInfo'}/${id}`, { observe: 'response' }) 
    }

    protected convertDateFromClient(rbacRoleRightRelation: IRbacRoleRightRelation): IRbacRoleRightRelation {
        const copy: IRbacRoleRightRelation = Object.assign({}, rbacRoleRightRelation, {
            insDateTime:
                rbacRoleRightRelation.insDateTime != null && rbacRoleRightRelation.insDateTime.isValid()
                    ? rbacRoleRightRelation.insDateTime.toJSON()
                    : null,
            updDateTime:
                rbacRoleRightRelation.updDateTime != null && rbacRoleRightRelation.updDateTime.isValid()
                    ? rbacRoleRightRelation.updDateTime.toJSON()
                    : null,
            delDateTime:
                rbacRoleRightRelation.delDateTime != null && rbacRoleRightRelation.delDateTime.isValid()
                    ? rbacRoleRightRelation.delDateTime.toJSON()
                    : null,
            triggerDateTime:
                rbacRoleRightRelation.triggerDateTime != null && rbacRoleRightRelation.triggerDateTime.isValid()
                    ? rbacRoleRightRelation.triggerDateTime.toJSON()
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
            res.body.forEach((rbacRoleRightRelation: IRbacRoleRightRelation) => {
                rbacRoleRightRelation.insDateTime =
                    rbacRoleRightRelation.insDateTime != null ? moment(rbacRoleRightRelation.insDateTime) : null;
                rbacRoleRightRelation.updDateTime =
                    rbacRoleRightRelation.updDateTime != null ? moment(rbacRoleRightRelation.updDateTime) : null;
                rbacRoleRightRelation.delDateTime =
                    rbacRoleRightRelation.delDateTime != null ? moment(rbacRoleRightRelation.delDateTime) : null;
                rbacRoleRightRelation.triggerDateTime =
                    rbacRoleRightRelation.triggerDateTime != null ? moment(rbacRoleRightRelation.triggerDateTime) : null;
            });
        }
        return res;
    }
}
