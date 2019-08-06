import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IQmsProduct } from 'app/shared/model/qms-product.model';

type EntityResponseType = HttpResponse<IQmsProduct>;
type EntityArrayResponseType = HttpResponse<IQmsProduct[]>;

@Injectable({ providedIn: 'root' })
export class QmsProductService {
    public resourceUrl = SERVER_API_URL + 'api/qms-products';

    constructor(private http: HttpClient) {}

    create(qmsProduct: IQmsProduct): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(qmsProduct);
        return this.http
            .post<IQmsProduct>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(qmsProduct: IQmsProduct): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(qmsProduct);
        return this.http
            .put<IQmsProduct>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<IQmsProduct>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }
    //正向追溯产品信息
    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IQmsProduct[]>(this.resourceUrl+'/selectTabData', { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }
    //正向追溯产品信息
    queryTwo(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IQmsProduct[]>(this.resourceUrl+'/selectTabDataTwo', { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    //正向追溯到货信息
    queryThree(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IQmsProduct[]>(this.resourceUrl+'/selectTabDataThree', { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    protected convertDateFromClient(qmsProduct: IQmsProduct): IQmsProduct {
        const copy: IQmsProduct = Object.assign({}, qmsProduct, {
            makeTime: qmsProduct.makeTime != null && qmsProduct.makeTime.isValid() ? qmsProduct.makeTime.toJSON() : null,
            modifyTime: qmsProduct.modifyTime != null && qmsProduct.modifyTime.isValid() ? qmsProduct.modifyTime.toJSON() : null
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
            res.body.forEach((qmsProduct: IQmsProduct) => {
                qmsProduct.makeTime = qmsProduct.makeTime != null ? moment(qmsProduct.makeTime) : null;
                qmsProduct.modifyTime = qmsProduct.modifyTime != null ? moment(qmsProduct.modifyTime) : null;
            });
        }
        return res;
    }
}
