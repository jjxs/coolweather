import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IQmsBom } from 'app/shared/model/qms-bom.model';

type EntityResponseType = HttpResponse<IQmsBom>;
type EntityArrayResponseType = HttpResponse<IQmsBom[]>;

@Injectable({ providedIn: 'root' })
export class QmsBomService {
    public resourceUrl = SERVER_API_URL + 'api/qms-boms';

    constructor(private http: HttpClient) {}

    create(qmsBom: IQmsBom): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(qmsBom);
        return this.http
            .post<IQmsBom>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(qmsBom: IQmsBom): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(qmsBom);
        return this.http
            .put<IQmsBom>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<IQmsBom>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IQmsBom[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    protected convertDateFromClient(qmsBom: IQmsBom): IQmsBom {
        const copy: IQmsBom = Object.assign({}, qmsBom, {
            makeTime: qmsBom.makeTime != null && qmsBom.makeTime.isValid() ? qmsBom.makeTime.toJSON() : null,
            modifyTime: qmsBom.modifyTime != null && qmsBom.modifyTime.isValid() ? qmsBom.modifyTime.toJSON() : null
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
            res.body.forEach((qmsBom: IQmsBom) => {
                qmsBom.makeTime = qmsBom.makeTime != null ? moment(qmsBom.makeTime) : null;
                qmsBom.modifyTime = qmsBom.modifyTime != null ? moment(qmsBom.modifyTime) : null;
            });
        }
        return res;
    }
}
