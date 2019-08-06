import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IQmsOrganizationInfo } from 'app/shared/model/qms-organization-info.model';

type EntityResponseType = HttpResponse<IQmsOrganizationInfo>;
type EntityArrayResponseType = HttpResponse<IQmsOrganizationInfo[]>;

@Injectable({ providedIn: 'root' })
export class QmsOrganizationInfoService {
    public resourceUrl = SERVER_API_URL + 'api/qms-organization-infos';

    constructor(private http: HttpClient) {}

    create(qmsOrganizationInfo: IQmsOrganizationInfo): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(qmsOrganizationInfo);
        return this.http
            .post<IQmsOrganizationInfo>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(qmsOrganizationInfo: IQmsOrganizationInfo): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(qmsOrganizationInfo);
        return this.http
            .put<IQmsOrganizationInfo>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<IQmsOrganizationInfo>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IQmsOrganizationInfo[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    protected convertDateFromClient(qmsOrganizationInfo: IQmsOrganizationInfo): IQmsOrganizationInfo {
        const copy: IQmsOrganizationInfo = Object.assign({}, qmsOrganizationInfo, {
            makeTime:
                qmsOrganizationInfo.makeTime != null && qmsOrganizationInfo.makeTime.isValid()
                    ? qmsOrganizationInfo.makeTime.toJSON()
                    : null,
            modifyTime:
                qmsOrganizationInfo.modifyTime != null && qmsOrganizationInfo.modifyTime.isValid()
                    ? qmsOrganizationInfo.modifyTime.toJSON()
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
            res.body.forEach((qmsOrganizationInfo: IQmsOrganizationInfo) => {
                qmsOrganizationInfo.makeTime = qmsOrganizationInfo.makeTime != null ? moment(qmsOrganizationInfo.makeTime) : null;
                qmsOrganizationInfo.modifyTime = qmsOrganizationInfo.modifyTime != null ? moment(qmsOrganizationInfo.modifyTime) : null;
            });
        }
        return res;
    }
}
