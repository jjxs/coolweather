import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IQmsProductionInspection } from 'app/shared/model/qms-production-inspection.model';
import { IQmsQualityControlDetailsRelation } from 'app/shared/model/qms-quality-control-details-relation.model';
import { IQmsProductionInspectionValue } from 'app/shared/model/qms-production-inspection-value.model';

type EntityResponseType = HttpResponse<IQmsProductionInspection>;
type EntityArrayResponseType = HttpResponse<IQmsProductionInspection[]>;

@Injectable({ providedIn: 'root' })
export class QmsProductionInspectionSelfService {
    public resourceUrl = SERVER_API_URL + 'api/qms-production-inspections';

    constructor(private http: HttpClient) {}

    create(qmsProductionInspection: IQmsProductionInspection): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(qmsProductionInspection);
        return this.http
            .post<IQmsProductionInspection>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(qmsProductionInspection: IQmsProductionInspection): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(qmsProductionInspection);
        return this.http
            .put<IQmsProductionInspection>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<IQmsProductionInspection>(`api/productProcess/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IQmsProductionInspection[]>('api/productProcess/productProcessFindAll', { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    /**
     * 工序ID，编码 重复Check
     * 
     */
    repeatCheck(req?: any): Observable<any> {
        const options = createRequestOption(req);
        return this.http
            .get<IQmsProductionInspection[]>('api/productProcess' +'/repeatCheck', { params: options, observe: 'response' })
    }

    /**
     * 产品表中判定物料ID和编号查询是否存在数据，不存在则新增一条到产品表中
     */
    serialNumberCheck(req?: any): Observable<any> {
        const options = createRequestOption(req);
        return this.http
            .get<IQmsProductionInspection[]>('api/productProcess' +'/serialNumberCheck', { params: options, observe: 'response' })
    }



    /**
     * 产品表中判定物料ID和编号查询是否存在数据，不存在则新增一条到产品表中
     */
    chackPreProcess(req?: any): Observable<any> {
        const options = createRequestOption(req);
        return this.http
            .get<IQmsProductionInspection[]>('api/productProcess' +'/chackPreProcess', { params: options, observe: 'response' })
    }

    // 质量检验项目
    findQmsQualityControlDetailsByTechId(req?: any): Observable<any> {
        const options = createRequestOption(req);
        return this.http
            .get<IQmsQualityControlDetailsRelation[]>('api/productProcessSelfCheck' +'/control_details', { params: options, observe: 'response' })
    }
    
    // 装配物料
    findAssemblyRelationByTechId(req?: any): Observable<any> {
        const options = createRequestOption(req);
        return this.http
            .get<any[]>('api/productProcessSelfCheck' +'/assembly_relation', { params: options, observe: 'response' })
    }

    // 新增一条到不合格品管理表			
    createQmsUnqualifiedProduct(req?: any): Observable<any> {
        // const options = createRequestOption(req);
        return this.http
            .post<any[]>('api/productProcessSelfCheck' +'/createQmsUnqualifiedProduct', req, {observe: 'response' })
    }

    // 新增一条到不合格品明细管理
    createQmsUnqualifiedProductDetails(req?: any): Observable<any> {
        // const options = createRequestOption(req);
        return this.http
            .post<any[]>('api/productProcessSelfCheck' +'/createQmsUnqualifiedProductDetails', req, {observe: 'response' })
    }

    // 新增多条到结果表
    createQmsProductionInspectionResult(req?: any): Observable<any> {
        return this.http
            .post<any[]>('api/productProcessSelfCheck' +'/createQmsProductionInspectionResult', req, {observe: 'response' })
    }

    // 更新多条到结果表
    updateQmsProductionInspectionResult(req?: any): Observable<any> {
        return this.http
            .post<any[]>('api/productProcessSelfCheck' +'/updateQmsProductionInspectionResult', req, {observe: 'response' })
    }

    // 新增到生产检验结果表
    createQmsProductionInspectionValue(req?: any): Observable<any> {
        return this.http
        .post<IQmsProductionInspectionValue>('api/qms-production-inspection-values', req, {observe: 'response' })
    }

    // 更新生产检验结果表
    updateQmsProductionInspectionValues(req?: any): Observable<any> {
        return this.http
        .post<any>('api/productProcessSelfCheck/updateQmsProductionInspectionValues', req, {observe: 'response' })
    }


    // 编辑区分
    editDistinguish(options?: any): Observable<any> {
        return this.http
            .get<any[]>('api/productProcessSelfCheck/editDistinguish', { params: options, observe: 'response' })
    }

    // 检验装配物料的输入数据是否正确
    checkProductionRelation(req?: any): Observable<any> {
        return this.http
        .post<any>('api/productProcessSelfCheck/checkProductionRelation', req, {observe: 'response' })
    }

    

    protected convertDateFromClient(qmsProductionInspection: IQmsProductionInspection): IQmsProductionInspection {
        const copy: IQmsProductionInspection = Object.assign({}, qmsProductionInspection, {
            makeTime:
                qmsProductionInspection.makeTime != null && qmsProductionInspection.makeTime.isValid()
                    ? qmsProductionInspection.makeTime.toJSON()
                    : null,
            modifyTime:
                qmsProductionInspection.modifyTime != null && qmsProductionInspection.modifyTime.isValid()
                    ? qmsProductionInspection.modifyTime.toJSON()
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
            res.body.forEach((qmsProductionInspection: IQmsProductionInspection) => {
                qmsProductionInspection.makeTime =
                    qmsProductionInspection.makeTime != null ? moment(qmsProductionInspection.makeTime) : null;
                qmsProductionInspection.modifyTime =
                    qmsProductionInspection.modifyTime != null ? moment(qmsProductionInspection.modifyTime) : null;
            });
        }
        return res;
    }
}
