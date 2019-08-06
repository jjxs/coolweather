import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IQmsNotice } from 'app/shared/model/qms-notice.model';

type EntityResponseType = HttpResponse<IQmsNotice>;
type EntityArrayResponseType = HttpResponse<IQmsNotice[]>;

@Injectable({ providedIn: 'root' })
export class QmsNoticeService {
    public resourceUrl = SERVER_API_URL + 'api/qms-notices';

    constructor(private http: HttpClient) {}

    create(qmsNotice: IQmsNotice): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(qmsNotice);
        return this.http
            .post<IQmsNotice>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(qmsNotice: IQmsNotice): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(qmsNotice);
        return this.http
            .put<IQmsNotice>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<IQmsNotice>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IQmsNotice[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    protected convertDateFromClient(qmsNotice: IQmsNotice): IQmsNotice {
        const copy: IQmsNotice = Object.assign({}, qmsNotice, {
            makeTime: qmsNotice.makeTime != null && qmsNotice.makeTime.isValid() ? qmsNotice.makeTime.toJSON() : null,
            modifyTime: qmsNotice.modifyTime != null && qmsNotice.modifyTime.isValid() ? qmsNotice.modifyTime.toJSON() : null
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
            res.body.forEach((qmsNotice: IQmsNotice) => {
                qmsNotice.makeTime = qmsNotice.makeTime != null ? moment(qmsNotice.makeTime) : null;
                qmsNotice.modifyTime = qmsNotice.modifyTime != null ? moment(qmsNotice.modifyTime) : null;
            });
        }
        return res;
    }
}
