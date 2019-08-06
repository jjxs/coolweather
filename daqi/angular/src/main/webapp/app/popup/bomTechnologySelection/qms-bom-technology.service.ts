import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IQmsBomTechnology } from 'app/shared/model/qms-bom-technology.model';

type EntityResponseType = HttpResponse<IQmsBomTechnology>;
type EntityArrayResponseType = HttpResponse<IQmsBomTechnology[]>;

@Injectable({ providedIn: 'root' })
export class QmsBomTechnologyService {
    public resourceUrl = SERVER_API_URL + 'api/qms-bom-technologies';

    constructor(private http: HttpClient) {}

    create(qmsBomTechnology: IQmsBomTechnology): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(qmsBomTechnology);
        return this.http
            .post<IQmsBomTechnology>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(qmsBomTechnology: IQmsBomTechnology): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(qmsBomTechnology);
        return this.http
            .put<IQmsBomTechnology>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<IQmsBomTechnology>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IQmsBomTechnology[]>(this.resourceUrl+'/popupIndex', { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    protected convertDateFromClient(qmsBomTechnology: IQmsBomTechnology): IQmsBomTechnology {
        const copy: IQmsBomTechnology = Object.assign({}, qmsBomTechnology, {
            makeTime: qmsBomTechnology.makeTime != null && qmsBomTechnology.makeTime.isValid() ? qmsBomTechnology.makeTime.toJSON() : null,
            modifyTime:
                qmsBomTechnology.modifyTime != null && qmsBomTechnology.modifyTime.isValid() ? qmsBomTechnology.modifyTime.toJSON() : null
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
            res.body.forEach((qmsBomTechnology: IQmsBomTechnology) => {
                qmsBomTechnology.makeTime = qmsBomTechnology.makeTime != null ? moment(qmsBomTechnology.makeTime) : null;
                qmsBomTechnology.modifyTime = qmsBomTechnology.modifyTime != null ? moment(qmsBomTechnology.modifyTime) : null;
            });
        }
        return res;
    }
}
