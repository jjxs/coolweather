import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IRbacRole } from 'app/shared/model/rbac-role.model';
import { IRbacRoleRightRelation } from 'app/shared/model/rbac-role-right-relation.model';

type EntityResponseType = HttpResponse<IRbacRole>;
type EntityArrayResponseType = HttpResponse<IRbacRole[]>;

@Injectable({ providedIn: 'root' })
export class RbacRoleService {
    public resourceUrl = SERVER_API_URL + 'api/rbac-roles';

    constructor(private http: HttpClient) {}

    create(rbacRole: IRbacRole): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(rbacRole);
        return this.http
            .post<IRbacRole>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(rbacRole: IRbacRole): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(rbacRole);
        return this.http
            .put<IRbacRole>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<IRbacRole>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IRbacRole[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

     /**
     * 获取管理员角色
     *
     * @returns 管理员角色信息
     */
    getRoleInfo(req?: any): Observable<EntityArrayResponseType>{
        const options = createRequestOption(req);
        return this.http
            .get<IRbacRole[]>(this.resourceUrl + '/getRoleInfo', { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
       
    }
    /**
     * @returns 新增角色
     */
    createRole(selectListVal: any, rbacRole: any): Observable<any> {
        return this.http.post(this.resourceUrl + '/createRole?selectListVal='+ selectListVal, 
            rbacRole
        , { observe: 'response' });
    }

    /**
     * @returns 编辑角色
     */
    updateRole(selectListVal: any, rbacRole: any): Observable<any> {
        return this.http.post(this.resourceUrl + '/updateRole?selectListVal='+ selectListVal, 
            rbacRole
        , { observe: 'response' });
    }
    // 权限列表
    getRightList(): Observable<any> {
        return this.http.get(this.resourceUrl + '/getRightList');
    }

    protected convertDateFromClient(rbacRole: IRbacRole): IRbacRole {
        const copy: IRbacRole = Object.assign({}, rbacRole, {
            insDateTime: rbacRole.insDateTime != null && rbacRole.insDateTime.isValid() ? rbacRole.insDateTime.toJSON() : null,
            updDateTime: rbacRole.updDateTime != null && rbacRole.updDateTime.isValid() ? rbacRole.updDateTime.toJSON() : null,
            delDateTime: rbacRole.delDateTime != null && rbacRole.delDateTime.isValid() ? rbacRole.delDateTime.toJSON() : null,
            triggerDateTime:
                rbacRole.triggerDateTime != null && rbacRole.triggerDateTime.isValid() ? rbacRole.triggerDateTime.toJSON() : null
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
            res.body.forEach((rbacRole: IRbacRole) => {
                rbacRole.insDateTime = rbacRole.insDateTime != null ? moment(rbacRole.insDateTime) : null;
                rbacRole.updDateTime = rbacRole.updDateTime != null ? moment(rbacRole.updDateTime) : null;
                rbacRole.delDateTime = rbacRole.delDateTime != null ? moment(rbacRole.delDateTime) : null;
                rbacRole.triggerDateTime = rbacRole.triggerDateTime != null ? moment(rbacRole.triggerDateTime) : null;
            });
        }
        return res;
    }
}
