import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { map } from 'rxjs/operators';
import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IQmsProcess } from 'app/shared/model/qms-process.model';

type EntityResponseType = HttpResponse<IQmsProcess>;
type EntityArrayResponseType = HttpResponse<IQmsProcess[]>;

@Injectable({ providedIn: 'root' })
export class RbacRoleSelectionService {
    public resourceUrl = SERVER_API_URL + 'api/rbac-roles';

    constructor(private http: HttpClient) { }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IRbacRole[]>(this.resourceUrl + '/getRoleInfo/index', { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
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
