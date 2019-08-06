import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IQmsMaterielDetailsPopup } from 'app/shared/model/QmsMaterielDetailsPopup.model';
import { IQmsMateriel } from 'app/shared/model/qms-materiel.model';
type EntityResponseTypeq = HttpResponse<IQmsMateriel>;
type EntityResponseType = HttpResponse<IQmsMaterielDetailsPopup>;
type EntityArrayResponseType = HttpResponse<IQmsMaterielDetailsPopup[]>;

@Injectable({ providedIn: 'root' })
export class MaterielDetailsSelectionService {
    public resourceUrl = SERVER_API_URL + 'api/qms-materiel-details';

    constructor(private http: HttpClient) { }

    create(qmsMaterielType: IQmsMaterielDetailsPopup): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(qmsMaterielType);
        return this.http
            .post<IQmsMaterielDetailsPopup>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(qmsMaterielType: IQmsMaterielDetailsPopup): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(qmsMaterielType);
        return this.http
            .put<IQmsMaterielDetailsPopup>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: any): Observable<EntityResponseTypeq> {
        return this.http
            .get<IQmsMateriel>(`${this.resourceUrl + '/New'}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseTypeq) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IQmsMaterielDetailsPopup[]>(this.resourceUrl + '/popupData', { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    protected convertDateFromClient(qmsMaterielType: IQmsMaterielDetailsPopup): IQmsMaterielDetailsPopup {
        const copy: IQmsMaterielDetailsPopup = Object.assign({}, qmsMaterielType, {
            makeTime: qmsMaterielType.makeTime != null && qmsMaterielType.makeTime.isValid() ? qmsMaterielType.makeTime.toJSON() : null,
            modifyTime:
                qmsMaterielType.modifyTime != null && qmsMaterielType.modifyTime.isValid() ? qmsMaterielType.modifyTime.toJSON() : null
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
            res.body.forEach((qmsMaterielType: IQmsMaterielDetailsPopup) => {
                qmsMaterielType.makeTime = qmsMaterielType.makeTime != null ? moment(qmsMaterielType.makeTime) : null;
                qmsMaterielType.modifyTime = qmsMaterielType.modifyTime != null ? moment(qmsMaterielType.modifyTime) : null;
            });
        }
        return res;
    }
}
