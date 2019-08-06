import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IQmsBreathingSafetyTest } from 'app/shared/model/qms-breathing-safety-test.model';

type EntityResponseType = HttpResponse<IQmsBreathingSafetyTest>;
type EntityArrayResponseType = HttpResponse<IQmsBreathingSafetyTest[]>;

@Injectable({ providedIn: 'root' })
export class QmsBreathingSafetyTestService {
    public resourceUrl = SERVER_API_URL + 'api/qms-breathing-safety-tests';

    constructor(private http: HttpClient) {}

    create(qmsBreathingSafetyTest: IQmsBreathingSafetyTest): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(qmsBreathingSafetyTest);
        return this.http
            .post<IQmsBreathingSafetyTest>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(qmsBreathingSafetyTest: IQmsBreathingSafetyTest): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(qmsBreathingSafetyTest);
        return this.http
            .put<IQmsBreathingSafetyTest>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<IQmsBreathingSafetyTest>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IQmsBreathingSafetyTest[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    protected convertDateFromClient(qmsBreathingSafetyTest: IQmsBreathingSafetyTest): IQmsBreathingSafetyTest {
        const copy: IQmsBreathingSafetyTest = Object.assign({}, qmsBreathingSafetyTest, {
            makeTime:
                qmsBreathingSafetyTest.makeTime != null && qmsBreathingSafetyTest.makeTime.isValid()
                    ? qmsBreathingSafetyTest.makeTime.toJSON()
                    : null,
            modifyTime:
                qmsBreathingSafetyTest.modifyTime != null && qmsBreathingSafetyTest.modifyTime.isValid()
                    ? qmsBreathingSafetyTest.modifyTime.toJSON()
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
            res.body.forEach((qmsBreathingSafetyTest: IQmsBreathingSafetyTest) => {
                qmsBreathingSafetyTest.makeTime = qmsBreathingSafetyTest.makeTime != null ? moment(qmsBreathingSafetyTest.makeTime) : null;
                qmsBreathingSafetyTest.modifyTime =
                    qmsBreathingSafetyTest.modifyTime != null ? moment(qmsBreathingSafetyTest.modifyTime) : null;
            });
        }
        return res;
    }
}
