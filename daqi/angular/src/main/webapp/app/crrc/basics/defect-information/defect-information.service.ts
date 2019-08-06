import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IQmsDefect } from 'app/shared/model/qms-defect.model';

type EntityResponseType = HttpResponse<IQmsDefect>;
type EntityArrayResponseType = HttpResponse<IQmsDefect[]>;

@Injectable({ providedIn: 'root' })
export class DefectInformationService {
    public resourceUrl = SERVER_API_URL + 'api/qms-defects';

    constructor(private http: HttpClient) { }

    create(qmsDefect: IQmsDefect): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(qmsDefect);
        return this.http
            .post<IQmsDefect>(this.resourceUrl + '/CreateInfo', copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(qmsDefect: IQmsDefect): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(qmsDefect);
        return this.http
            .put<IQmsDefect>(this.resourceUrl + '/UpdateInfo', copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<IQmsDefect>(`${this.resourceUrl + '/detail'}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IQmsDefect[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
    /**
    * 检索所有数据
    * @param param
    */
    selectInfo(param?: any): Observable<any> {
        return this.http.post(`${this.resourceUrl + '/getAllList'}`, param);
    }
    /**
    * 
    * @param id 
    */
    updateCarType(id: any) {
        return this.http.post(`${this.resourceUrl + '/deleteInfo'}/${id}`, { observe: 'response' });
    }
    protected convertDateFromClient(qmsDefect: IQmsDefect): IQmsDefect {
        const copy: IQmsDefect = Object.assign({}, qmsDefect, {
            makeTime: qmsDefect.makeTime != null && qmsDefect.makeTime.isValid() ? qmsDefect.makeTime.toJSON() : null,
            modifyTime: qmsDefect.modifyTime != null && qmsDefect.modifyTime.isValid() ? qmsDefect.modifyTime.toJSON() : null
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
            res.body.forEach((qmsDefect: IQmsDefect) => {
                qmsDefect.makeTime = qmsDefect.makeTime != null ? moment(qmsDefect.makeTime) : null;
                qmsDefect.modifyTime = qmsDefect.modifyTime != null ? moment(qmsDefect.modifyTime) : null;
            });
        }
        return res;
    }
}
