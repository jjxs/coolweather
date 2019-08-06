import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IQmsBom } from 'app/shared/model/qms-bom.model';
import { IQmsMateriel } from 'app/shared/model/qms-materiel.model';
type EntityResponseType = HttpResponse<IQmsBom>;
type EntityArrayResponseType = HttpResponse<IQmsBom[]>;
type EntityResponseTypeMat = HttpResponse<IQmsMateriel>;
@Injectable({ providedIn: 'root' })
export class ProcessInformationsService {
    public resourceUrl = SERVER_API_URL + 'api/process-informations-infos';

    constructor(private http: HttpClient) { }

    create(qmsBom: IQmsBom): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(qmsBom);
        return this.http
            .post<IQmsBom>(this.resourceUrl + '/CreateInfo', copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    /**
     * 数据新增
     * 
     * @param param 
     */
    createInfo(param: any): Observable<any> {

        return this.http.post(this.resourceUrl + '/CreateInfo', param, { observe: 'response' });
    }
    /**
     * 数据更新
     * 
     * @param param 
     */
    updateInfo(param: any): Observable<any> {

        return this.http.post(this.resourceUrl + '/UpdateInfo', param, { observe: 'response' });
    }
    /**
     * 删除质量控制点项
     * 
     * @param params 
     */
    deleteQualityControl(qualityControlDetails: any): Observable<any> {
        return this.http.post(this.resourceUrl + '/deleteQualityControl', qualityControlDetails, { observe: 'response' });
    }
    /**
     * 删除工序装配关系
     * 
     * @param param 
     */
    deletePartsAssembly(param: any): Observable<any> {

        return this.http.post(this.resourceUrl + '/deletePartsAssembly', param, { observe: 'response' });
    }
    /**
     * 数据删除所有
     * 
     * @param id 
     */
    deleteAllInfo(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl + '/deleteAllInfo'}/${id}`, { observe: 'response' });
    }
    update(qmsBom: IQmsBom): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(qmsBom);
        return this.http
            .put<IQmsBom>(this.resourceUrl + '/UpdateInfo', copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<IQmsBom>(`${this.resourceUrl + '/detail'}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }
    /**
     * 取得右边一览数据
     * 
     * @param options 
     */
    rightTableInfo(params: any): Observable<any> {
        // return this.http
        //     .get<IQmsBom[]>(this.resourceUrl + '/detail', { params: options, observe: 'response' })
        //     .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
        return this.http.post(`${this.resourceUrl + '/detail'}`, params);
    }
    /**
     * 取得物料名称
     * 
     * @param id 
     */
    findMaterielName(materielCd: String): Observable<EntityResponseTypeMat> {
        return this.http
            .get<IQmsMateriel>(`${this.resourceUrl + '/materielName'}/${materielCd}`, { observe: 'response' })
            .pipe(map((res: EntityResponseTypeMat) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IQmsBom[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
    /**
     * 
     * @param param 取得树数据
     */
    selectAllInfo(param?: any): Observable<any> {
        return this.http.post(`${this.resourceUrl + '/getAllList'}`, param);
    }
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
    /**
     * 删除树
     * @param id 
     */
    updateCarType(id: any) {
        return this.http.post(`${this.resourceUrl + '/deleteInfo'}/${id}`, { observe: 'response' });
    }
    /**
     * 专检角色下拉数据获取
     */
    getCarTypeInfo(): Observable<any> {
        return this.http.get(this.resourceUrl + '/getAllInspectionRole', {});
    }
    /**
    * 隶属单位下拉数据获取
    */
    getSubordinateUnits(): Observable<any> {
        return this.http.get(this.resourceUrl + '/getAllSubordinateUnits', {});
    }
    /**
    * 工艺下拉数据获取
    */
    getTechnology(params?: any): Observable<any> {
        return this.http.get(this.resourceUrl + '/getAllTechnology', { params });
    }
    /**
    * 作业班组下拉数据获取
    */
    getAllWorkTeam(): Observable<any> {
        return this.http.get(this.resourceUrl + '/getAllWorkTeam', {});
    }
    /**
     * 判断工艺编码是否存在
     * 
     * @param qmsBom 
     */
    selectExistenceInfo(params?: any): Observable<any> {
        return this.http.get(this.resourceUrl + '/selectExistenceInfo', { params });
    }

    /**
     * 判断工艺编码是否存在
     * 
     * @param qmsBom 
     */
    findProcessCd(params?: any): Observable<any> {
        return this.http.get(this.resourceUrl + '/detaileInfo', { params });
    }
    /**
     * 编辑信息获取
     * 
     * @param id 
     */
    getBomEditInfo(id: any): Observable<any> {
        return this.http.get<any>(`${this.resourceUrl + '/editInfo'}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }
    /**
     * 附件信息获取
     * 
     * @param id 
     */
    getEnclosure(id: any): Observable<any> {
        return this.http.get<any>(`${this.resourceUrl + '/getEnclosure'}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }
    getEnclosureList(id: any): Observable<any> {
        return this.http.get<any>(`${this.resourceUrl + '/getEnclosureList'}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }
    /**
    * 默认工艺修改
    */
    updateDefaultProcessInfo(params?: any): Observable<any> {
        return this.http.get(this.resourceUrl + '/updateDefaultProcessInfo', { params });
    }
    /**
    * 复制数据
    */
    copyProcessInfo(params?: any): Observable<any> {
        return this.http.post(this.resourceUrl + '/copyProcessInfo', params);
    }
    protected convertDateFromClient(qmsBom: IQmsBom): IQmsBom {
        const copy: IQmsBom = Object.assign({}, qmsBom, {
            makeTime: qmsBom.makeTime != null && qmsBom.makeTime.isValid() ? qmsBom.makeTime.toJSON() : null,
            modifyTime: qmsBom.modifyTime != null && qmsBom.modifyTime.isValid() ? qmsBom.modifyTime.toJSON() : null
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
            res.body.forEach((qmsBom: IQmsBom) => {
                qmsBom.makeTime = qmsBom.makeTime != null ? moment(qmsBom.makeTime) : null;
                qmsBom.modifyTime = qmsBom.modifyTime != null ? moment(qmsBom.modifyTime) : null;
            });
        }
        return res;
    }
}
