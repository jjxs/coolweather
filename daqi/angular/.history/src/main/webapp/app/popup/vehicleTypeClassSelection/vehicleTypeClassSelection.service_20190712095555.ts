import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { map } from 'rxjs/operators';
import { IQmsVehicleTypeInfo } from 'app/shared/model/qms-vehicle-type-info.model';
import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IQmsMaterialProcedureSelection } from 'app/shared/model/qms-material-procedure-selection';

type EntityResponseType = HttpResponse<IQmsMaterialProcedureSelection>;
type EntityArrayResponseType = HttpResponse<IQmsMaterialProcedureSelection[]>;

@Injectable({ providedIn: 'root' })
export class VehicleTypeClassSelectionService {
    public resourceUrl = SERVER_API_URL + 'api/qms-vehicle-type-classes';

    constructor(private http: HttpClient) { }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IQmsVehicleTypeClass[]>(this.resourceUrl + '/index', { params: options, observe: 'response' })
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
            .get<IQmsMaterialProcedureSelection[]>(SERVER_API_URL + 'api/qms-vehicle-type-info/search', { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    protected convertDateFromClient(qmsVehicleTypeInfo: IQmsMaterialProcedureSelection): IQmsMaterialProcedureSelection {
        const copy: IQmsMaterialProcedureSelection = Object.assign({}, qmsVehicleTypeInfo, {

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
            res.body.forEach((qmsVehicleTypeInfo: IQmsMaterialProcedureSelection) => {

            });
        }
        return res;
    }
}
