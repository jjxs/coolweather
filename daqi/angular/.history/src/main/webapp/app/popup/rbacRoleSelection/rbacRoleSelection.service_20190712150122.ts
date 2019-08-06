import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { map } from 'rxjs/operators';
import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IRbacRole } from 'app/shared/model/rbac-role.model';

type EntityResponseType = HttpResponse<IRbacRole>;
type EntityArrayResponseType = HttpResponse<IRbacRole[]>;

@Injectable({ providedIn: 'root' })
export class VehicleTypeClassSelectionService {
    public resourceUrl = SERVER_API_URL + 'api/rbac-roles';

    constructor(private http: HttpClient) { }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<IRbacRole>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IRbacRole[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    protected convertDateFromClient(qmsVehicleTypeClass: IQmsVehicleTypeClass): IQmsVehicleTypeClass {
        const copy: IQmsVehicleTypeClass = Object.assign({}, qmsVehicleTypeClass, {
            makeTime:
                qmsVehicleTypeClass.makeTime != null && qmsVehicleTypeClass.makeTime.isValid()
                    ? qmsVehicleTypeClass.makeTime.toJSON()
                    : null,
            modifyTime:
                qmsVehicleTypeClass.modifyTime != null && qmsVehicleTypeClass.modifyTime.isValid()
                    ? qmsVehicleTypeClass.modifyTime.toJSON()
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
            res.body.forEach((qmsVehicleTypeClass: IQmsVehicleTypeClass) => {
                qmsVehicleTypeClass.makeTime = qmsVehicleTypeClass.makeTime != null ? moment(qmsVehicleTypeClass.makeTime) : null;
                qmsVehicleTypeClass.modifyTime = qmsVehicleTypeClass.modifyTime != null ? moment(qmsVehicleTypeClass.modifyTime) : null;
            });
        }
        return res;
    }
}
