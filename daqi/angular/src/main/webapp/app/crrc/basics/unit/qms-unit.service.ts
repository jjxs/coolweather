import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse , HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IQmsUnit } from 'app/shared/model/qms-unit.model';

type EntityResponseType = HttpResponse<IQmsUnit>;
type EntityArrayResponseType = HttpResponse<IQmsUnit[]>;

@Injectable({ providedIn: 'root' })
export class QmsUnitService {
    public resourceUrl = SERVER_API_URL + 'api/qms-units';

    constructor(private http: HttpClient) {}

    create(qmsUnit: IQmsUnit): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(qmsUnit);
        return this.http
            .post<IQmsUnit>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(qmsUnit: IQmsUnit): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(qmsUnit);
        return this.http
            .put<IQmsUnit>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<IQmsUnit>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IQmsUnit[]>(this.resourceUrl+'/index', { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

     /**
     * 重复主键Check
     * 
     * @param supplierCd
     * 
     */
    sameCheck(req?: any): Observable<any> {
        const options = createRequestOption(req);
        return this.http
            .get<IQmsUnit[]>(this.resourceUrl+'/sameCheck', { params: options, observe: 'response' })
    }

    /**
     * 删除check
     * 
     * @param supplierCd
     * 
     */
    deleteCheck(req?: any): Observable<any> {
        // return this.http.get(this.resourceUrl + '/deleteCheck', rbacRole , { observe: 'response' });
        const options = createRequestOption(req);
        return this.http
            .get<IQmsUnit[]>(this.resourceUrl+'/deleteCheck', { params: options, observe: 'response' })
    }

     //Excel导入
    /**
     * 上传excel文件
     */
    importExcelFile(url: string, file: FileList, req?: any): Observable<any> {
        const options = createRequestOption(req);

        // 设置数据
        const formData: FormData = new FormData();
        formData.append('files', file.item(0));
        // 设置头部信息
        const head = new HttpHeaders({ 'Cache-Control': 'no-cache' });

        return this.http.post(this.resourceUrl + url, formData, { headers: head, reportProgress: true, params: options });
    }

    protected convertDateFromClient(qmsUnit: IQmsUnit): IQmsUnit {
        const copy: IQmsUnit = Object.assign({}, qmsUnit, {
            makeTime: qmsUnit.makeTime != null && qmsUnit.makeTime.isValid() ? qmsUnit.makeTime.toJSON() : null,
            modifyTime: qmsUnit.modifyTime != null && qmsUnit.modifyTime.isValid() ? qmsUnit.modifyTime.toJSON() : null
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
            res.body.forEach((qmsUnit: IQmsUnit) => {
                qmsUnit.makeTime = qmsUnit.makeTime != null ? moment(qmsUnit.makeTime) : null;
                qmsUnit.modifyTime = qmsUnit.modifyTime != null ? moment(qmsUnit.modifyTime) : null;
            });
        }
        return res;
    }
}
