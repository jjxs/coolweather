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
            .get<IRbacRole[]>(this.resourceUrl + '/getRoleInfo/index', { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    protected convertDateFromClient(rbacRole: IRbacRole): IRbacRole {
        const copy: IRbacRole = Object.assign({}, rbacRole, {
            insDateTime: rbacRole.insDateTime != null && rbacRole.insDateTime.isValid() ? rbacRole.insDateTime.toJSON() : null,
            updDateTime: rbacRole.updDateTime != null && rbacRole.updDateTime.isValid() ? rbacRole.updDateTime.toJSON() : null,
            delDateTime: rbacRole.delDateTime != null && rbacRole.delDateTime.isValid() ? rbacRole.delDateTime.toJSON() : null,
            triggerDateTime:
                rbacRole.triggerDateTime != null && rbacRole.triggerDateTime.isValid() ? rbacRole.triggerDateTime.toJSON() : null
        });
        return copy;
    }

    protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
        if (res.body) {
            res.body.insDateTime = res.body.insDateTime != null ? moment(res.body.insDateTime) : null;
            res.body.updDateTime = res.body.updDateTime != null ? moment(res.body.updDateTime) : null;
            res.body.delDateTime = res.body.delDateTime != null ? moment(res.body.delDateTime) : null;
            res.body.triggerDateTime = res.body.triggerDateTime != null ? moment(res.body.triggerDateTime) : null;
        }
        return res;
    }

    protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        if (res.body) {
            res.body.forEach((rbacRole: IRbacRole) => {
                rbacRole.insDateTime = rbacRole.insDateTime != null ? moment(rbacRole.insDateTime) : null;
                rbacRole.updDateTime = rbacRole.updDateTime != null ? moment(rbacRole.updDateTime) : null;
                rbacRole.delDateTime = rbacRole.delDateTime != null ? moment(rbacRole.delDateTime) : null;
                rbacRole.triggerDateTime = rbacRole.triggerDateTime != null ? moment(rbacRole.triggerDateTime) : null;
            });
        }
        return res;
    }
}
