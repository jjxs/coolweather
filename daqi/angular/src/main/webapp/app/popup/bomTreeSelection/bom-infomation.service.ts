import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IQmsBom } from 'app/shared/model/qms-bom.model';
import { IQmsMateriel } from 'app/shared/model/qms-materiel.model';
import { IQmsVehicleTypeInfo } from 'app/shared/model/qms-vehicle-type-info.model';
type EntityResponseType = HttpResponse<IQmsBom>;
type EntityArrayResponseType = HttpResponse<IQmsBom[]>;
type EntityResponseTypeClass = HttpResponse<IQmsVehicleTypeInfo>;
type EntityResponseTypeMat = HttpResponse<IQmsMateriel>;
@Injectable({ providedIn: 'root' })
export class BomInformationService {
    public resourceUrl = SERVER_API_URL + 'api/qms-bom-infos';

    constructor(private http: HttpClient) { }

    create(qmsBom: IQmsBom): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(qmsBom);
        return this.http
            .post<IQmsBom>(this.resourceUrl + '/CreateInfo', copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(qmsBom: IQmsBom): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(qmsBom);
        return this.http
            .put<IQmsBom>(this.resourceUrl + '/UpdateInfo', copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: any): Observable<EntityResponseType> {
        return this.http
            .get<IQmsBom>(`${this.resourceUrl + '/detail'}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
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
    /**
    * 
    * @param id 焦点离开车型分类信息
    */
    findCarType(id: any): Observable<EntityResponseTypeClass> {
        return this.http
            .get<IQmsVehicleTypeInfo>(`${this.resourceUrl + '/carType'}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseTypeClass) => this.convertDateFromServer(res)));
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
     * 车型数据获取
     */
    getCarTypeInfo(): Observable<any> {
        return this.http.get(this.resourceUrl + '/getAllCarType', {});
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
