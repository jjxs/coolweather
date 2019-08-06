import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IQmsProcessRoute } from 'app/shared/model/qms-process-route.model';

type EntityResponseType = HttpResponse<IQmsProcessRoute>;
type EntityArrayResponseType = HttpResponse<IQmsProcessRoute[]>;

@Injectable({ providedIn: 'root' })
export class QmsProcessRouteService {
    public resourceUrl = SERVER_API_URL + 'api/qms-process-routes';

    constructor(private http: HttpClient) {}

    create(qmsProcessRoute: IQmsProcessRoute): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(qmsProcessRoute);
        return this.http
            .post<IQmsProcessRoute>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(qmsProcessRoute: IQmsProcessRoute): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(qmsProcessRoute);
        return this.http
            .put<IQmsProcessRoute>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<IQmsProcessRoute>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IQmsProcessRoute[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    protected convertDateFromClient(qmsProcessRoute: IQmsProcessRoute): IQmsProcessRoute {
        const copy: IQmsProcessRoute = Object.assign({}, qmsProcessRoute, {
            makeTime: qmsProcessRoute.makeTime != null && qmsProcessRoute.makeTime.isValid() ? qmsProcessRoute.makeTime.toJSON() : null,
            modifyTime:
                qmsProcessRoute.modifyTime != null && qmsProcessRoute.modifyTime.isValid() ? qmsProcessRoute.modifyTime.toJSON() : null
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
            res.body.forEach((qmsProcessRoute: IQmsProcessRoute) => {
                qmsProcessRoute.makeTime = qmsProcessRoute.makeTime != null ? moment(qmsProcessRoute.makeTime) : null;
                qmsProcessRoute.modifyTime = qmsProcessRoute.modifyTime != null ? moment(qmsProcessRoute.modifyTime) : null;
            });
        }
        return res;
    }
}
