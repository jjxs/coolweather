import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IQmsEntryInspection } from 'app/shared/model/qms-entry-inspection.model';

type EntityResponseType = HttpResponse<IQmsEntryInspection>;
type EntityArrayResponseType = HttpResponse<IQmsEntryInspection[]>;

@Injectable({ providedIn: 'root' })
export class QmsEntryInspectionService {
    public resourceUrl = SERVER_API_URL + 'api/qms-entry-inspections';

    constructor(private http: HttpClient) {}

    create(qmsEntryInspection: IQmsEntryInspection): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(qmsEntryInspection);
        return this.http
            .post<IQmsEntryInspection>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(qmsEntryInspection: IQmsEntryInspection): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(qmsEntryInspection);
        return this.http
            .put<IQmsEntryInspection>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<IQmsEntryInspection>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IQmsEntryInspection[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    protected convertDateFromClient(qmsEntryInspection: IQmsEntryInspection): IQmsEntryInspection {
        const copy: IQmsEntryInspection = Object.assign({}, qmsEntryInspection, {
            checkDate:
                qmsEntryInspection.checkDate != null && qmsEntryInspection.checkDate.isValid()
                    ? qmsEntryInspection.checkDate.toJSON()
                    : null,
            makeTime:
                qmsEntryInspection.makeTime != null && qmsEntryInspection.makeTime.isValid() ? qmsEntryInspection.makeTime.toJSON() : null,
            modifyTime:
                qmsEntryInspection.modifyTime != null && qmsEntryInspection.modifyTime.isValid()
                    ? qmsEntryInspection.modifyTime.toJSON()
                    : null
        });
        return copy;
    }

    protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
        if (res.body) {
            res.body.checkDate = res.body.checkDate != null ? moment(res.body.checkDate) : null;
            res.body.makeTime = res.body.makeTime != null ? moment(res.body.makeTime) : null;
            res.body.modifyTime = res.body.modifyTime != null ? moment(res.body.modifyTime) : null;
        }
        return res;
    }

    protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        if (res.body) {
            res.body.forEach((qmsEntryInspection: IQmsEntryInspection) => {
                qmsEntryInspection.checkDate = qmsEntryInspection.checkDate != null ? moment(qmsEntryInspection.checkDate) : null;
                qmsEntryInspection.makeTime = qmsEntryInspection.makeTime != null ? moment(qmsEntryInspection.makeTime) : null;
                qmsEntryInspection.modifyTime = qmsEntryInspection.modifyTime != null ? moment(qmsEntryInspection.modifyTime) : null;
            });
        }
        return res;
    }
}
