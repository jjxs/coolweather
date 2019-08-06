import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IQmsVehicleTypeClass } from 'app/shared/model/qms-vehicle-type-class.model';

type EntityResponseType = HttpResponse<IQmsVehicleTypeClass>;
type EntityArrayResponseType = HttpResponse<IQmsVehicleTypeClass[]>;

@Injectable({ providedIn: 'root' })
export class QmsVehicleTypeClassService {
    public resourceUrl = SERVER_API_URL + 'api/qms-vehicle-type-classes';

    constructor(private http: HttpClient) {}

    create(qmsVehicleTypeClass: IQmsVehicleTypeClass): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(qmsVehicleTypeClass);
        return this.http
            .post<IQmsVehicleTypeClass>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(qmsVehicleTypeClass: IQmsVehicleTypeClass): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(qmsVehicleTypeClass);
        return this.http
            .put<IQmsVehicleTypeClass>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<IQmsVehicleTypeClass>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IQmsVehicleTypeClass[]>(this.resourceUrl + '/index', { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    /**
     * 删除check
     * 
     */
    deleteCheck(req?: any): Observable<any> {
        // return this.http.get(this.resourceUrl + '/deleteCheck', rbacRole , { observe: 'response' });
        const options = createRequestOption(req);
        return this.http
            .get<IQmsVehicleTypeClass[]>(this.resourceUrl+'/deleteCheck', { params: options, observe: 'response' })
    }


    /**
     * 重复主键Check
     * 
     */
    sameCheck(req?: any): Observable<any> {
        const options = createRequestOption(req);
        return this.http
            .get<IQmsVehicleTypeClass[]>(this.resourceUrl+'/sameCheck', { params: options, observe: 'response' })
    }

    protected convertDateFromClient(qmsVehicleTypeClass: IQmsVehicleTypeClass): IQmsVehicleTypeClass {
        const copy: IQmsVehicleTypeClass = Object.assign({}, qmsVehicleTypeClass, {
            makeTime:
                qmsVehicleTypeClass.makeTime != null && qmsVehicleTypeClass.makeTime.isValid()
                    ? qmsVehicleTypeClass.makeTime.toJSON()
                    : null,
            modifyTime:
                qmsVehicleTypeClass.modifyTime != null && qmsVehicleTypeClass.modifyTime.isValid()
                    ? qmsVehicleTypeClass.modifyTime.toJSON()
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
            res.body.forEach((qmsVehicleTypeClass: IQmsVehicleTypeClass) => {
                qmsVehicleTypeClass.makeTime = qmsVehicleTypeClass.makeTime != null ? moment(qmsVehicleTypeClass.makeTime) : null;
                qmsVehicleTypeClass.modifyTime = qmsVehicleTypeClass.modifyTime != null ? moment(qmsVehicleTypeClass.modifyTime) : null;
            });
        }
        return res;
    }
}
