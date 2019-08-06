import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IQmsQualityControlDetails } from 'app/shared/model/qms-quality-control-details.model';

type EntityResponseType = HttpResponse<IQmsQualityControlDetails>;
type EntityArrayResponseType = HttpResponse<IQmsQualityControlDetails[]>;

@Injectable({ providedIn: 'root' })
export class QmsQualityControlDetailsService {
    public resourceUrl = SERVER_API_URL + 'api/qms-quality-control-details';

    constructor(private http: HttpClient) {}

    create(qmsQualityControlDetails: IQmsQualityControlDetails): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(qmsQualityControlDetails);
        return this.http
            .post<IQmsQualityControlDetails>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(qmsQualityControlDetails: IQmsQualityControlDetails): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(qmsQualityControlDetails);
        return this.http
            .put<IQmsQualityControlDetails>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<IQmsQualityControlDetails>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IQmsQualityControlDetails[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    protected convertDateFromClient(qmsQualityControlDetails: IQmsQualityControlDetails): IQmsQualityControlDetails {
        const copy: IQmsQualityControlDetails = Object.assign({}, qmsQualityControlDetails, {
            makeTime:
                qmsQualityControlDetails.makeTime != null && qmsQualityControlDetails.makeTime.isValid()
                    ? qmsQualityControlDetails.makeTime.toJSON()
                    : null,
            modifyTime:
                qmsQualityControlDetails.modifyTime != null && qmsQualityControlDetails.modifyTime.isValid()
                    ? qmsQualityControlDetails.modifyTime.toJSON()
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
            res.body.forEach((qmsQualityControlDetails: IQmsQualityControlDetails) => {
                qmsQualityControlDetails.makeTime =
                    qmsQualityControlDetails.makeTime != null ? moment(qmsQualityControlDetails.makeTime) : null;
                qmsQualityControlDetails.modifyTime =
                    qmsQualityControlDetails.modifyTime != null ? moment(qmsQualityControlDetails.modifyTime) : null;
            });
        }
        return res;
    }
}
