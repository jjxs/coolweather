import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IQmsEquipment } from 'app/shared/model/qms-equipment.model';

type EntityResponseType = HttpResponse<IQmsEquipment>;
type EntityArrayResponseType = HttpResponse<IQmsEquipment[]>;

@Injectable({ providedIn: 'root' })
export class QmsEquipmentService {
    public resourceUrl = SERVER_API_URL + 'api/qms-equipments';

    constructor(private http: HttpClient) {}

    create(qmsEquipment: IQmsEquipment): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(qmsEquipment);
        return this.http
            .post<IQmsEquipment>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(qmsEquipment: IQmsEquipment): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(qmsEquipment);
        return this.http
            .put<IQmsEquipment>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<IQmsEquipment>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IQmsEquipment[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    protected convertDateFromClient(qmsEquipment: IQmsEquipment): IQmsEquipment {
        const copy: IQmsEquipment = Object.assign({}, qmsEquipment, {
            makeTime: qmsEquipment.makeTime != null && qmsEquipment.makeTime.isValid() ? qmsEquipment.makeTime.toJSON() : null,
            modifyTime: qmsEquipment.modifyTime != null && qmsEquipment.modifyTime.isValid() ? qmsEquipment.modifyTime.toJSON() : null
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
            res.body.forEach((qmsEquipment: IQmsEquipment) => {
                qmsEquipment.makeTime = qmsEquipment.makeTime != null ? moment(qmsEquipment.makeTime) : null;
                qmsEquipment.modifyTime = qmsEquipment.modifyTime != null ? moment(qmsEquipment.modifyTime) : null;
            });
        }
        return res;
    }
}
