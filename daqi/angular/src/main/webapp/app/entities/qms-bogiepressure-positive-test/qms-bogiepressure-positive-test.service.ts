import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IQmsBogiepressurePositiveTest } from 'app/shared/model/qms-bogiepressure-positive-test.model';

type EntityResponseType = HttpResponse<IQmsBogiepressurePositiveTest>;
type EntityArrayResponseType = HttpResponse<IQmsBogiepressurePositiveTest[]>;

@Injectable({ providedIn: 'root' })
export class QmsBogiepressurePositiveTestService {
    public resourceUrl = SERVER_API_URL + 'api/qms-bogiepressure-positive-tests';

    constructor(private http: HttpClient) {}

    create(qmsBogiepressurePositiveTest: IQmsBogiepressurePositiveTest): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(qmsBogiepressurePositiveTest);
        return this.http
            .post<IQmsBogiepressurePositiveTest>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(qmsBogiepressurePositiveTest: IQmsBogiepressurePositiveTest): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(qmsBogiepressurePositiveTest);
        return this.http
            .put<IQmsBogiepressurePositiveTest>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<IQmsBogiepressurePositiveTest>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IQmsBogiepressurePositiveTest[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    protected convertDateFromClient(qmsBogiepressurePositiveTest: IQmsBogiepressurePositiveTest): IQmsBogiepressurePositiveTest {
        const copy: IQmsBogiepressurePositiveTest = Object.assign({}, qmsBogiepressurePositiveTest, {
            makeTime:
                qmsBogiepressurePositiveTest.makeTime != null && qmsBogiepressurePositiveTest.makeTime.isValid()
                    ? qmsBogiepressurePositiveTest.makeTime.toJSON()
                    : null,
            modifyTime:
                qmsBogiepressurePositiveTest.modifyTime != null && qmsBogiepressurePositiveTest.modifyTime.isValid()
                    ? qmsBogiepressurePositiveTest.modifyTime.toJSON()
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
            res.body.forEach((qmsBogiepressurePositiveTest: IQmsBogiepressurePositiveTest) => {
                qmsBogiepressurePositiveTest.makeTime =
                    qmsBogiepressurePositiveTest.makeTime != null ? moment(qmsBogiepressurePositiveTest.makeTime) : null;
                qmsBogiepressurePositiveTest.modifyTime =
                    qmsBogiepressurePositiveTest.modifyTime != null ? moment(qmsBogiepressurePositiveTest.modifyTime) : null;
            });
        }
        return res;
    }
}
