import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IQmsMateriel } from 'app/shared/model/qms-materiel.model';

type EntityResponseType = HttpResponse<IQmsMateriel>;
type EntityArrayResponseType = HttpResponse<IQmsMateriel[]>;

@Injectable({ providedIn: 'root' })
export class QmsMaterielService {
    public resourceUrl = SERVER_API_URL + 'api/qms-materiels';

    constructor(private http: HttpClient) {}

    create(qmsMateriel: IQmsMateriel): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(qmsMateriel);
        return this.http
            .post<IQmsMateriel>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(qmsMateriel: IQmsMateriel): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(qmsMateriel);
        return this.http
            .put<IQmsMateriel>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<IQmsMateriel>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IQmsMateriel[]>(this.resourceUrl+'/index', { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

     //查询单位分类信息表
     getUnitPopupList(params?: any): Observable<any> {
        return this.http.get(SERVER_API_URL + 'api/qms-materiels/unitPopup', {params})
    }
    //查询单位分类信息表keyup
    getUniteKeyUpList(params?: any): Observable<any>{
        return this.http.get(SERVER_API_URL + 'api/qms-materiels/unitPopupKeyUp', {params})
    }
    //查询单角色信息表
    getRolePopupList(params?: any): Observable<any>{
        return this.http.get(SERVER_API_URL + 'api/qms-materiels/rolePopup', {params})
    }
    //查询单角色信息表keyup
    getRoleKeyUpList(params?: any): Observable<any>{
        return this.http.get(SERVER_API_URL + 'api/qms-materiels/rolePopupKeyUp', {params})
    }
    //物料分类信息表
    getMarPopupList(params?: any): Observable<any>{
        return this.http.get(SERVER_API_URL + 'api/qms-materiels/marPopup', {params})
    }
    //物料分类信息表keyup
    getMarKeyUpList(params?: any): Observable<any>{
        return this.http.get(SERVER_API_URL + 'api/qms-materiels/marPopupKeyUp', {params})
    }
    //下拉框共通方法，从master表中取得
    getMasterList(params?: any): Observable<any> {
        return this.http.get(SERVER_API_URL + 'api/qms-materiels/master', {params})
    }
    //供应商
    getSupplierList(params?: any): Observable<any> {
        return this.http.get(SERVER_API_URL + 'api/qms-materiels/supplier', {params})
    }
     // 单位列表
     getUnitList(params?: any): Observable<any> {
        return this.http.get(SERVER_API_URL + 'api/qms-materiels/unit', {params})
    }

    // 角色列表
    getRoleList(params?: any): Observable<any> {
        return this.http.get(SERVER_API_URL + 'api/qms-materiels/role', {params})
    }

    //物料分类表
    getMaterielTypeList(params?: any): Observable<any> {
        return this.http.get(SERVER_API_URL + 'api/qms-materiels/materielType', {params})
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    /**
     * 重复主键Check
     * 
     * @param 
     * 
     */
    sameCheck(req?: any): Observable<any> {
        const options = createRequestOption(req);
        return this.http
            .get<IQmsMateriel[]>(this.resourceUrl+'/sameCheck', { params: options, observe: 'response' })
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
            .get<IQmsMateriel[]>(this.resourceUrl+'/deleteCheck', { params: options, observe: 'response' })
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


    protected convertDateFromClient(qmsMateriel: IQmsMateriel): IQmsMateriel {
        const copy: IQmsMateriel = Object.assign({}, qmsMateriel, {
            makeTime: qmsMateriel.makeTime != null && qmsMateriel.makeTime.isValid() ? qmsMateriel.makeTime.toJSON() : null,
            modifyTime: qmsMateriel.modifyTime != null && qmsMateriel.modifyTime.isValid() ? qmsMateriel.modifyTime.toJSON() : null
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
            res.body.forEach((qmsMateriel: IQmsMateriel) => {
                qmsMateriel.makeTime = qmsMateriel.makeTime != null ? moment(qmsMateriel.makeTime) : null;
                qmsMateriel.modifyTime = qmsMateriel.modifyTime != null ? moment(qmsMateriel.modifyTime) : null;
            });
        }
        return res;
    }
}
