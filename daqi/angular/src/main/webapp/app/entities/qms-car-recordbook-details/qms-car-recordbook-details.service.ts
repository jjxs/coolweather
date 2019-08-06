import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IQmsCarRecordbookDetails } from 'app/shared/model/qms-car-recordbook-details.model';

type EntityResponseType = HttpResponse<IQmsCarRecordbookDetails>;
type EntityArrayResponseType = HttpResponse<IQmsCarRecordbookDetails[]>;

@Injectable({ providedIn: 'root' })
export class QmsCarRecordbookDetailsService {
    public resourceUrl = SERVER_API_URL + 'api/qms-car-recordbook-details';

    constructor(private http: HttpClient) {}

    create(qmsCarRecordbookDetails: IQmsCarRecordbookDetails): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(qmsCarRecordbookDetails);
        return this.http
            .post<IQmsCarRecordbookDetails>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(qmsCarRecordbookDetails: IQmsCarRecordbookDetails): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(qmsCarRecordbookDetails);
        return this.http
            .put<IQmsCarRecordbookDetails>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<IQmsCarRecordbookDetails>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IQmsCarRecordbookDetails[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    protected convertDateFromClient(qmsCarRecordbookDetails: IQmsCarRecordbookDetails): IQmsCarRecordbookDetails {
        const copy: IQmsCarRecordbookDetails = Object.assign({}, qmsCarRecordbookDetails, {
            makeTime:
                qmsCarRecordbookDetails.makeTime != null && qmsCarRecordbookDetails.makeTime.isValid()
                    ? qmsCarRecordbookDetails.makeTime.toJSON()
                    : null,
            modifyTime:
                qmsCarRecordbookDetails.modifyTime != null && qmsCarRecordbookDetails.modifyTime.isValid()
                    ? qmsCarRecordbookDetails.modifyTime.toJSON()
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
            res.body.forEach((qmsCarRecordbookDetails: IQmsCarRecordbookDetails) => {
                qmsCarRecordbookDetails.makeTime =
                    qmsCarRecordbookDetails.makeTime != null ? moment(qmsCarRecordbookDetails.makeTime) : null;
                qmsCarRecordbookDetails.modifyTime =
                    qmsCarRecordbookDetails.modifyTime != null ? moment(qmsCarRecordbookDetails.modifyTime) : null;
            });
        }
        return res;
    }
}
