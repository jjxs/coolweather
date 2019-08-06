import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IQmsQualityControl } from 'app/shared/model/qms-quality-control.model';

type EntityResponseType = HttpResponse<IQmsQualityControl>;
type EntityArrayResponseType = HttpResponse<IQmsQualityControl[]>;

@Injectable({ providedIn: 'root' })
export class QmsQualityControlService {
    public resourceUrl = SERVER_API_URL + 'api/qms-quality-controls';

    constructor(private http: HttpClient) {}

    create(qmsQualityControl: IQmsQualityControl): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(qmsQualityControl);
        return this.http
            .post<IQmsQualityControl>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(qmsQualityControl: IQmsQualityControl): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(qmsQualityControl);
        return this.http
            .put<IQmsQualityControl>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<IQmsQualityControl>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IQmsQualityControl[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    search(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IQmsQualityControl[]>(this.resourceUrl + '/search', { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    protected convertDateFromClient(qmsQualityControl: IQmsQualityControl): IQmsQualityControl {
        const copy: IQmsQualityControl = Object.assign({}, qmsQualityControl, {
            makeTime:
                qmsQualityControl.makeTime != null && qmsQualityControl.makeTime.isValid() ? qmsQualityControl.makeTime.toJSON() : null,
            modifyTime:
                qmsQualityControl.modifyTime != null && qmsQualityControl.modifyTime.isValid()
                    ? qmsQualityControl.modifyTime.toJSON()
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
            res.body.forEach((qmsQualityControl: IQmsQualityControl) => {
                qmsQualityControl.makeTime = qmsQualityControl.makeTime != null ? moment(qmsQualityControl.makeTime) : null;
                qmsQualityControl.modifyTime = qmsQualityControl.modifyTime != null ? moment(qmsQualityControl.modifyTime) : null;
            });
        }
        return res;
    }
}
