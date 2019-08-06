import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IQmsPartsAssemblyRelation } from 'app/shared/model/qms-parts-assembly-relation.model';

type EntityResponseType = HttpResponse<IQmsPartsAssemblyRelation>;
type EntityArrayResponseType = HttpResponse<IQmsPartsAssemblyRelation[]>;

@Injectable({ providedIn: 'root' })
export class QmsPartsAssemblyRelationService {
    public resourceUrl = SERVER_API_URL + 'api/qms-parts-assembly-relations';

    constructor(private http: HttpClient) {}

    create(qmsPartsAssemblyRelation: IQmsPartsAssemblyRelation): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(qmsPartsAssemblyRelation);
        return this.http
            .post<IQmsPartsAssemblyRelation>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(qmsPartsAssemblyRelation: IQmsPartsAssemblyRelation): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(qmsPartsAssemblyRelation);
        return this.http
            .put<IQmsPartsAssemblyRelation>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<IQmsPartsAssemblyRelation>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IQmsPartsAssemblyRelation[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    protected convertDateFromClient(qmsPartsAssemblyRelation: IQmsPartsAssemblyRelation): IQmsPartsAssemblyRelation {
        const copy: IQmsPartsAssemblyRelation = Object.assign({}, qmsPartsAssemblyRelation, {
            makeTime:
                qmsPartsAssemblyRelation.makeTime != null && qmsPartsAssemblyRelation.makeTime.isValid()
                    ? qmsPartsAssemblyRelation.makeTime.toJSON()
                    : null,
            modifyTime:
                qmsPartsAssemblyRelation.modifyTime != null && qmsPartsAssemblyRelation.modifyTime.isValid()
                    ? qmsPartsAssemblyRelation.modifyTime.toJSON()
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
            res.body.forEach((qmsPartsAssemblyRelation: IQmsPartsAssemblyRelation) => {
                qmsPartsAssemblyRelation.makeTime =
                    qmsPartsAssemblyRelation.makeTime != null ? moment(qmsPartsAssemblyRelation.makeTime) : null;
                qmsPartsAssemblyRelation.modifyTime =
                    qmsPartsAssemblyRelation.modifyTime != null ? moment(qmsPartsAssemblyRelation.modifyTime) : null;
            });
        }
        return res;
    }
}
