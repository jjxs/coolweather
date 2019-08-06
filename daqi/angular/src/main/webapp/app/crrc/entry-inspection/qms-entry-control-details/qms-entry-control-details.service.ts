import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IQmsEntryControlDetails } from 'app/shared/model/qms-entry-control-details.model';

type EntityResponseType = HttpResponse<IQmsEntryControlDetails>;
type EntityArrayResponseType = HttpResponse<IQmsEntryControlDetails[]>;

@Injectable({ providedIn: 'root' })
export class QmsEntryControlDetailsService {
    public resourceUrl = SERVER_API_URL + 'api/qms-entry-control-details';

    constructor(private http: HttpClient) {}

    create(qmsEntryControlDetails: IQmsEntryControlDetails): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(qmsEntryControlDetails);
        return this.http
            .post<IQmsEntryControlDetails>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    addQmsControlDetails(qmsEntryControlDetails: any, dQmsEntryControlDetails: any, materielId: String): Observable<any> {
        
        console.log(dQmsEntryControlDetails);
        let headers = {
            'content-type': 'application/json'
        }
        let body = {
            'qmsEntryControlDetails': qmsEntryControlDetails,
            'dQmsEntryControlDetails': dQmsEntryControlDetails,
            'materielId': materielId
        }
        return this.http
            .post<any>(this.resourceUrl + '/add', body, { headers: headers, observe: 'response' })
            .pipe(map((res: any) => this.convertDateFromServer(res)));
    }

    update(qmsEntryControlDetails: IQmsEntryControlDetails): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(qmsEntryControlDetails);
        return this.http
            .put<IQmsEntryControlDetails>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<IQmsEntryControlDetails>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IQmsEntryControlDetails[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    findByMaterielId(req?: any): Observable<any> {
        const options = createRequestOption(req);
        return this.http
            .get<any>(this.resourceUrl + '/search', { params: options, observe: 'response' })
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

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    findMateriel(req?: any): Observable<any> {
        const options = createRequestOption(req);
        return this.http
            .get<any>(SERVER_API_URL + 'api/qms-materiel-suppliers' + '/materiel', { params: options})
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
