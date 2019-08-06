import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IQmsCarRecordbookMain } from 'app/shared/model/qms-car-recordbook-main.model';

type EntityResponseType = HttpResponse<IQmsCarRecordbookMain>;
type EntityArrayResponseType = HttpResponse<IQmsCarRecordbookMain[]>;

@Injectable({ providedIn: 'root' })
export class QmsCarRecordbookMainService {
    public resourceUrl = SERVER_API_URL + 'api/qms-car-recordbook-mains';

    constructor(private http: HttpClient) {}

    create(qmsCarRecordbookMain: IQmsCarRecordbookMain): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(qmsCarRecordbookMain);
        return this.http
            .post<IQmsCarRecordbookMain>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(qmsCarRecordbookMain: IQmsCarRecordbookMain): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(qmsCarRecordbookMain);
        return this.http
            .put<IQmsCarRecordbookMain>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<IQmsCarRecordbookMain>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IQmsCarRecordbookMain[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    protected convertDateFromClient(qmsCarRecordbookMain: IQmsCarRecordbookMain): IQmsCarRecordbookMain {
        const copy: IQmsCarRecordbookMain = Object.assign({}, qmsCarRecordbookMain, {
            makeTime:
                qmsCarRecordbookMain.makeTime != null && qmsCarRecordbookMain.makeTime.isValid()
                    ? qmsCarRecordbookMain.makeTime.toJSON()
                    : null,
            modifyTime:
                qmsCarRecordbookMain.modifyTime != null && qmsCarRecordbookMain.modifyTime.isValid()
                    ? qmsCarRecordbookMain.modifyTime.toJSON()
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
            res.body.forEach((qmsCarRecordbookMain: IQmsCarRecordbookMain) => {
                qmsCarRecordbookMain.makeTime = qmsCarRecordbookMain.makeTime != null ? moment(qmsCarRecordbookMain.makeTime) : null;
                qmsCarRecordbookMain.modifyTime = qmsCarRecordbookMain.modifyTime != null ? moment(qmsCarRecordbookMain.modifyTime) : null;
            });
        }
        return res;
    }
}
