import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IQmsMicSwicthRegulattoTest } from 'app/shared/model/qms-mic-swicth-regulatto-test.model';

type EntityResponseType = HttpResponse<IQmsMicSwicthRegulattoTest>;
type EntityArrayResponseType = HttpResponse<IQmsMicSwicthRegulattoTest[]>;

@Injectable({ providedIn: 'root' })
export class QmsMicSwicthRegulattoTestService {
    public resourceUrl = SERVER_API_URL + 'api/qms-mic-swicth-regulatto-tests';

    constructor(private http: HttpClient) {}

    create(qmsMicSwicthRegulattoTest: IQmsMicSwicthRegulattoTest): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(qmsMicSwicthRegulattoTest);
        return this.http
            .post<IQmsMicSwicthRegulattoTest>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(qmsMicSwicthRegulattoTest: IQmsMicSwicthRegulattoTest): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(qmsMicSwicthRegulattoTest);
        return this.http
            .put<IQmsMicSwicthRegulattoTest>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<IQmsMicSwicthRegulattoTest>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IQmsMicSwicthRegulattoTest[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    protected convertDateFromClient(qmsMicSwicthRegulattoTest: IQmsMicSwicthRegulattoTest): IQmsMicSwicthRegulattoTest {
        const copy: IQmsMicSwicthRegulattoTest = Object.assign({}, qmsMicSwicthRegulattoTest, {
            makeTime:
                qmsMicSwicthRegulattoTest.makeTime != null && qmsMicSwicthRegulattoTest.makeTime.isValid()
                    ? qmsMicSwicthRegulattoTest.makeTime.toJSON()
                    : null,
            modifyTime:
                qmsMicSwicthRegulattoTest.modifyTime != null && qmsMicSwicthRegulattoTest.modifyTime.isValid()
                    ? qmsMicSwicthRegulattoTest.modifyTime.toJSON()
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
            res.body.forEach((qmsMicSwicthRegulattoTest: IQmsMicSwicthRegulattoTest) => {
                qmsMicSwicthRegulattoTest.makeTime =
                    qmsMicSwicthRegulattoTest.makeTime != null ? moment(qmsMicSwicthRegulattoTest.makeTime) : null;
                qmsMicSwicthRegulattoTest.modifyTime =
                    qmsMicSwicthRegulattoTest.modifyTime != null ? moment(qmsMicSwicthRegulattoTest.modifyTime) : null;
            });
        }
        return res;
    }
}
