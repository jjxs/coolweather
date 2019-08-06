import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IQmsApproveResult } from 'app/shared/model/qms-approve-result.model';

type EntityResponseType = HttpResponse<IQmsApproveResult>;
type EntityArrayResponseType = HttpResponse<IQmsApproveResult[]>;

@Injectable({ providedIn: 'root' })
export class QmsApproveResultService {
    public resourceUrl = SERVER_API_URL + 'api/qms-approve-results';

    constructor(private http: HttpClient) {}

    create(qmsApproveResult: IQmsApproveResult): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(qmsApproveResult);
        return this.http
            .post<IQmsApproveResult>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(qmsApproveResult: IQmsApproveResult): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(qmsApproveResult);
        return this.http
            .put<IQmsApproveResult>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<IQmsApproveResult>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IQmsApproveResult[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    protected convertDateFromClient(qmsApproveResult: IQmsApproveResult): IQmsApproveResult {
        const copy: IQmsApproveResult = Object.assign({}, qmsApproveResult, {
            approveTime:
                qmsApproveResult.approveTime != null && qmsApproveResult.approveTime.isValid()
                    ? qmsApproveResult.approveTime.toJSON()
                    : null,
            makeTime: qmsApproveResult.makeTime != null && qmsApproveResult.makeTime.isValid() ? qmsApproveResult.makeTime.toJSON() : null,
            modifyTime:
                qmsApproveResult.modifyTime != null && qmsApproveResult.modifyTime.isValid() ? qmsApproveResult.modifyTime.toJSON() : null
        });
        return copy;
    }

    protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
        if (res.body) {
            res.body.approveTime = res.body.approveTime != null ? moment(res.body.approveTime) : null;
            res.body.makeTime = res.body.makeTime != null ? moment(res.body.makeTime) : null;
            res.body.modifyTime = res.body.modifyTime != null ? moment(res.body.modifyTime) : null;
        }
        return res;
    }

    protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        if (res.body) {
            res.body.forEach((qmsApproveResult: IQmsApproveResult) => {
                qmsApproveResult.approveTime = qmsApproveResult.approveTime != null ? moment(qmsApproveResult.approveTime) : null;
                qmsApproveResult.makeTime = qmsApproveResult.makeTime != null ? moment(qmsApproveResult.makeTime) : null;
                qmsApproveResult.modifyTime = qmsApproveResult.modifyTime != null ? moment(qmsApproveResult.modifyTime) : null;
            });
        }
        return res;
    }
}
