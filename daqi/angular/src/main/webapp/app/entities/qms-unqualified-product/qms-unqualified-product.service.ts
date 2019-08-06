import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IQmsUnqualifiedProduct } from 'app/shared/model/qms-unqualified-product.model';

type EntityResponseType = HttpResponse<IQmsUnqualifiedProduct>;
type EntityArrayResponseType = HttpResponse<IQmsUnqualifiedProduct[]>;

@Injectable({ providedIn: 'root' })
export class QmsUnqualifiedProductService {
    public resourceUrl = SERVER_API_URL + 'api/qms-unqualified-products';

    constructor(private http: HttpClient) {}

    create(qmsUnqualifiedProduct: IQmsUnqualifiedProduct): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(qmsUnqualifiedProduct);
        return this.http
            .post<IQmsUnqualifiedProduct>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(qmsUnqualifiedProduct: IQmsUnqualifiedProduct): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(qmsUnqualifiedProduct);
        return this.http
            .put<IQmsUnqualifiedProduct>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<IQmsUnqualifiedProduct>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IQmsUnqualifiedProduct[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    protected convertDateFromClient(qmsUnqualifiedProduct: IQmsUnqualifiedProduct): IQmsUnqualifiedProduct {
        const copy: IQmsUnqualifiedProduct = Object.assign({}, qmsUnqualifiedProduct, {
            approveTime:
                qmsUnqualifiedProduct.approveTime != null && qmsUnqualifiedProduct.approveTime.isValid()
                    ? qmsUnqualifiedProduct.approveTime.toJSON()
                    : null,
            makeTime:
                qmsUnqualifiedProduct.makeTime != null && qmsUnqualifiedProduct.makeTime.isValid()
                    ? qmsUnqualifiedProduct.makeTime.toJSON()
                    : null,
            modifyTime:
                qmsUnqualifiedProduct.modifyTime != null && qmsUnqualifiedProduct.modifyTime.isValid()
                    ? qmsUnqualifiedProduct.modifyTime.toJSON()
                    : null
        });
        return copy;
    }

    protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
        if (res.body) {
            res.body.approveTime = res.body.approveTime != null ? moment(res.body.approveTime) : null;
            res.body.makeTime = res.body.makeTime != null ? moment(res.body.makeTime) : null;
            res.body.modifyTime = res.body.modifyTime != null ? moment(res.body.modifyTime) : null;
        }
        return res;
    }

    protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        if (res.body) {
            res.body.forEach((qmsUnqualifiedProduct: IQmsUnqualifiedProduct) => {
                qmsUnqualifiedProduct.approveTime =
                    qmsUnqualifiedProduct.approveTime != null ? moment(qmsUnqualifiedProduct.approveTime) : null;
                qmsUnqualifiedProduct.makeTime = qmsUnqualifiedProduct.makeTime != null ? moment(qmsUnqualifiedProduct.makeTime) : null;
                qmsUnqualifiedProduct.modifyTime =
                    qmsUnqualifiedProduct.modifyTime != null ? moment(qmsUnqualifiedProduct.modifyTime) : null;
            });
        }
        return res;
    }
}
