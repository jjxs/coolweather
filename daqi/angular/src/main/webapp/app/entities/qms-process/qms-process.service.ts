import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IQmsProcess } from 'app/shared/model/qms-process.model';

type EntityResponseType = HttpResponse<IQmsProcess>;
type EntityArrayResponseType = HttpResponse<IQmsProcess[]>;

@Injectable({ providedIn: 'root' })
export class QmsProcessService {
    public resourceUrl = SERVER_API_URL + 'api/qms-processes';

    constructor(private http: HttpClient) {}

    create(qmsProcess: IQmsProcess): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(qmsProcess);
        return this.http
            .post<IQmsProcess>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(qmsProcess: IQmsProcess): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(qmsProcess);
        return this.http
            .put<IQmsProcess>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<IQmsProcess>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IQmsProcess[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    protected convertDateFromClient(qmsProcess: IQmsProcess): IQmsProcess {
        const copy: IQmsProcess = Object.assign({}, qmsProcess, {
            makeTime: qmsProcess.makeTime != null && qmsProcess.makeTime.isValid() ? qmsProcess.makeTime.toJSON() : null,
            modifyTime: qmsProcess.modifyTime != null && qmsProcess.modifyTime.isValid() ? qmsProcess.modifyTime.toJSON() : null
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
            res.body.forEach((qmsProcess: IQmsProcess) => {
                qmsProcess.makeTime = qmsProcess.makeTime != null ? moment(qmsProcess.makeTime) : null;
                qmsProcess.modifyTime = qmsProcess.modifyTime != null ? moment(qmsProcess.modifyTime) : null;
            });
        }
        return res;
    }
}
