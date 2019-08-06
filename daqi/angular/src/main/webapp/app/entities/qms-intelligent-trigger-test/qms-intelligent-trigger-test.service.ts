import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IQmsIntelligentTriggerTest } from 'app/shared/model/qms-intelligent-trigger-test.model';

type EntityResponseType = HttpResponse<IQmsIntelligentTriggerTest>;
type EntityArrayResponseType = HttpResponse<IQmsIntelligentTriggerTest[]>;

@Injectable({ providedIn: 'root' })
export class QmsIntelligentTriggerTestService {
    public resourceUrl = SERVER_API_URL + 'api/qms-intelligent-trigger-tests';

    constructor(private http: HttpClient) {}

    create(qmsIntelligentTriggerTest: IQmsIntelligentTriggerTest): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(qmsIntelligentTriggerTest);
        return this.http
            .post<IQmsIntelligentTriggerTest>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(qmsIntelligentTriggerTest: IQmsIntelligentTriggerTest): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(qmsIntelligentTriggerTest);
        return this.http
            .put<IQmsIntelligentTriggerTest>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<IQmsIntelligentTriggerTest>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IQmsIntelligentTriggerTest[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    protected convertDateFromClient(qmsIntelligentTriggerTest: IQmsIntelligentTriggerTest): IQmsIntelligentTriggerTest {
        const copy: IQmsIntelligentTriggerTest = Object.assign({}, qmsIntelligentTriggerTest, {
            makeTime:
                qmsIntelligentTriggerTest.makeTime != null && qmsIntelligentTriggerTest.makeTime.isValid()
                    ? qmsIntelligentTriggerTest.makeTime.toJSON()
                    : null,
            modifyTime:
                qmsIntelligentTriggerTest.modifyTime != null && qmsIntelligentTriggerTest.modifyTime.isValid()
                    ? qmsIntelligentTriggerTest.modifyTime.toJSON()
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
            res.body.forEach((qmsIntelligentTriggerTest: IQmsIntelligentTriggerTest) => {
                qmsIntelligentTriggerTest.makeTime =
                    qmsIntelligentTriggerTest.makeTime != null ? moment(qmsIntelligentTriggerTest.makeTime) : null;
                qmsIntelligentTriggerTest.modifyTime =
                    qmsIntelligentTriggerTest.modifyTime != null ? moment(qmsIntelligentTriggerTest.modifyTime) : null;
            });
        }
        return res;
    }
}
