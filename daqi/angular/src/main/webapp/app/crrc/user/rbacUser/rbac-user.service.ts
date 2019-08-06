import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IRbacUser } from 'app/shared/model/rbac-user.model';

type EntityResponseType = HttpResponse<IRbacUser>;
type EntityArrayResponseType = HttpResponse<IRbacUser[]>;

@Injectable({ providedIn: 'root' })
export class RbacUserService {
    public resourceUrl = SERVER_API_URL + 'api/rbac-users';
    private resourceUrldelete = SERVER_API_URL + 'api/usersdelete';

    constructor(private http: HttpClient) {}

    create(rbacUser: IRbacUser): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(rbacUser);
        return this.http
            .post<IRbacUser>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(rbacUser: IRbacUser): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(rbacUser);
        return this.http
            .put<IRbacUser>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<IRbacUser>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IRbacUser[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    //组织表
    getorzList(params?: any): Observable<any> {
        return this.http.get(SERVER_API_URL + 'api/rbac-users/orzList', {params})
    }

    //获取角色
    findUserRole(id: number): Observable<any> {
        return this.http.get<any>(`${this.resourceUrl + '/UserRoleInfo'}/${id}`, { observe: 'response' }) 
    }

    // 角色下拉列表
    getRoleList(): Observable<any> {
        return this.http.get(this.resourceUrl + '/getRoleList');
    }

    /**
     * 重复主键Check
     * 
     * @param supplierCd
     * 
     */
    sameCheck(req?: any): Observable<any> {
        const options = createRequestOption(req);
        return this.http
            .get<IRbacUser[]>(this.resourceUrl+'/sameCheck', { params: options, observe: 'response' })
    }

    protected convertDateFromClient(rbacUser: IRbacUser): IRbacUser {
        const copy: IRbacUser = Object.assign({}, rbacUser, {
            userLastLoginTime:
                rbacUser.userLastLoginTime != null && rbacUser.userLastLoginTime.isValid() ? rbacUser.userLastLoginTime.toJSON() : null,
            insDateTime: rbacUser.insDateTime != null && rbacUser.insDateTime.isValid() ? rbacUser.insDateTime.toJSON() : null,
            updDateTime: rbacUser.updDateTime != null && rbacUser.updDateTime.isValid() ? rbacUser.updDateTime.toJSON() : null,
            delDateTime: rbacUser.delDateTime != null && rbacUser.delDateTime.isValid() ? rbacUser.delDateTime.toJSON() : null,
            triggerDateTime:
                rbacUser.triggerDateTime != null && rbacUser.triggerDateTime.isValid() ? rbacUser.triggerDateTime.toJSON() : null
        });
        return copy;
    }

     /**
     * Convert a Goods to a JSON which can be sent to the server.
     */
    private convert(rbacUser: IRbacUser): IRbacUser {
        const copy: IRbacUser = Object.assign({}, rbacUser);
        return copy;
    }
     /**
     * 员工一览
     *
     * @param id
     * @returns 员工信息
     */
    queryRbacUsers(req?: any): Observable<HttpResponse<IRbacUser[]>> {
        const options = createRequestOption(req);
        return this.http.get<IRbacUser[]>(this.resourceUrl + '/getRbacUsers', { params: options, observe: 'response' })
        .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

     /**
     * 创建员工
     */
    createUsers(selectListVal: any,rbacUser: IRbacUser): Observable<any> {
        const copy = this.convert(rbacUser);
        return this.http.post(this.resourceUrl + '/creatUsers?selectListVal='+ selectListVal, copy, { observe: 'response' })
        .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }
    /**
     * 编辑员工
     */
    updateUsers(selectListVal: any,rbacUser: IRbacUser): Observable<any> {
        const copy = this.convert(rbacUser);
        return this.http.post(this.resourceUrl + '/updateUsers?selectListVal='+ selectListVal , copy, { observe: 'response' })
        .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

     /**
     * 删除员工
     */
    deleteUsers(rbacUser: IRbacUser): Observable<EntityResponseType> {
        const copy = this.convert(rbacUser);
        return this.http.post<IRbacUser>(this.resourceUrl + '/updateUsers', copy, { observe: 'response' })
        .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
        if (res.body) {
            
        }
        return res;
    }

    protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        if (res.body) {
            res.body.forEach((rbacUser: IRbacUser) => {
                rbacUser.userLastLoginTime = rbacUser.userLastLoginTime != null ? moment(rbacUser.userLastLoginTime) : null;
                rbacUser.insDateTime = rbacUser.insDateTime != null ? moment(rbacUser.insDateTime) : null;
                rbacUser.updDateTime = rbacUser.updDateTime != null ? moment(rbacUser.updDateTime) : null;
                rbacUser.delDateTime = rbacUser.delDateTime != null ? moment(rbacUser.delDateTime) : null;
                rbacUser.triggerDateTime = rbacUser.triggerDateTime != null ? moment(rbacUser.triggerDateTime) : null;
            });
        }
        return res;
    }
}
