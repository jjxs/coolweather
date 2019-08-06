import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IQmsProductionInspection } from 'app/shared/model/qms-production-inspection.model';

type EntityResponseType = HttpResponse<IQmsProductionInspection>;
type EntityArrayResponseType = HttpResponse<IQmsProductionInspection[]>;

@Injectable({ providedIn: 'root' })
export class QmsProductionInspectionService {
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

    // 批量任务生成Check
    allCheck(req?: any): Observable<any> {
        return this.http
        .post<any>('api/productProcess/allCheck', req, {observe: 'response' })
    }

    /**
     * 工序ID，编码 重复Check
     */
    // repeatCheck(req?: any): Observable<any> {
    //     const options = createRequestOption(req);
    //     return this.http
    //         .get<IQmsProductionInspection[]>('api/productProcess' +'/repeatCheck', { params: options, observe: 'response' })
    // }

    /**
     * 产品表中判定物料ID和编号查询是否存在数据，不存在则新增一条到产品表中
     */
    serialNumberCheck(req?: any): Observable<any> {
        const options = createRequestOption(req);
        return this.http
            .get<IQmsProductionInspection[]>('api/productProcess' +'/serialNumberCheck', { params: options, observe: 'response' })
    }

    //批量任务生成
    doBatchGeneration(req?: any): Observable<any> {
        // const copy = this.convertDateFromClient(qmsProductionInspection);
        return this.http
            .post<any>('api/productProcess/doBatchGeneration', req, { observe: 'response' })
            // .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    // 删除check
    deleteChack(req?: any): Observable<any> {
        return this.http
            .get<IQmsProductionInspection[]>('api/productProcess' +'/deleteChack', { params: req, observe: 'response' })
    }

    // 焦点离开物料Check
    getMateriel(req?: any): Observable<any> {
        return this.http
            .get<any>('api/qms-materiel-suppliers/materiel', { params: req, observe: 'response' })
    }

    // 焦点离开编号Check
    getProduct(req?: any): Observable<any> {
        return this.http
            .get<any>('api/qms-materiel-suppliers/materiel', { params: req, observe: 'response' })
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
