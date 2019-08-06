import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IPapiToken } from 'app/shared/model/papi-token.model';

type EntityResponseType = HttpResponse<IPapiToken>;
type EntityArrayResponseType = HttpResponse<IPapiToken[]>;

@Injectable({ providedIn: 'root' })
export class PapiTokenService {
    public resourceUrl = SERVER_API_URL + 'api/papi-tokens';

    constructor(private http: HttpClient) {}

    create(papiToken: IPapiToken): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(papiToken);
        return this.http
            .post<IPapiToken>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(papiToken: IPapiToken): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(papiToken);
        return this.http
            .put<IPapiToken>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<IPapiToken>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IPapiToken[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    protected convertDateFromClient(papiToken: IPapiToken): IPapiToken {
        const copy: IPapiToken = Object.assign({}, papiToken, {
            apiDate: papiToken.apiDate != null && papiToken.apiDate.isValid() ? papiToken.apiDate.toJSON() : null,
            insDateTime: papiToken.insDateTime != null && papiToken.insDateTime.isValid() ? papiToken.insDateTime.toJSON() : null,
            updDateTime: papiToken.updDateTime != null && papiToken.updDateTime.isValid() ? papiToken.updDateTime.toJSON() : null,
            delDateTime: papiToken.delDateTime != null && papiToken.delDateTime.isValid() ? papiToken.delDateTime.toJSON() : null,
            triggerDateTime:
                papiToken.triggerDateTime != null && papiToken.triggerDateTime.isValid() ? papiToken.triggerDateTime.toJSON() : null
        });
        return copy;
    }

    protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
        if (res.body) {
            res.body.apiDate = res.body.apiDate != null ? moment(res.body.apiDate) : null;
            res.body.insDateTime = res.body.insDateTime != null ? moment(res.body.insDateTime) : null;
            res.body.updDateTime = res.body.updDateTime != null ? moment(res.body.updDateTime) : null;
            res.body.delDateTime = res.body.delDateTime != null ? moment(res.body.delDateTime) : null;
            res.body.triggerDateTime = res.body.triggerDateTime != null ? moment(res.body.triggerDateTime) : null;
        }
        return res;
    }

    protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        if (res.body) {
            res.body.forEach((papiToken: IPapiToken) => {
                papiToken.apiDate = papiToken.apiDate != null ? moment(papiToken.apiDate) : null;
                papiToken.insDateTime = papiToken.insDateTime != null ? moment(papiToken.insDateTime) : null;
                papiToken.updDateTime = papiToken.updDateTime != null ? moment(papiToken.updDateTime) : null;
                papiToken.delDateTime = papiToken.delDateTime != null ? moment(papiToken.delDateTime) : null;
                papiToken.triggerDateTime = papiToken.triggerDateTime != null ? moment(papiToken.triggerDateTime) : null;
            });
        }
        return res;
    }
}
