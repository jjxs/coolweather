import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IQmsProductionTask } from 'app/shared/model/qms-production-task.model';

type EntityResponseType = HttpResponse<IQmsProductionTask>;
type EntityArrayResponseType = HttpResponse<IQmsProductionTask[]>;

@Injectable({ providedIn: 'root' })
export class QmsProductionTaskService {
    public resourceUrl = SERVER_API_URL + 'api/qms-production-tasks';

    constructor(private http: HttpClient) {}

    create(qmsProductionTask: IQmsProductionTask): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(qmsProductionTask);
        return this.http
            .post<IQmsProductionTask>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(qmsProductionTask: IQmsProductionTask): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(qmsProductionTask);
        return this.http
            .put<IQmsProductionTask>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<IQmsProductionTask>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IQmsProductionTask[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    protected convertDateFromClient(qmsProductionTask: IQmsProductionTask): IQmsProductionTask {
        const copy: IQmsProductionTask = Object.assign({}, qmsProductionTask, {
            makeTime:
                qmsProductionTask.makeTime != null && qmsProductionTask.makeTime.isValid() ? qmsProductionTask.makeTime.toJSON() : null,
            modifyTime:
                qmsProductionTask.modifyTime != null && qmsProductionTask.modifyTime.isValid()
                    ? qmsProductionTask.modifyTime.toJSON()
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
            res.body.forEach((qmsProductionTask: IQmsProductionTask) => {
                qmsProductionTask.makeTime = qmsProductionTask.makeTime != null ? moment(qmsProductionTask.makeTime) : null;
                qmsProductionTask.modifyTime = qmsProductionTask.modifyTime != null ? moment(qmsProductionTask.modifyTime) : null;
            });
        }
        return res;
    }
}
