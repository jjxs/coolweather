import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IQmsProductionRelation } from 'app/shared/model/qms-production-relation.model';

type EntityResponseType = HttpResponse<IQmsProductionRelation>;
type EntityArrayResponseType = HttpResponse<IQmsProductionRelation[]>;

@Injectable({ providedIn: 'root' })
export class QmsProductionRelationService {
    public resourceUrl = SERVER_API_URL + 'api/qms-production-relations';

    constructor(private http: HttpClient) {}

    create(qmsProductionRelation: IQmsProductionRelation): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(qmsProductionRelation);
        return this.http
            .post<IQmsProductionRelation>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(qmsProductionRelation: IQmsProductionRelation): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(qmsProductionRelation);
        return this.http
            .put<IQmsProductionRelation>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<IQmsProductionRelation>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IQmsProductionRelation[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    protected convertDateFromClient(qmsProductionRelation: IQmsProductionRelation): IQmsProductionRelation {
        const copy: IQmsProductionRelation = Object.assign({}, qmsProductionRelation, {
            confirmTime1:
                qmsProductionRelation.confirmTime1 != null && qmsProductionRelation.confirmTime1.isValid()
                    ? qmsProductionRelation.confirmTime1.toJSON()
                    : null,
            confirmTime2:
                qmsProductionRelation.confirmTime2 != null && qmsProductionRelation.confirmTime2.isValid()
                    ? qmsProductionRelation.confirmTime2.toJSON()
                    : null,
            makeTime:
                qmsProductionRelation.makeTime != null && qmsProductionRelation.makeTime.isValid()
                    ? qmsProductionRelation.makeTime.toJSON()
                    : null,
            modifyTime:
                qmsProductionRelation.modifyTime != null && qmsProductionRelation.modifyTime.isValid()
                    ? qmsProductionRelation.modifyTime.toJSON()
                    : null
        });
        return copy;
    }

    protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
        if (res.body) {
            res.body.confirmTime1 = res.body.confirmTime1 != null ? moment(res.body.confirmTime1) : null;
            res.body.confirmTime2 = res.body.confirmTime2 != null ? moment(res.body.confirmTime2) : null;
            res.body.makeTime = res.body.makeTime != null ? moment(res.body.makeTime) : null;
            res.body.modifyTime = res.body.modifyTime != null ? moment(res.body.modifyTime) : null;
        }
        return res;
    }

    protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        if (res.body) {
            res.body.forEach((qmsProductionRelation: IQmsProductionRelation) => {
                qmsProductionRelation.confirmTime1 =
                    qmsProductionRelation.confirmTime1 != null ? moment(qmsProductionRelation.confirmTime1) : null;
                qmsProductionRelation.confirmTime2 =
                    qmsProductionRelation.confirmTime2 != null ? moment(qmsProductionRelation.confirmTime2) : null;
                qmsProductionRelation.makeTime = qmsProductionRelation.makeTime != null ? moment(qmsProductionRelation.makeTime) : null;
                qmsProductionRelation.modifyTime =
                    qmsProductionRelation.modifyTime != null ? moment(qmsProductionRelation.modifyTime) : null;
            });
        }
        return res;
    }
}
