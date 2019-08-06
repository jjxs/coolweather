import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IQmsEntryControlDetails } from 'app/shared/model/qms-entry-control-details.model';
import { IQmsMateriel } from 'app/shared/model/qms-materiel.model';

type EntityResponseType = HttpResponse<IQmsEntryControlDetails>;
type EntityArrayResponseType = HttpResponse<IQmsEntryControlDetails[]>;
type EntityResponseTypeMat = HttpResponse<IQmsMateriel>;

@Injectable({ providedIn: 'root' })
export class EntryControlDetailsInfoService {
    public resourceUrl = SERVER_API_URL + 'api/entry-control-detailsInfo';

    constructor(private http: HttpClient) { }

    create(qmsEntryControlDetails: IQmsEntryControlDetails): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(qmsEntryControlDetails);
        return this.http
            .post<IQmsEntryControlDetails>(this.resourceUrl + '/createInfo', copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(qmsEntryControlDetails: IQmsEntryControlDetails): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(qmsEntryControlDetails);
        return this.http
            .put<IQmsEntryControlDetails>(this.resourceUrl + '/updateInfo', copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<IQmsEntryControlDetails>(`${this.resourceUrl + '/detailInfo'}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IQmsEntryControlDetails[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<any> {
        return this.http.post(this.resourceUrl + '/deleteInfo',id , { observe: 'response' });
    }
    /**
     * 取得一览数据
     * 
     * @param param 
     */
    getentryConDetailsAll(param?: any): Observable<any> {
        return this.http.post(`${this.resourceUrl + '/getAllInfos'}`, param);
    }
    /**
    * 取得物料名称
    * 
    * @param id 
    */
    findMaterielName(materielCd: any): Observable<EntityResponseTypeMat> {
        return this.http
            .get<IQmsMateriel>(`${this.resourceUrl + '/materielName'}/${materielCd}`, { observe: 'response' })
            .pipe(map((res: EntityResponseTypeMat) => this.convertDateFromServer(res)));
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
    protected convertDateFromClient(qmsEntryControlDetails: IQmsEntryControlDetails): IQmsEntryControlDetails {
        const copy: IQmsEntryControlDetails = Object.assign({}, qmsEntryControlDetails, {
            makeTime:
                qmsEntryControlDetails.makeTime != null && qmsEntryControlDetails.makeTime.isValid()
                    ? qmsEntryControlDetails.makeTime.toJSON()
                    : null,
            modifyTime:
                qmsEntryControlDetails.modifyTime != null && qmsEntryControlDetails.modifyTime.isValid()
                    ? qmsEntryControlDetails.modifyTime.toJSON()
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
            res.body.forEach((qmsEntryControlDetails: IQmsEntryControlDetails) => {
                qmsEntryControlDetails.makeTime = qmsEntryControlDetails.makeTime != null ? moment(qmsEntryControlDetails.makeTime) : null;
                qmsEntryControlDetails.modifyTime =
                    qmsEntryControlDetails.modifyTime != null ? moment(qmsEntryControlDetails.modifyTime) : null;
            });
        }
        return res;
    }
}
