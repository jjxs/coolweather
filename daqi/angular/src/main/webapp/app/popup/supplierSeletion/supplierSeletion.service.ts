import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { map } from 'rxjs/operators';
import { IQmsVehicleTypeInfo } from 'app/shared/model/qms-vehicle-type-info.model';
import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IQmsMaterialProcedureSelection } from 'app/shared/model/qms-material-procedure-selection';
import { IQmsSupplier } from 'app/shared/model/qms-supplier.model';

type EntityResponseType = HttpResponse<IQmsSupplier>;
type EntityArrayResponseType = HttpResponse<IQmsSupplier[]>;

@Injectable({ providedIn: 'root' })
export class SupplierSelectService {
    public resourceUrl = SERVER_API_URL + 'api/qms-suppliers';
    public resourceUrlNew = SERVER_API_URL + 'api';

    constructor(private http: HttpClient) { }

    create(qmsVehicleTypeInfo: IQmsSupplier): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(qmsVehicleTypeInfo);
        return this.http
            .post<IQmsSupplier>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }
    createInfo(qmsVehicleTypeInfo: IQmsSupplier): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(qmsVehicleTypeInfo);
        return this.http
            .post<IQmsSupplier>(this.resourceUrl + '/createInfo', copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(qmsVehicleTypeInfo: IQmsSupplier): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(qmsVehicleTypeInfo);
        return this.http
            .put<IQmsSupplier>(this.resourceUrl + '/updateInfo', copy, { observe: 'response' })
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
            .get<IQmsSupplier[]>(this.resourceUrl + '/indexInfo', { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }
    
    search(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IQmsSupplier[]>(this.resourceUrl + '/search', { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }
    /**
     * 取得车型拉下数据
     * 
     */
    getAllVicTypeInfos(): Observable<HttpResponse<IQmsVehicleTypeInfo[]>> {
        return this.http.get<IQmsVehicleTypeInfo[]>(this.resourceUrlNew + '/getVehicleTypeInfo', { observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }
    /**
     * BOM工艺表数据获取
     * 
     * @param param 
     */
    getHandManAll(param?: any): Observable<any> {
        return this.http.post(`${this.resourceUrlNew + '/getHandManAll'}`, param);
    }
    /**
     * BOM工艺表数据获取总条数
     * 
     * @param param 
     */
    getHandNumberAll(param?: any): Observable<any> {
        return this.http.post(`${this.resourceUrlNew + '/getAllNumberInfo'}`, param);
    }
    
    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl + '/deleteInfo'}/${id}`, { observe: 'response' });
    }

    queryVehicleTypeInfo(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IQmsSupplier[]>(SERVER_API_URL + 'api/qms-vehicle-type-info/search', { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    protected convertDateFromClient(qmsVehicleTypeInfo: IQmsSupplier): IQmsSupplier {
        const copy: IQmsSupplier = Object.assign({}, qmsVehicleTypeInfo, {

        });
        return copy;
    }

    protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
        if (res.body) {

        }
        return res;
    }

    protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        if (res.body) {
            res.body.forEach((qmsVehicleTypeInfo: IQmsSupplier) => {

            });
        }
        return res;
    }
}
