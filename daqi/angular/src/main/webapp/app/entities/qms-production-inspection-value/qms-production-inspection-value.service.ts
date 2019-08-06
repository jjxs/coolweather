import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IQmsProductionInspectionValue } from 'app/shared/model/qms-production-inspection-value.model';

type EntityResponseType = HttpResponse<IQmsProductionInspectionValue>;
type EntityArrayResponseType = HttpResponse<IQmsProductionInspectionValue[]>;

@Injectable({ providedIn: 'root' })
export class QmsProductionInspectionValueService {
    public resourceUrl = SERVER_API_URL + 'api/qms-production-inspection-values';

    constructor(private http: HttpClient) {}

    create(qmsProductionInspectionValue: IQmsProductionInspectionValue): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(qmsProductionInspectionValue);
        return this.http
            .post<IQmsProductionInspectionValue>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(qmsProductionInspectionValue: IQmsProductionInspectionValue): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(qmsProductionInspectionValue);
        return this.http
            .put<IQmsProductionInspectionValue>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<IQmsProductionInspectionValue>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IQmsProductionInspectionValue[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    protected convertDateFromClient(qmsProductionInspectionValue: IQmsProductionInspectionValue): IQmsProductionInspectionValue {
        const copy: IQmsProductionInspectionValue = Object.assign({}, qmsProductionInspectionValue, {
            makeTime:
                qmsProductionInspectionValue.makeTime != null && qmsProductionInspectionValue.makeTime.isValid()
                    ? qmsProductionInspectionValue.makeTime.toJSON()
                    : null,
            modifyTime:
                qmsProductionInspectionValue.modifyTime != null && qmsProductionInspectionValue.modifyTime.isValid()
                    ? qmsProductionInspectionValue.modifyTime.toJSON()
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
            res.body.forEach((qmsProductionInspectionValue: IQmsProductionInspectionValue) => {
                qmsProductionInspectionValue.makeTime =
                    qmsProductionInspectionValue.makeTime != null ? moment(qmsProductionInspectionValue.makeTime) : null;
                qmsProductionInspectionValue.modifyTime =
                    qmsProductionInspectionValue.modifyTime != null ? moment(qmsProductionInspectionValue.modifyTime) : null;
            });
        }
        return res;
    }
}
