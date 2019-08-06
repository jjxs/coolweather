import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IQmsSupplier } from 'app/shared/model/qms-supplier.model';

type EntityResponseType = HttpResponse<IQmsSupplier>;
type EntityArrayResponseType = HttpResponse<IQmsSupplier[]>;

@Injectable({ providedIn: 'root' })
export class QmsSupplierService {
    public resourceUrl = SERVER_API_URL + 'api/qms-suppliers';

    constructor(private http: HttpClient) {}

    create(qmsSupplier: IQmsSupplier): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(qmsSupplier);
        return this.http
            .post<IQmsSupplier>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(qmsSupplier: IQmsSupplier): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(qmsSupplier);
        return this.http
            .put<IQmsSupplier>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<IQmsSupplier>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IQmsSupplier[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    protected convertDateFromClient(qmsSupplier: IQmsSupplier): IQmsSupplier {
        const copy: IQmsSupplier = Object.assign({}, qmsSupplier, {
            makeTime: qmsSupplier.makeTime != null && qmsSupplier.makeTime.isValid() ? qmsSupplier.makeTime.toJSON() : null,
            modifyTime: qmsSupplier.modifyTime != null && qmsSupplier.modifyTime.isValid() ? qmsSupplier.modifyTime.toJSON() : null
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
            res.body.forEach((qmsSupplier: IQmsSupplier) => {
                qmsSupplier.makeTime = qmsSupplier.makeTime != null ? moment(qmsSupplier.makeTime) : null;
                qmsSupplier.modifyTime = qmsSupplier.modifyTime != null ? moment(qmsSupplier.modifyTime) : null;
            });
        }
        return res;
    }
}
