import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IQmsEntryControlCriterion } from 'app/shared/model/qms-entry-control-criterion.model';

type EntityResponseType = HttpResponse<IQmsEntryControlCriterion>;
type EntityArrayResponseType = HttpResponse<IQmsEntryControlCriterion[]>;

@Injectable({ providedIn: 'root' })
export class QmsEntryControlCriterionService {
    public resourceUrl = SERVER_API_URL + 'api/qms-entry-control-criteria';

    constructor(private http: HttpClient) {}

    create(qmsEntryControlCriterion: IQmsEntryControlCriterion): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(qmsEntryControlCriterion);
        return this.http
            .post<IQmsEntryControlCriterion>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(qmsEntryControlCriterion: IQmsEntryControlCriterion): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(qmsEntryControlCriterion);
        return this.http
            .put<IQmsEntryControlCriterion>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<IQmsEntryControlCriterion>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IQmsEntryControlCriterion[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    protected convertDateFromClient(qmsEntryControlCriterion: IQmsEntryControlCriterion): IQmsEntryControlCriterion {
        const copy: IQmsEntryControlCriterion = Object.assign({}, qmsEntryControlCriterion, {
            makeTime:
                qmsEntryControlCriterion.makeTime != null && qmsEntryControlCriterion.makeTime.isValid()
                    ? qmsEntryControlCriterion.makeTime.toJSON()
                    : null,
            modifyTime:
                qmsEntryControlCriterion.modifyTime != null && qmsEntryControlCriterion.modifyTime.isValid()
                    ? qmsEntryControlCriterion.modifyTime.toJSON()
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
            res.body.forEach((qmsEntryControlCriterion: IQmsEntryControlCriterion) => {
                qmsEntryControlCriterion.makeTime =
                    qmsEntryControlCriterion.makeTime != null ? moment(qmsEntryControlCriterion.makeTime) : null;
                qmsEntryControlCriterion.modifyTime =
                    qmsEntryControlCriterion.modifyTime != null ? moment(qmsEntryControlCriterion.modifyTime) : null;
            });
        }
        return res;
    }
}
