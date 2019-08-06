import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IQmsEnclosure } from 'app/shared/model/qms-enclosure.model';

type EntityResponseType = HttpResponse<IQmsEnclosure>;
type EntityArrayResponseType = HttpResponse<IQmsEnclosure[]>;

@Injectable({ providedIn: 'root' })
export class QmsEnclosureService {
    public resourceUrl = SERVER_API_URL + 'api/qms-enclosures';

    constructor(private http: HttpClient) {}

    create(qmsEnclosure: IQmsEnclosure): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(qmsEnclosure);
        return this.http
            .post<IQmsEnclosure>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(qmsEnclosure: IQmsEnclosure): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(qmsEnclosure);
        return this.http
            .put<IQmsEnclosure>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<IQmsEnclosure>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IQmsEnclosure[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    protected convertDateFromClient(qmsEnclosure: IQmsEnclosure): IQmsEnclosure {
        const copy: IQmsEnclosure = Object.assign({}, qmsEnclosure, {
            makeTime: qmsEnclosure.makeTime != null && qmsEnclosure.makeTime.isValid() ? qmsEnclosure.makeTime.toJSON() : null,
            modifyTime: qmsEnclosure.modifyTime != null && qmsEnclosure.modifyTime.isValid() ? qmsEnclosure.modifyTime.toJSON() : null
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
            res.body.forEach((qmsEnclosure: IQmsEnclosure) => {
                qmsEnclosure.makeTime = qmsEnclosure.makeTime != null ? moment(qmsEnclosure.makeTime) : null;
                qmsEnclosure.modifyTime = qmsEnclosure.modifyTime != null ? moment(qmsEnclosure.modifyTime) : null;
            });
        }
        return res;
    }
}
