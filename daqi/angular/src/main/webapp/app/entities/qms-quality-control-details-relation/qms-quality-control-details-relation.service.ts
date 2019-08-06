import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IQmsQualityControlDetailsRelation } from 'app/shared/model/qms-quality-control-details-relation.model';

type EntityResponseType = HttpResponse<IQmsQualityControlDetailsRelation>;
type EntityArrayResponseType = HttpResponse<IQmsQualityControlDetailsRelation[]>;

@Injectable({ providedIn: 'root' })
export class QmsQualityControlDetailsRelationService {
    public resourceUrl = SERVER_API_URL + 'api/qms-quality-control-details-relations';

    constructor(private http: HttpClient) {}

    create(qmsQualityControlDetailsRelation: IQmsQualityControlDetailsRelation): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(qmsQualityControlDetailsRelation);
        return this.http
            .post<IQmsQualityControlDetailsRelation>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(qmsQualityControlDetailsRelation: IQmsQualityControlDetailsRelation): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(qmsQualityControlDetailsRelation);
        return this.http
            .put<IQmsQualityControlDetailsRelation>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<IQmsQualityControlDetailsRelation>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IQmsQualityControlDetailsRelation[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    protected convertDateFromClient(
        qmsQualityControlDetailsRelation: IQmsQualityControlDetailsRelation
    ): IQmsQualityControlDetailsRelation {
        const copy: IQmsQualityControlDetailsRelation = Object.assign({}, qmsQualityControlDetailsRelation, {
            makeTime:
                qmsQualityControlDetailsRelation.makeTime != null && qmsQualityControlDetailsRelation.makeTime.isValid()
                    ? qmsQualityControlDetailsRelation.makeTime.toJSON()
                    : null,
            modifyTime:
                qmsQualityControlDetailsRelation.modifyTime != null && qmsQualityControlDetailsRelation.modifyTime.isValid()
                    ? qmsQualityControlDetailsRelation.modifyTime.toJSON()
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
            res.body.forEach((qmsQualityControlDetailsRelation: IQmsQualityControlDetailsRelation) => {
                qmsQualityControlDetailsRelation.makeTime =
                    qmsQualityControlDetailsRelation.makeTime != null ? moment(qmsQualityControlDetailsRelation.makeTime) : null;
                qmsQualityControlDetailsRelation.modifyTime =
                    qmsQualityControlDetailsRelation.modifyTime != null ? moment(qmsQualityControlDetailsRelation.modifyTime) : null;
            });
        }
        return res;
    }
}
