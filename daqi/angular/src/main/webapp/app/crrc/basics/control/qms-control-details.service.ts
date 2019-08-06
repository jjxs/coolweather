import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IQmsControlDetails } from 'app/shared/model/qms-control-details.model';

type EntityResponseType = HttpResponse<IQmsControlDetails>;
type EntityArrayResponseType = HttpResponse<IQmsControlDetails[]>;

@Injectable({ providedIn: 'root' })
export class QmsControlDetailsService {
    public resourceUrl = SERVER_API_URL + 'api/qms-control-details';

    constructor(private http: HttpClient) {}

    create(qmsControlDetails: IQmsControlDetails): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(qmsControlDetails);
        return this.http
            .post<IQmsControlDetails>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(qmsControlDetails: IQmsControlDetails): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(qmsControlDetails);
        return this.http
            .put<IQmsControlDetails>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<IQmsControlDetails>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IQmsControlDetails[]>(this.resourceUrl+'/index', { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
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
            .get<IQmsControlDetails[]>(this.resourceUrl+'/sameCheck', { params: options, observe: 'response' })
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

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    protected convertDateFromClient(qmsControlDetails: IQmsControlDetails): IQmsControlDetails {
        const copy: IQmsControlDetails = Object.assign({}, qmsControlDetails, {
            makeTime:
                qmsControlDetails.makeTime != null && qmsControlDetails.makeTime.isValid() ? qmsControlDetails.makeTime.toJSON() : null,
            modifyTime:
                qmsControlDetails.modifyTime != null && qmsControlDetails.modifyTime.isValid()
                    ? qmsControlDetails.modifyTime.toJSON()
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
            res.body.forEach((qmsControlDetails: IQmsControlDetails) => {
                qmsControlDetails.makeTime = qmsControlDetails.makeTime != null ? moment(qmsControlDetails.makeTime) : null;
                qmsControlDetails.modifyTime = qmsControlDetails.modifyTime != null ? moment(qmsControlDetails.modifyTime) : null;
            });
        }
        return res;
    }
}
