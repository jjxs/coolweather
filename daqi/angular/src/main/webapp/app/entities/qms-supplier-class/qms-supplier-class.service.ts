import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IQmsSupplierClass } from 'app/shared/model/qms-supplier-class.model';

type EntityResponseType = HttpResponse<IQmsSupplierClass>;
type EntityArrayResponseType = HttpResponse<IQmsSupplierClass[]>;

@Injectable({ providedIn: 'root' })
export class QmsSupplierClassService {
    public resourceUrl = SERVER_API_URL + 'api/qms-supplier-classes';

    constructor(private http: HttpClient) {}

    create(qmsSupplierClass: IQmsSupplierClass): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(qmsSupplierClass);
        return this.http
            .post<IQmsSupplierClass>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(qmsSupplierClass: IQmsSupplierClass): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(qmsSupplierClass);
        return this.http
            .put<IQmsSupplierClass>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<IQmsSupplierClass>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IQmsSupplierClass[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    protected convertDateFromClient(qmsSupplierClass: IQmsSupplierClass): IQmsSupplierClass {
        const copy: IQmsSupplierClass = Object.assign({}, qmsSupplierClass, {
            makeTime: qmsSupplierClass.makeTime != null && qmsSupplierClass.makeTime.isValid() ? qmsSupplierClass.makeTime.toJSON() : null,
            modifyTime:
                qmsSupplierClass.modifyTime != null && qmsSupplierClass.modifyTime.isValid() ? qmsSupplierClass.modifyTime.toJSON() : null
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
            res.body.forEach((qmsSupplierClass: IQmsSupplierClass) => {
                qmsSupplierClass.makeTime = qmsSupplierClass.makeTime != null ? moment(qmsSupplierClass.makeTime) : null;
                qmsSupplierClass.modifyTime = qmsSupplierClass.modifyTime != null ? moment(qmsSupplierClass.modifyTime) : null;
            });
        }
        return res;
    }
}
