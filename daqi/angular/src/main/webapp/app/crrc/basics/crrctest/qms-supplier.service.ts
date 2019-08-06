import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IQmsSupplier } from 'app/shared/model/qms-supplier.model';

type EntityResponseType = HttpResponse<IQmsSupplier>;
type EntityArrayResponseType = HttpResponse<IQmsSupplier[]>;

@Injectable({ providedIn: 'root' })
export class QmsSupplierService {
    public resourceUrl = SERVER_API_URL + 'api/qms-suppliers';

    constructor(private http: HttpClient) {}

    create(qmsSupplier: IQmsSupplier): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(qmsSupplier);
        return this.http
            .post<IQmsSupplier>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(qmsSupplier: IQmsSupplier): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(qmsSupplier);
        return this.http
            .put<IQmsSupplier>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<IQmsSupplier>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IQmsSupplier[]>(this.resourceUrl+'/index', { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
    //查询供应商分类信息表
    getSupplierList(params?: any): Observable<any> {
        return this.http.get(SERVER_API_URL + 'api/qms-suppliers/supplier', {params})
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
            .get<IQmsSupplier[]>(this.resourceUrl+'/deleteCheck', { params: options, observe: 'response' })
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
            .get<IQmsSupplier[]>(this.resourceUrl+'/sameCheck', { params: options, observe: 'response' })
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

    //根据供应商分类编码查相应的供应商分类信息
    getsuppkierClassList(params?: any): Observable<any> {
        return this.http.get(SERVER_API_URL + 'api/qms-suppliers/getsuppkierClassList', {params})
    }




    protected convertDateFromClient(qmsSupplier: IQmsSupplier): IQmsSupplier {
        const copy: IQmsSupplier = Object.assign({}, qmsSupplier, {
            makeTime: qmsSupplier.makeTime != null && qmsSupplier.makeTime.isValid() ? qmsSupplier.makeTime.toJSON() : null,
            modifyTime: qmsSupplier.modifyTime != null && qmsSupplier.modifyTime.isValid() ? qmsSupplier.modifyTime.toJSON() : null
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
            res.body.forEach((qmsSupplier: IQmsSupplier) => {
                qmsSupplier.makeTime = qmsSupplier.makeTime != null ? moment(qmsSupplier.makeTime) : null;
                qmsSupplier.modifyTime = qmsSupplier.modifyTime != null ? moment(qmsSupplier.modifyTime) : null;
            });
        }
        return res;
    }
}
