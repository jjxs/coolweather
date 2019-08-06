import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IHstServerInfo } from 'app/shared/model/hst-server-info.model';

type EntityResponseType = HttpResponse<IHstServerInfo>;
type EntityArrayResponseType = HttpResponse<IHstServerInfo[]>;

@Injectable({ providedIn: 'root' })
export class HstServerInfoService {
    public resourceUrl = SERVER_API_URL + 'api/hst-server-infos';

    constructor(private http: HttpClient) {}

    create(hstServerInfo: IHstServerInfo): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(hstServerInfo);
        return this.http
            .post<IHstServerInfo>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(hstServerInfo: IHstServerInfo): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(hstServerInfo);
        return this.http
            .put<IHstServerInfo>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<IHstServerInfo>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IHstServerInfo[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    protected convertDateFromClient(hstServerInfo: IHstServerInfo): IHstServerInfo {
        const copy: IHstServerInfo = Object.assign({}, hstServerInfo, {
            nodeJoinTime:
                hstServerInfo.nodeJoinTime != null && hstServerInfo.nodeJoinTime.isValid() ? hstServerInfo.nodeJoinTime.toJSON() : null,
            insDateTime:
                hstServerInfo.insDateTime != null && hstServerInfo.insDateTime.isValid() ? hstServerInfo.insDateTime.toJSON() : null,
            updDateTime:
                hstServerInfo.updDateTime != null && hstServerInfo.updDateTime.isValid() ? hstServerInfo.updDateTime.toJSON() : null,
            delDateTime:
                hstServerInfo.delDateTime != null && hstServerInfo.delDateTime.isValid() ? hstServerInfo.delDateTime.toJSON() : null,
            triggerDateTime:
                hstServerInfo.triggerDateTime != null && hstServerInfo.triggerDateTime.isValid()
                    ? hstServerInfo.triggerDateTime.toJSON()
                    : null
        });
        return copy;
    }

    protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
        if (res.body) {
            res.body.nodeJoinTime = res.body.nodeJoinTime != null ? moment(res.body.nodeJoinTime) : null;
            res.body.insDateTime = res.body.insDateTime != null ? moment(res.body.insDateTime) : null;
            res.body.updDateTime = res.body.updDateTime != null ? moment(res.body.updDateTime) : null;
            res.body.delDateTime = res.body.delDateTime != null ? moment(res.body.delDateTime) : null;
            res.body.triggerDateTime = res.body.triggerDateTime != null ? moment(res.body.triggerDateTime) : null;
        }
        return res;
    }

    protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        if (res.body) {
            res.body.forEach((hstServerInfo: IHstServerInfo) => {
                hstServerInfo.nodeJoinTime = hstServerInfo.nodeJoinTime != null ? moment(hstServerInfo.nodeJoinTime) : null;
                hstServerInfo.insDateTime = hstServerInfo.insDateTime != null ? moment(hstServerInfo.insDateTime) : null;
                hstServerInfo.updDateTime = hstServerInfo.updDateTime != null ? moment(hstServerInfo.updDateTime) : null;
                hstServerInfo.delDateTime = hstServerInfo.delDateTime != null ? moment(hstServerInfo.delDateTime) : null;
                hstServerInfo.triggerDateTime = hstServerInfo.triggerDateTime != null ? moment(hstServerInfo.triggerDateTime) : null;
            });
        }
        return res;
    }
}
