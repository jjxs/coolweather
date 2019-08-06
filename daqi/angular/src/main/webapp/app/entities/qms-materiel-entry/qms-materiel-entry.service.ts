import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IQmsMaterielEntry } from 'app/shared/model/qms-materiel-entry.model';

type EntityResponseType = HttpResponse<IQmsMaterielEntry>;
type EntityArrayResponseType = HttpResponse<IQmsMaterielEntry[]>;

@Injectable({ providedIn: 'root' })
export class QmsMaterielEntryService {
    public resourceUrl = SERVER_API_URL + 'api/qms-materiel-entries';

    constructor(private http: HttpClient) {}

    create(qmsMaterielEntry: IQmsMaterielEntry): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(qmsMaterielEntry);
        return this.http
            .post<IQmsMaterielEntry>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(qmsMaterielEntry: IQmsMaterielEntry): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(qmsMaterielEntry);
        return this.http
            .put<IQmsMaterielEntry>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<IQmsMaterielEntry>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IQmsMaterielEntry[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    protected convertDateFromClient(qmsMaterielEntry: IQmsMaterielEntry): IQmsMaterielEntry {
        const copy: IQmsMaterielEntry = Object.assign({}, qmsMaterielEntry, {
            entryDate:
                qmsMaterielEntry.entryDate != null && qmsMaterielEntry.entryDate.isValid() ? qmsMaterielEntry.entryDate.toJSON() : null,
            inspectionTime:
                qmsMaterielEntry.inspectionTime != null && qmsMaterielEntry.inspectionTime.isValid()
                    ? qmsMaterielEntry.inspectionTime.toJSON()
                    : null,
            inspectionCompletedTime:
                qmsMaterielEntry.inspectionCompletedTime != null && qmsMaterielEntry.inspectionCompletedTime.isValid()
                    ? qmsMaterielEntry.inspectionCompletedTime.toJSON()
                    : null,
            makeTime: qmsMaterielEntry.makeTime != null && qmsMaterielEntry.makeTime.isValid() ? qmsMaterielEntry.makeTime.toJSON() : null,
            modifyTime:
                qmsMaterielEntry.modifyTime != null && qmsMaterielEntry.modifyTime.isValid() ? qmsMaterielEntry.modifyTime.toJSON() : null
        });
        return copy;
    }

    protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
        if (res.body) {
            res.body.entryDate = res.body.entryDate != null ? moment(res.body.entryDate) : null;
            res.body.inspectionTime = res.body.inspectionTime != null ? moment(res.body.inspectionTime) : null;
            res.body.inspectionCompletedTime = res.body.inspectionCompletedTime != null ? moment(res.body.inspectionCompletedTime) : null;
            res.body.makeTime = res.body.makeTime != null ? moment(res.body.makeTime) : null;
            res.body.modifyTime = res.body.modifyTime != null ? moment(res.body.modifyTime) : null;
        }
        return res;
    }

    protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        if (res.body) {
            res.body.forEach((qmsMaterielEntry: IQmsMaterielEntry) => {
                qmsMaterielEntry.entryDate = qmsMaterielEntry.entryDate != null ? moment(qmsMaterielEntry.entryDate) : null;
                qmsMaterielEntry.inspectionTime = qmsMaterielEntry.inspectionTime != null ? moment(qmsMaterielEntry.inspectionTime) : null;
                qmsMaterielEntry.inspectionCompletedTime =
                    qmsMaterielEntry.inspectionCompletedTime != null ? moment(qmsMaterielEntry.inspectionCompletedTime) : null;
                qmsMaterielEntry.makeTime = qmsMaterielEntry.makeTime != null ? moment(qmsMaterielEntry.makeTime) : null;
                qmsMaterielEntry.modifyTime = qmsMaterielEntry.modifyTime != null ? moment(qmsMaterielEntry.modifyTime) : null;
            });
        }
        return res;
    }
}
