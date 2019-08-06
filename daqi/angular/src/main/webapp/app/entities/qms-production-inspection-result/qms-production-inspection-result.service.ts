import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IQmsProductionInspectionResult } from 'app/shared/model/qms-production-inspection-result.model';

type EntityResponseType = HttpResponse<IQmsProductionInspectionResult>;
type EntityArrayResponseType = HttpResponse<IQmsProductionInspectionResult[]>;

@Injectable({ providedIn: 'root' })
export class QmsProductionInspectionResultService {
    public resourceUrl = SERVER_API_URL + 'api/qms-production-inspection-results';

    constructor(private http: HttpClient) {}

    create(qmsProductionInspectionResult: IQmsProductionInspectionResult): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(qmsProductionInspectionResult);
        return this.http
            .post<IQmsProductionInspectionResult>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(qmsProductionInspectionResult: IQmsProductionInspectionResult): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(qmsProductionInspectionResult);
        return this.http
            .put<IQmsProductionInspectionResult>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<IQmsProductionInspectionResult>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IQmsProductionInspectionResult[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    protected convertDateFromClient(qmsProductionInspectionResult: IQmsProductionInspectionResult): IQmsProductionInspectionResult {
        const copy: IQmsProductionInspectionResult = Object.assign({}, qmsProductionInspectionResult, {
            makeTime:
                qmsProductionInspectionResult.makeTime != null && qmsProductionInspectionResult.makeTime.isValid()
                    ? qmsProductionInspectionResult.makeTime.toJSON()
                    : null,
            modifyTime:
                qmsProductionInspectionResult.modifyTime != null && qmsProductionInspectionResult.modifyTime.isValid()
                    ? qmsProductionInspectionResult.modifyTime.toJSON()
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
            res.body.forEach((qmsProductionInspectionResult: IQmsProductionInspectionResult) => {
                qmsProductionInspectionResult.makeTime =
                    qmsProductionInspectionResult.makeTime != null ? moment(qmsProductionInspectionResult.makeTime) : null;
                qmsProductionInspectionResult.modifyTime =
                    qmsProductionInspectionResult.modifyTime != null ? moment(qmsProductionInspectionResult.modifyTime) : null;
            });
        }
        return res;
    }
}
