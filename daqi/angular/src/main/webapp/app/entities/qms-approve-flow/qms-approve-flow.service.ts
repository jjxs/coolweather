import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IQmsApproveFlow } from 'app/shared/model/qms-approve-flow.model';

type EntityResponseType = HttpResponse<IQmsApproveFlow>;
type EntityArrayResponseType = HttpResponse<IQmsApproveFlow[]>;

@Injectable({ providedIn: 'root' })
export class QmsApproveFlowService {
    public resourceUrl = SERVER_API_URL + 'api/qms-approve-flows';

    constructor(private http: HttpClient) {}

    create(qmsApproveFlow: IQmsApproveFlow): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(qmsApproveFlow);
        return this.http
            .post<IQmsApproveFlow>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(qmsApproveFlow: IQmsApproveFlow): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(qmsApproveFlow);
        return this.http
            .put<IQmsApproveFlow>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<IQmsApproveFlow>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IQmsApproveFlow[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    protected convertDateFromClient(qmsApproveFlow: IQmsApproveFlow): IQmsApproveFlow {
        const copy: IQmsApproveFlow = Object.assign({}, qmsApproveFlow, {
            makeTime: qmsApproveFlow.makeTime != null && qmsApproveFlow.makeTime.isValid() ? qmsApproveFlow.makeTime.toJSON() : null,
            modifyTime: qmsApproveFlow.modifyTime != null && qmsApproveFlow.modifyTime.isValid() ? qmsApproveFlow.modifyTime.toJSON() : null
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
            res.body.forEach((qmsApproveFlow: IQmsApproveFlow) => {
                qmsApproveFlow.makeTime = qmsApproveFlow.makeTime != null ? moment(qmsApproveFlow.makeTime) : null;
                qmsApproveFlow.modifyTime = qmsApproveFlow.modifyTime != null ? moment(qmsApproveFlow.modifyTime) : null;
            });
        }
        return res;
    }
}
