import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IQmsBogiepressureTonTest } from 'app/shared/model/qms-bogiepressure-ton-test.model';

type EntityResponseType = HttpResponse<IQmsBogiepressureTonTest>;
type EntityArrayResponseType = HttpResponse<IQmsBogiepressureTonTest[]>;

@Injectable({ providedIn: 'root' })
export class QmsBogiepressureTonTestService {
    public resourceUrl = SERVER_API_URL + 'api/qms-bogiepressure-ton-tests';

    constructor(private http: HttpClient) {}

    create(qmsBogiepressureTonTest: IQmsBogiepressureTonTest): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(qmsBogiepressureTonTest);
        return this.http
            .post<IQmsBogiepressureTonTest>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(qmsBogiepressureTonTest: IQmsBogiepressureTonTest): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(qmsBogiepressureTonTest);
        return this.http
            .put<IQmsBogiepressureTonTest>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<IQmsBogiepressureTonTest>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IQmsBogiepressureTonTest[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    protected convertDateFromClient(qmsBogiepressureTonTest: IQmsBogiepressureTonTest): IQmsBogiepressureTonTest {
        const copy: IQmsBogiepressureTonTest = Object.assign({}, qmsBogiepressureTonTest, {
            makeTime:
                qmsBogiepressureTonTest.makeTime != null && qmsBogiepressureTonTest.makeTime.isValid()
                    ? qmsBogiepressureTonTest.makeTime.toJSON()
                    : null,
            modifyTime:
                qmsBogiepressureTonTest.modifyTime != null && qmsBogiepressureTonTest.modifyTime.isValid()
                    ? qmsBogiepressureTonTest.modifyTime.toJSON()
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
            res.body.forEach((qmsBogiepressureTonTest: IQmsBogiepressureTonTest) => {
                qmsBogiepressureTonTest.makeTime =
                    qmsBogiepressureTonTest.makeTime != null ? moment(qmsBogiepressureTonTest.makeTime) : null;
                qmsBogiepressureTonTest.modifyTime =
                    qmsBogiepressureTonTest.modifyTime != null ? moment(qmsBogiepressureTonTest.modifyTime) : null;
            });
        }
        return res;
    }
}
