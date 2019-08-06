import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IQmsInspectionDetails } from 'app/shared/model/qms-inspection-details.model';

type EntityResponseType = HttpResponse<IQmsInspectionDetails>;
type EntityArrayResponseType = HttpResponse<IQmsInspectionDetails[]>;

@Injectable({ providedIn: 'root' })
export class QmsInspectionDetailsService {
    public resourceUrl = SERVER_API_URL + 'api/qms-inspection-details';

    constructor(private http: HttpClient) {}

    create(qmsInspectionDetails: IQmsInspectionDetails): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(qmsInspectionDetails);
        return this.http
            .post<IQmsInspectionDetails>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(qmsInspectionDetails: IQmsInspectionDetails): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(qmsInspectionDetails);
        return this.http
            .put<IQmsInspectionDetails>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<IQmsInspectionDetails>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IQmsInspectionDetails[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    protected convertDateFromClient(qmsInspectionDetails: IQmsInspectionDetails): IQmsInspectionDetails {
        const copy: IQmsInspectionDetails = Object.assign({}, qmsInspectionDetails, {
            makeTime:
                qmsInspectionDetails.makeTime != null && qmsInspectionDetails.makeTime.isValid()
                    ? qmsInspectionDetails.makeTime.toJSON()
                    : null,
            modifyTime:
                qmsInspectionDetails.modifyTime != null && qmsInspectionDetails.modifyTime.isValid()
                    ? qmsInspectionDetails.modifyTime.toJSON()
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
            res.body.forEach((qmsInspectionDetails: IQmsInspectionDetails) => {
                qmsInspectionDetails.makeTime = qmsInspectionDetails.makeTime != null ? moment(qmsInspectionDetails.makeTime) : null;
                qmsInspectionDetails.modifyTime = qmsInspectionDetails.modifyTime != null ? moment(qmsInspectionDetails.modifyTime) : null;
            });
        }
        return res;
    }
}
