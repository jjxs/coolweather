import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IQmsUnqualifiedMateriel } from 'app/shared/model/qms-unqualified-materiel.model';

type EntityResponseType = HttpResponse<IQmsUnqualifiedMateriel>;
type EntityArrayResponseType = HttpResponse<IQmsUnqualifiedMateriel[]>;

@Injectable({ providedIn: 'root' })
export class QmsUnqualifiedMaterielService {
    public resourceUrl = SERVER_API_URL + 'api/qms-unqualified-materiels';

    constructor(private http: HttpClient) {}

    create(qmsUnqualifiedMateriel: IQmsUnqualifiedMateriel): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(qmsUnqualifiedMateriel);
        return this.http
            .post<IQmsUnqualifiedMateriel>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(qmsUnqualifiedMateriel: IQmsUnqualifiedMateriel): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(qmsUnqualifiedMateriel);
        return this.http
            .put<IQmsUnqualifiedMateriel>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<IQmsUnqualifiedMateriel>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IQmsUnqualifiedMateriel[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    protected convertDateFromClient(qmsUnqualifiedMateriel: IQmsUnqualifiedMateriel): IQmsUnqualifiedMateriel {
        const copy: IQmsUnqualifiedMateriel = Object.assign({}, qmsUnqualifiedMateriel, {
            discoverTime:
                qmsUnqualifiedMateriel.discoverTime != null && qmsUnqualifiedMateriel.discoverTime.isValid()
                    ? qmsUnqualifiedMateriel.discoverTime.toJSON()
                    : null,
            makeTime:
                qmsUnqualifiedMateriel.makeTime != null && qmsUnqualifiedMateriel.makeTime.isValid()
                    ? qmsUnqualifiedMateriel.makeTime.toJSON()
                    : null,
            modifyTime:
                qmsUnqualifiedMateriel.modifyTime != null && qmsUnqualifiedMateriel.modifyTime.isValid()
                    ? qmsUnqualifiedMateriel.modifyTime.toJSON()
                    : null
        });
        return copy;
    }

    protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
        if (res.body) {
            res.body.discoverTime = res.body.discoverTime != null ? moment(res.body.discoverTime) : null;
            res.body.makeTime = res.body.makeTime != null ? moment(res.body.makeTime) : null;
            res.body.modifyTime = res.body.modifyTime != null ? moment(res.body.modifyTime) : null;
        }
        return res;
    }

    protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        if (res.body) {
            res.body.forEach((qmsUnqualifiedMateriel: IQmsUnqualifiedMateriel) => {
                qmsUnqualifiedMateriel.discoverTime =
                    qmsUnqualifiedMateriel.discoverTime != null ? moment(qmsUnqualifiedMateriel.discoverTime) : null;
                qmsUnqualifiedMateriel.makeTime = qmsUnqualifiedMateriel.makeTime != null ? moment(qmsUnqualifiedMateriel.makeTime) : null;
                qmsUnqualifiedMateriel.modifyTime =
                    qmsUnqualifiedMateriel.modifyTime != null ? moment(qmsUnqualifiedMateriel.modifyTime) : null;
            });
        }
        return res;
    }
}
