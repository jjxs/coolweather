import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { map } from 'rxjs/operators';
import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IQmsVehicleTypeInfo } from 'app/shared/model/qms-vehicle-type-info.model';

type EntityResponseType = HttpResponse<IQmsVehicleTypeInfo>;
type EntityArrayResponseType = HttpResponse<IQmsVehicleTypeInfo[]>;

@Injectable({ providedIn: 'root' })
export class VehicleTypeSelectionService {
    public resourceUrl = SERVER_API_URL + 'api/qms-vehicle-type-infos';

    constructor(private http: HttpClient) { }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IQmsVehicleTypeInfo[]>(this.resourceUrl + '/getVehicleTypePop', { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    protected convertDateFromClient(qmsVehicleTypeInfo: IQmsVehicleTypeInfo): IQmsVehicleTypeInfo {
        const copy: IQmsVehicleTypeInfo = Object.assign({}, qmsVehicleTypeInfo, {
            makeTime:
                qmsVehicleTypeInfo.makeTime != null && qmsVehicleTypeInfo.makeTime.isValid() ? qmsVehicleTypeInfo.makeTime.toJSON() : null,
            modifyTime:
                qmsVehicleTypeInfo.modifyTime != null && qmsVehicleTypeInfo.modifyTime.isValid()
                    ? qmsVehicleTypeInfo.modifyTime.toJSON()
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
            res.body.forEach((qmsVehicleTypeInfo: IQmsVehicleTypeInfo) => {
                qmsVehicleTypeInfo.makeTime = qmsVehicleTypeInfo.makeTime != null ? moment(qmsVehicleTypeInfo.makeTime) : null;
                qmsVehicleTypeInfo.modifyTime = qmsVehicleTypeInfo.modifyTime != null ? moment(qmsVehicleTypeInfo.modifyTime) : null;
            });
        }
        return res;
    }
}
