import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IHstServerInfoDetails } from 'app/shared/model/hst-server-info-details.model';

type EntityResponseType = HttpResponse<IHstServerInfoDetails>;
type EntityArrayResponseType = HttpResponse<IHstServerInfoDetails[]>;

@Injectable({ providedIn: 'root' })
export class HstServerInfoDetailsService {
    public resourceUrl = SERVER_API_URL + 'api/hst-server-info-details';

    constructor(private http: HttpClient) {}

    create(hstServerInfoDetails: IHstServerInfoDetails): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(hstServerInfoDetails);
        return this.http
            .post<IHstServerInfoDetails>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(hstServerInfoDetails: IHstServerInfoDetails): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(hstServerInfoDetails);
        return this.http
            .put<IHstServerInfoDetails>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<IHstServerInfoDetails>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IHstServerInfoDetails[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    protected convertDateFromClient(hstServerInfoDetails: IHstServerInfoDetails): IHstServerInfoDetails {
        const copy: IHstServerInfoDetails = Object.assign({}, hstServerInfoDetails, {
            insDateTime:
                hstServerInfoDetails.insDateTime != null && hstServerInfoDetails.insDateTime.isValid()
                    ? hstServerInfoDetails.insDateTime.toJSON()
                    : null,
            updDateTime:
                hstServerInfoDetails.updDateTime != null && hstServerInfoDetails.updDateTime.isValid()
                    ? hstServerInfoDetails.updDateTime.toJSON()
                    : null,
            delDateTime:
                hstServerInfoDetails.delDateTime != null && hstServerInfoDetails.delDateTime.isValid()
                    ? hstServerInfoDetails.delDateTime.toJSON()
                    : null,
            triggerDateTime:
                hstServerInfoDetails.triggerDateTime != null && hstServerInfoDetails.triggerDateTime.isValid()
                    ? hstServerInfoDetails.triggerDateTime.toJSON()
                    : null
        });
        return copy;
    }

    protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
        if (res.body) {
            res.body.insDateTime = res.body.insDateTime != null ? moment(res.body.insDateTime) : null;
            res.body.updDateTime = res.body.updDateTime != null ? moment(res.body.updDateTime) : null;
            res.body.delDateTime = res.body.delDateTime != null ? moment(res.body.delDateTime) : null;
            res.body.triggerDateTime = res.body.triggerDateTime != null ? moment(res.body.triggerDateTime) : null;
        }
        return res;
    }

    protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        if (res.body) {
            res.body.forEach((hstServerInfoDetails: IHstServerInfoDetails) => {
                hstServerInfoDetails.insDateTime =
                    hstServerInfoDetails.insDateTime != null ? moment(hstServerInfoDetails.insDateTime) : null;
                hstServerInfoDetails.updDateTime =
                    hstServerInfoDetails.updDateTime != null ? moment(hstServerInfoDetails.updDateTime) : null;
                hstServerInfoDetails.delDateTime =
                    hstServerInfoDetails.delDateTime != null ? moment(hstServerInfoDetails.delDateTime) : null;
                hstServerInfoDetails.triggerDateTime =
                    hstServerInfoDetails.triggerDateTime != null ? moment(hstServerInfoDetails.triggerDateTime) : null;
            });
        }
        return res;
    }
}
