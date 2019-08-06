import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IQmsMaster } from 'app/shared/model/qms-master.model';

type EntityResponseType = HttpResponse<IQmsMaster>;
type EntityArrayResponseType = HttpResponse<IQmsMaster[]>;

@Injectable({ providedIn: 'root' })
export class QmsMasterService {
    public resourceUrl = SERVER_API_URL + 'api/qms-masters';

    constructor(private http: HttpClient) {}

    create(qmsMaster: IQmsMaster): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(qmsMaster);
        return this.http
            .post<IQmsMaster>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(qmsMaster: IQmsMaster): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(qmsMaster);
        return this.http
            .put<IQmsMaster>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<IQmsMaster>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IQmsMaster[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    protected convertDateFromClient(qmsMaster: IQmsMaster): IQmsMaster {
        const copy: IQmsMaster = Object.assign({}, qmsMaster, {
            makeTime: qmsMaster.makeTime != null && qmsMaster.makeTime.isValid() ? qmsMaster.makeTime.toJSON() : null,
            modifyTime: qmsMaster.modifyTime != null && qmsMaster.modifyTime.isValid() ? qmsMaster.modifyTime.toJSON() : null
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
            res.body.forEach((qmsMaster: IQmsMaster) => {
                qmsMaster.makeTime = qmsMaster.makeTime != null ? moment(qmsMaster.makeTime) : null;
                qmsMaster.modifyTime = qmsMaster.modifyTime != null ? moment(qmsMaster.modifyTime) : null;
            });
        }
        return res;
    }
}
