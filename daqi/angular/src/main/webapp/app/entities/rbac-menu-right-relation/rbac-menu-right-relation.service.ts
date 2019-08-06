import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IRbacMenuRightRelation } from 'app/shared/model/rbac-menu-right-relation.model';

type EntityResponseType = HttpResponse<IRbacMenuRightRelation>;
type EntityArrayResponseType = HttpResponse<IRbacMenuRightRelation[]>;

@Injectable({ providedIn: 'root' })
export class RbacMenuRightRelationService {
    public resourceUrl = SERVER_API_URL + 'api/rbac-menu-right-relations';

    constructor(private http: HttpClient) {}

    create(rbacMenuRightRelation: IRbacMenuRightRelation): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(rbacMenuRightRelation);
        return this.http
            .post<IRbacMenuRightRelation>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(rbacMenuRightRelation: IRbacMenuRightRelation): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(rbacMenuRightRelation);
        return this.http
            .put<IRbacMenuRightRelation>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<IRbacMenuRightRelation>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IRbacMenuRightRelation[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
    //获取权限组
    findRightMenu(id: number): Observable<any> {
        return this.http.get<any>(`${this.resourceUrl + '/RightMenuInfo'}/${id}`, { observe: 'response' }) 
    }

    protected convertDateFromClient(rbacMenuRightRelation: IRbacMenuRightRelation): IRbacMenuRightRelation {
        const copy: IRbacMenuRightRelation = Object.assign({}, rbacMenuRightRelation, {
            insDateTime:
                rbacMenuRightRelation.insDateTime != null && rbacMenuRightRelation.insDateTime.isValid()
                    ? rbacMenuRightRelation.insDateTime.toJSON()
                    : null,
            updDateTime:
                rbacMenuRightRelation.updDateTime != null && rbacMenuRightRelation.updDateTime.isValid()
                    ? rbacMenuRightRelation.updDateTime.toJSON()
                    : null,
            delDateTime:
                rbacMenuRightRelation.delDateTime != null && rbacMenuRightRelation.delDateTime.isValid()
                    ? rbacMenuRightRelation.delDateTime.toJSON()
                    : null,
            triggerDateTime:
                rbacMenuRightRelation.triggerDateTime != null && rbacMenuRightRelation.triggerDateTime.isValid()
                    ? rbacMenuRightRelation.triggerDateTime.toJSON()
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
            res.body.forEach((rbacMenuRightRelation: IRbacMenuRightRelation) => {
                rbacMenuRightRelation.insDateTime =
                    rbacMenuRightRelation.insDateTime != null ? moment(rbacMenuRightRelation.insDateTime) : null;
                rbacMenuRightRelation.updDateTime =
                    rbacMenuRightRelation.updDateTime != null ? moment(rbacMenuRightRelation.updDateTime) : null;
                rbacMenuRightRelation.delDateTime =
                    rbacMenuRightRelation.delDateTime != null ? moment(rbacMenuRightRelation.delDateTime) : null;
                rbacMenuRightRelation.triggerDateTime =
                    rbacMenuRightRelation.triggerDateTime != null ? moment(rbacMenuRightRelation.triggerDateTime) : null;
            });
        }
        return res;
    }
}
