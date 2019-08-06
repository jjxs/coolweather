import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IQmsMaterielType } from 'app/shared/model/qms-materiel-type.model';

type EntityResponseType = HttpResponse<IQmsMaterielType>;
type EntityArrayResponseType = HttpResponse<IQmsMaterielType[]>;

@Injectable({ providedIn: 'root' })
export class QmsMaterielTypeService {
    public resourceUrl = SERVER_API_URL + 'api/qms-materiel-types';

    constructor(private http: HttpClient) {}

    create(qmsMaterielType: IQmsMaterielType): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(qmsMaterielType);
        return this.http
            .post<IQmsMaterielType>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(qmsMaterielType: IQmsMaterielType): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(qmsMaterielType);
        return this.http
            .put<IQmsMaterielType>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<IQmsMaterielType>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IQmsMaterielType[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    protected convertDateFromClient(qmsMaterielType: IQmsMaterielType): IQmsMaterielType {
        const copy: IQmsMaterielType = Object.assign({}, qmsMaterielType, {
            makeTime: qmsMaterielType.makeTime != null && qmsMaterielType.makeTime.isValid() ? qmsMaterielType.makeTime.toJSON() : null,
            modifyTime:
                qmsMaterielType.modifyTime != null && qmsMaterielType.modifyTime.isValid() ? qmsMaterielType.modifyTime.toJSON() : null
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
            res.body.forEach((qmsMaterielType: IQmsMaterielType) => {
                qmsMaterielType.makeTime = qmsMaterielType.makeTime != null ? moment(qmsMaterielType.makeTime) : null;
                qmsMaterielType.modifyTime = qmsMaterielType.modifyTime != null ? moment(qmsMaterielType.modifyTime) : null;
            });
        }
        return res;
    }
}
