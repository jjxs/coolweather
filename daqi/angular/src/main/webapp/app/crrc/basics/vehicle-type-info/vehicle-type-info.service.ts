import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IQmsVehicleTypeInfo } from 'app/shared/model/qms-vehicle-type-info.model';
import { IQmsVehicleTypeClass } from 'app/shared/model/qms-vehicle-type-class.model';
type EntityResponseTypeClass = HttpResponse<IQmsVehicleTypeClass>;
type EntityResponseType = HttpResponse<IQmsVehicleTypeInfo>;
type EntityArrayResponseType = HttpResponse<IQmsVehicleTypeInfo[]>;

@Injectable({ providedIn: 'root' })
export class VehicleTypeInfoService {
    public resourceUrl = SERVER_API_URL + 'api/qms-vehicle-type-infos';
    public resourceUrlClass = SERVER_API_URL + 'api/qms-vehicle-type-classes';
    constructor(private http: HttpClient) { }

    create(qmsVehicleTypeInfo: IQmsVehicleTypeInfo): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(qmsVehicleTypeInfo);
        return this.http
            .post<IQmsVehicleTypeInfo>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }
    createInfo(qmsVehicleTypeInfo: IQmsVehicleTypeInfo): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(qmsVehicleTypeInfo);
        return this.http
            .post<IQmsVehicleTypeInfo>(this.resourceUrl + '/createInfo', copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(qmsVehicleTypeInfo: IQmsVehicleTypeInfo): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(qmsVehicleTypeInfo);
        return this.http
            .put<IQmsVehicleTypeInfo>(this.resourceUrl + '/updateInfo', copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<IQmsVehicleTypeInfo>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IQmsVehicleTypeInfo[]>(this.resourceUrl + '/indexInfo', { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }
    /**
     * 车型分类信息
     * @param id 
     */
    findClass(id: number): Observable<EntityResponseTypeClass> {
        return this.http
            .get<IQmsVehicleTypeClass>(`${this.resourceUrlClass}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseTypeClass) => this.convertDateFromServer(res)));
    }
    /**
     * 
     * @param id 焦点离开车型分类信息
     */
    findCarType(id: any): Observable<EntityResponseTypeClass> {
        return this.http
            .get<IQmsVehicleTypeClass>(`${this.resourceUrlClass + '/detaile'}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseTypeClass) => this.convertDateFromServer(res)));
    }
    /**
     * 删除车型
     * 
     * @param selectListVal 
     * @param rbacRole 
     */
    updateCarType(rbacRole: any): Observable<any> {
        return this.http.post(this.resourceUrl + '/deleteInfo', rbacRole, { observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl + '/deleteInfo'}/${id}`, { observe: 'response' });
    }

    queryVehicleTypeInfo(req?: any): Observable<any> {
        const options = createRequestOption(req);
        return this.http
            .get<any[]>(SERVER_API_URL + 'api/qms-vehicle-type-info/search', { params: options, observe: 'response' });
    }

    protected convertDateFromClient(qmsVehicleTypeInfo: IQmsVehicleTypeInfo): IQmsVehicleTypeInfo {
        const copy: IQmsVehicleTypeInfo = Object.assign({}, qmsVehicleTypeInfo, {
            makeTime:
                qmsVehicleTypeInfo.makeTime != null && qmsVehicleTypeInfo.makeTime.isValid() ? qmsVehicleTypeInfo.makeTime.toJSON() : null,
            modifyTime:
                qmsVehicleTypeInfo.modifyTime != null && qmsVehicleTypeInfo.modifyTime.isValid()
                    ? qmsVehicleTypeInfo.modifyTime.toJSON()
                    : null
        });
        return copy;
    }

    protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
        if (res.body) {
            res.body.makeTime = res.body.makeTime != null ? moment(res.body.makeTime) : null;
            res.body.modifyTime = res.body.modifyTime != null ? moment(res.body.modifyTime) : null;
        }
        return res;
    }

    protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        if (res.body) {
            res.body.forEach((qmsVehicleTypeInfo: IQmsVehicleTypeInfo) => {
                qmsVehicleTypeInfo.makeTime = qmsVehicleTypeInfo.makeTime != null ? moment(qmsVehicleTypeInfo.makeTime) : null;
                qmsVehicleTypeInfo.modifyTime = qmsVehicleTypeInfo.modifyTime != null ? moment(qmsVehicleTypeInfo.modifyTime) : null;
            });
        }
        return res;
    }
}
