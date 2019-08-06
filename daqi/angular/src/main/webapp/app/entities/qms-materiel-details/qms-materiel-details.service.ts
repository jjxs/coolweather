import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IQmsMaterielDetails } from 'app/shared/model/qms-materiel-details.model';

type EntityResponseType = HttpResponse<IQmsMaterielDetails>;
type EntityArrayResponseType = HttpResponse<IQmsMaterielDetails[]>;

@Injectable({ providedIn: 'root' })
export class QmsMaterielDetailsService {
    public resourceUrl = SERVER_API_URL + 'api/qms-materiel-details';

    constructor(private http: HttpClient) {}

    create(qmsMaterielDetails: IQmsMaterielDetails): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(qmsMaterielDetails);
        return this.http
            .post<IQmsMaterielDetails>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(qmsMaterielDetails: IQmsMaterielDetails): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(qmsMaterielDetails);
        return this.http
            .put<IQmsMaterielDetails>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<IQmsMaterielDetails>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IQmsMaterielDetails[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    protected convertDateFromClient(qmsMaterielDetails: IQmsMaterielDetails): IQmsMaterielDetails {
        const copy: IQmsMaterielDetails = Object.assign({}, qmsMaterielDetails, {
            makeTime:
                qmsMaterielDetails.makeTime != null && qmsMaterielDetails.makeTime.isValid() ? qmsMaterielDetails.makeTime.toJSON() : null,
            modifyTime:
                qmsMaterielDetails.modifyTime != null && qmsMaterielDetails.modifyTime.isValid()
                    ? qmsMaterielDetails.modifyTime.toJSON()
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
            res.body.forEach((qmsMaterielDetails: IQmsMaterielDetails) => {
                qmsMaterielDetails.makeTime = qmsMaterielDetails.makeTime != null ? moment(qmsMaterielDetails.makeTime) : null;
                qmsMaterielDetails.modifyTime = qmsMaterielDetails.modifyTime != null ? moment(qmsMaterielDetails.modifyTime) : null;
            });
        }
        return res;
    }
}
