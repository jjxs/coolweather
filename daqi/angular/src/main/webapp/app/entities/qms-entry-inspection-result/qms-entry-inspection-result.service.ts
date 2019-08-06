import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IQmsEntryInspectionResult } from 'app/shared/model/qms-entry-inspection-result.model';

type EntityResponseType = HttpResponse<IQmsEntryInspectionResult>;
type EntityArrayResponseType = HttpResponse<IQmsEntryInspectionResult[]>;

@Injectable({ providedIn: 'root' })
export class QmsEntryInspectionResultService {
    public resourceUrl = SERVER_API_URL + 'api/qms-entry-inspection-results';

    constructor(private http: HttpClient) {}

    create(qmsEntryInspectionResult: IQmsEntryInspectionResult): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(qmsEntryInspectionResult);
        return this.http
            .post<IQmsEntryInspectionResult>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(qmsEntryInspectionResult: IQmsEntryInspectionResult): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(qmsEntryInspectionResult);
        return this.http
            .put<IQmsEntryInspectionResult>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<IQmsEntryInspectionResult>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IQmsEntryInspectionResult[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    protected convertDateFromClient(qmsEntryInspectionResult: IQmsEntryInspectionResult): IQmsEntryInspectionResult {
        const copy: IQmsEntryInspectionResult = Object.assign({}, qmsEntryInspectionResult, {
            makeTime:
                qmsEntryInspectionResult.makeTime != null && qmsEntryInspectionResult.makeTime.isValid()
                    ? qmsEntryInspectionResult.makeTime.toJSON()
                    : null,
            modifyTime:
                qmsEntryInspectionResult.modifyTime != null && qmsEntryInspectionResult.modifyTime.isValid()
                    ? qmsEntryInspectionResult.modifyTime.toJSON()
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
            res.body.forEach((qmsEntryInspectionResult: IQmsEntryInspectionResult) => {
                qmsEntryInspectionResult.makeTime =
                    qmsEntryInspectionResult.makeTime != null ? moment(qmsEntryInspectionResult.makeTime) : null;
                qmsEntryInspectionResult.modifyTime =
                    qmsEntryInspectionResult.modifyTime != null ? moment(qmsEntryInspectionResult.modifyTime) : null;
            });
        }
        return res;
    }
}
