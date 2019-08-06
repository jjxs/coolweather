import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IQmsInspectionInfo } from 'app/shared/model/qms-inspection-info.model';

type EntityResponseType = HttpResponse<IQmsInspectionInfo>;
type EntityArrayResponseType = HttpResponse<IQmsInspectionInfo[]>;

@Injectable({ providedIn: 'root' })
export class QmsInspectionInfoService {
    public resourceUrl = SERVER_API_URL + 'api/qms-inspection-infos';

    constructor(private http: HttpClient) {}

    create(qmsInspectionInfo: IQmsInspectionInfo): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(qmsInspectionInfo);
        return this.http
            .post<IQmsInspectionInfo>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(qmsInspectionInfo: IQmsInspectionInfo): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(qmsInspectionInfo);
        return this.http
            .put<IQmsInspectionInfo>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<IQmsInspectionInfo>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IQmsInspectionInfo[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    protected convertDateFromClient(qmsInspectionInfo: IQmsInspectionInfo): IQmsInspectionInfo {
        const copy: IQmsInspectionInfo = Object.assign({}, qmsInspectionInfo, {
            makeTime:
                qmsInspectionInfo.makeTime != null && qmsInspectionInfo.makeTime.isValid() ? qmsInspectionInfo.makeTime.toJSON() : null,
            modifyTime:
                qmsInspectionInfo.modifyTime != null && qmsInspectionInfo.modifyTime.isValid()
                    ? qmsInspectionInfo.modifyTime.toJSON()
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
            res.body.forEach((qmsInspectionInfo: IQmsInspectionInfo) => {
                qmsInspectionInfo.makeTime = qmsInspectionInfo.makeTime != null ? moment(qmsInspectionInfo.makeTime) : null;
                qmsInspectionInfo.modifyTime = qmsInspectionInfo.modifyTime != null ? moment(qmsInspectionInfo.modifyTime) : null;
            });
        }
        return res;
    }
}
