import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IQmsUnhealthy } from 'app/shared/model/qms-unhealthy.model';

type EntityResponseType = HttpResponse<IQmsUnhealthy>;
type EntityArrayResponseType = HttpResponse<IQmsUnhealthy[]>;

@Injectable({ providedIn: 'root' })
export class QmsUnhealthyService {
    public resourceUrl = SERVER_API_URL + 'api/qms-unhealthies';

    constructor(private http: HttpClient) {}

    create(qmsUnhealthy: IQmsUnhealthy): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(qmsUnhealthy);
        return this.http
            .post<IQmsUnhealthy>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(qmsUnhealthy: IQmsUnhealthy): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(qmsUnhealthy);
        return this.http
            .put<IQmsUnhealthy>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<IQmsUnhealthy>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IQmsUnhealthy[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    protected convertDateFromClient(qmsUnhealthy: IQmsUnhealthy): IQmsUnhealthy {
        const copy: IQmsUnhealthy = Object.assign({}, qmsUnhealthy, {
            makeTime: qmsUnhealthy.makeTime != null && qmsUnhealthy.makeTime.isValid() ? qmsUnhealthy.makeTime.toJSON() : null,
            modifyTime: qmsUnhealthy.modifyTime != null && qmsUnhealthy.modifyTime.isValid() ? qmsUnhealthy.modifyTime.toJSON() : null
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
            res.body.forEach((qmsUnhealthy: IQmsUnhealthy) => {
                qmsUnhealthy.makeTime = qmsUnhealthy.makeTime != null ? moment(qmsUnhealthy.makeTime) : null;
                qmsUnhealthy.modifyTime = qmsUnhealthy.modifyTime != null ? moment(qmsUnhealthy.modifyTime) : null;
            });
        }
        return res;
    }
}
