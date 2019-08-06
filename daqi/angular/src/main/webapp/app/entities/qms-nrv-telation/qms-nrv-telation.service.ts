import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IQmsNrvTelation } from 'app/shared/model/qms-nrv-telation.model';

type EntityResponseType = HttpResponse<IQmsNrvTelation>;
type EntityArrayResponseType = HttpResponse<IQmsNrvTelation[]>;

@Injectable({ providedIn: 'root' })
export class QmsNrvTelationService {
    public resourceUrl = SERVER_API_URL + 'api/qms-nrv-telations';

    constructor(private http: HttpClient) {}

    create(qmsNrvTelation: IQmsNrvTelation): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(qmsNrvTelation);
        return this.http
            .post<IQmsNrvTelation>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(qmsNrvTelation: IQmsNrvTelation): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(qmsNrvTelation);
        return this.http
            .put<IQmsNrvTelation>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<IQmsNrvTelation>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IQmsNrvTelation[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    queryBom(req?: any): Observable<any> {
        const options = createRequestOption(req);
        return this.http
            .get<any>(this.resourceUrl + '/bomList', { params: options, observe: 'response' });
    }

    protected convertDateFromClient(qmsNrvTelation: IQmsNrvTelation): IQmsNrvTelation {
        const copy: IQmsNrvTelation = Object.assign({}, qmsNrvTelation, {
            makeTime: qmsNrvTelation.makeTime != null && qmsNrvTelation.makeTime.isValid() ? qmsNrvTelation.makeTime.toJSON() : null,
            modifyTime: qmsNrvTelation.modifyTime != null && qmsNrvTelation.modifyTime.isValid() ? qmsNrvTelation.modifyTime.toJSON() : null
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
            res.body.forEach((qmsNrvTelation: IQmsNrvTelation) => {
                qmsNrvTelation.makeTime = qmsNrvTelation.makeTime != null ? moment(qmsNrvTelation.makeTime) : null;
                qmsNrvTelation.modifyTime = qmsNrvTelation.modifyTime != null ? moment(qmsNrvTelation.modifyTime) : null;
            });
        }
        return res;
    }
}
