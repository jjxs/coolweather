import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IQmsMaterielSupplier } from 'app/shared/model/qms-materiel-supplier.model';

type EntityResponseType = HttpResponse<IQmsMaterielSupplier>;
type EntityArrayResponseType = HttpResponse<IQmsMaterielSupplier[]>;

@Injectable({ providedIn: 'root' })
export class QmsMaterielSupplierService {
    public resourceUrl = SERVER_API_URL + 'api/qms-materiel-suppliers';

    constructor(private http: HttpClient) {}

    create(qmsMaterielSupplier: IQmsMaterielSupplier): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(qmsMaterielSupplier);
        return this.http
            .post<IQmsMaterielSupplier>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(qmsMaterielSupplier: IQmsMaterielSupplier): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(qmsMaterielSupplier);
        return this.http
            .put<IQmsMaterielSupplier>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<IQmsMaterielSupplier>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IQmsMaterielSupplier[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    protected convertDateFromClient(qmsMaterielSupplier: IQmsMaterielSupplier): IQmsMaterielSupplier {
        const copy: IQmsMaterielSupplier = Object.assign({}, qmsMaterielSupplier, {
            makeTime:
                qmsMaterielSupplier.makeTime != null && qmsMaterielSupplier.makeTime.isValid()
                    ? qmsMaterielSupplier.makeTime.toJSON()
                    : null,
            modifyTime:
                qmsMaterielSupplier.modifyTime != null && qmsMaterielSupplier.modifyTime.isValid()
                    ? qmsMaterielSupplier.modifyTime.toJSON()
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
            res.body.forEach((qmsMaterielSupplier: IQmsMaterielSupplier) => {
                qmsMaterielSupplier.makeTime = qmsMaterielSupplier.makeTime != null ? moment(qmsMaterielSupplier.makeTime) : null;
                qmsMaterielSupplier.modifyTime = qmsMaterielSupplier.modifyTime != null ? moment(qmsMaterielSupplier.modifyTime) : null;
            });
        }
        return res;
    }
}
