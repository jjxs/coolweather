import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IQmsUnqualifiedProductDetails } from 'app/shared/model/qms-unqualified-product-details.model';

type EntityResponseType = HttpResponse<IQmsUnqualifiedProductDetails>;
type EntityArrayResponseType = HttpResponse<IQmsUnqualifiedProductDetails[]>;

@Injectable({ providedIn: 'root' })
export class QmsUnqualifiedProductDetailsService {
    public resourceUrl = SERVER_API_URL + 'api/qms-unqualified-product-details';

    constructor(private http: HttpClient) {}

    create(qmsUnqualifiedProductDetails: IQmsUnqualifiedProductDetails): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(qmsUnqualifiedProductDetails);
        return this.http
            .post<IQmsUnqualifiedProductDetails>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(qmsUnqualifiedProductDetails: IQmsUnqualifiedProductDetails): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(qmsUnqualifiedProductDetails);
        return this.http
            .put<IQmsUnqualifiedProductDetails>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<IQmsUnqualifiedProductDetails>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IQmsUnqualifiedProductDetails[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    protected convertDateFromClient(qmsUnqualifiedProductDetails: IQmsUnqualifiedProductDetails): IQmsUnqualifiedProductDetails {
        const copy: IQmsUnqualifiedProductDetails = Object.assign({}, qmsUnqualifiedProductDetails, {
            makeTime:
                qmsUnqualifiedProductDetails.makeTime != null && qmsUnqualifiedProductDetails.makeTime.isValid()
                    ? qmsUnqualifiedProductDetails.makeTime.toJSON()
                    : null,
            modifyTime:
                qmsUnqualifiedProductDetails.modifyTime != null && qmsUnqualifiedProductDetails.modifyTime.isValid()
                    ? qmsUnqualifiedProductDetails.modifyTime.toJSON()
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
            res.body.forEach((qmsUnqualifiedProductDetails: IQmsUnqualifiedProductDetails) => {
                qmsUnqualifiedProductDetails.makeTime =
                    qmsUnqualifiedProductDetails.makeTime != null ? moment(qmsUnqualifiedProductDetails.makeTime) : null;
                qmsUnqualifiedProductDetails.modifyTime =
                    qmsUnqualifiedProductDetails.modifyTime != null ? moment(qmsUnqualifiedProductDetails.modifyTime) : null;
            });
        }
        return res;
    }
}
