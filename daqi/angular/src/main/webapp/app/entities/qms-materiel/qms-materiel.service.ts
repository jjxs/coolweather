import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IQmsMateriel } from 'app/shared/model/qms-materiel.model';

type EntityResponseType = HttpResponse<IQmsMateriel>;
type EntityArrayResponseType = HttpResponse<IQmsMateriel[]>;

@Injectable({ providedIn: 'root' })
export class QmsMaterielService {
    public resourceUrl = SERVER_API_URL + 'api/qms-materiels';

    constructor(private http: HttpClient) {}

    create(qmsMateriel: IQmsMateriel): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(qmsMateriel);
        return this.http
            .post<IQmsMateriel>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(qmsMateriel: IQmsMateriel): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(qmsMateriel);
        return this.http
            .put<IQmsMateriel>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<IQmsMateriel>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IQmsMateriel[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    protected convertDateFromClient(qmsMateriel: IQmsMateriel): IQmsMateriel {
        const copy: IQmsMateriel = Object.assign({}, qmsMateriel, {
            makeTime: qmsMateriel.makeTime != null && qmsMateriel.makeTime.isValid() ? qmsMateriel.makeTime.toJSON() : null,
            modifyTime: qmsMateriel.modifyTime != null && qmsMateriel.modifyTime.isValid() ? qmsMateriel.modifyTime.toJSON() : null
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
            res.body.forEach((qmsMateriel: IQmsMateriel) => {
                qmsMateriel.makeTime = qmsMateriel.makeTime != null ? moment(qmsMateriel.makeTime) : null;
                qmsMateriel.modifyTime = qmsMateriel.modifyTime != null ? moment(qmsMateriel.modifyTime) : null;
            });
        }
        return res;
    }
}
