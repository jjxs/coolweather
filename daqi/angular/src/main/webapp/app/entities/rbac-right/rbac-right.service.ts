import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IRbacRight } from 'app/shared/model/rbac-right.model';
import { IRbacMenu } from 'app/shared/model/rbac-menu.model';
type EntityResponseType = HttpResponse<IRbacRight>;
type EntityArrayResponseType = HttpResponse<IRbacRight[]>;

@Injectable({ providedIn: 'root' })
export class RbacRightService {
    public resourceUrl = SERVER_API_URL + 'api/rbac-rights';
    public resourceUrls = SERVER_API_URL + 'api/rbac-menu';
    constructor(private http: HttpClient) {}

    create(rbacRight: IRbacRight): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(rbacRight);
        return this.http
            .post<IRbacRight>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(rbacRight: IRbacRight): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(rbacRight);
        return this.http
            .put<IRbacRight>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<IRbacRight>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IRbacRight[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    /**
     * 获取权限菜单
     *
     * @returns 权限信息
     */
    getRightInfo(req?: any) {
        return this.http.get(`${this.resourceUrl}/getMenuInfo/`);
    }

    /**
     * 获取权限一览
     *
     * @returns 菜单信息
     */
    getRightInfos(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IRbacRight[]>(this.resourceUrl + '/getRightInfo', { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }
    /**
     * @returns 新增权限
     */
    createRight(rbacRight: any, menuList: any): Observable<any> {
        return this.http.post(this.resourceUrl + '/createRight', {
            'rbacRight': rbacRight,
            'menuList': menuList
        }, { observe: 'response' });
    }

     /**
     * @returns 编辑权限
     */
    updateRight(rbacRight: any, menuList: any): Observable<any> {
        return this.http.post(this.resourceUrl + '/updateRight', {
            'rbacRight': rbacRight,
            'menuList': menuList
        }, { observe: 'response' });
    }

    protected convertDateFromClient(rbacRight: IRbacRight): IRbacRight {
        const copy: IRbacRight = Object.assign({}, rbacRight, {
            insDateTime: rbacRight.insDateTime != null && rbacRight.insDateTime.isValid() ? rbacRight.insDateTime.toJSON() : null,
            updDateTime: rbacRight.updDateTime != null && rbacRight.updDateTime.isValid() ? rbacRight.updDateTime.toJSON() : null,
            delDateTime: rbacRight.delDateTime != null && rbacRight.delDateTime.isValid() ? rbacRight.delDateTime.toJSON() : null,
            triggerDateTime:
                rbacRight.triggerDateTime != null && rbacRight.triggerDateTime.isValid() ? rbacRight.triggerDateTime.toJSON() : null
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
            res.body.forEach((rbacRight: IRbacRight) => {
                rbacRight.insDateTime = rbacRight.insDateTime != null ? moment(rbacRight.insDateTime) : null;
                rbacRight.updDateTime = rbacRight.updDateTime != null ? moment(rbacRight.updDateTime) : null;
                rbacRight.delDateTime = rbacRight.delDateTime != null ? moment(rbacRight.delDateTime) : null;
                rbacRight.triggerDateTime = rbacRight.triggerDateTime != null ? moment(rbacRight.triggerDateTime) : null;
            });
        }
        return res;
    }
}
