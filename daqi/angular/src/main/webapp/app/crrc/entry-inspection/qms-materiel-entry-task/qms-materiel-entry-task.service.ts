import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IQmsMaterielEntry } from 'app/shared/model/qms-materiel-entry.model';

type EntityResponseType = HttpResponse<IQmsMaterielEntry>;
type EntityArrayResponseType = HttpResponse<IQmsMaterielEntry[]>;

@Injectable({ providedIn: 'root' })
export class QmsMaterielEntryService {
    public resourceUrl = SERVER_API_URL + 'api/qms-materiel-entries';

    constructor(private http: HttpClient) {}

    create(qmsMaterielEntry: IQmsMaterielEntry): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(qmsMaterielEntry);
        return this.http
            .post<IQmsMaterielEntry>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(qmsMaterielEntry: IQmsMaterielEntry): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(qmsMaterielEntry);
        return this.http
            .put<IQmsMaterielEntry>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<IQmsMaterielEntry>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IQmsMaterielEntry[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    search(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<any>(this.resourceUrl + '/search', { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    send(req?: any): Observable<any> {
        const options = createRequestOption(req);
        return this.http
            .get<any>(this.resourceUrl + '/send', { params: options, observe: 'response' })
    }

    deleteFlag(req?: any): Observable<any> {
        const options = createRequestOption(req);
        return this.http
            .get<any>(this.resourceUrl + '/deletFlag', { params: options, observe: 'response' })
    }

    editHeaderLoad(req?: any): Observable<any> {
        const options = createRequestOption(req);
        return this.http
            .get<any>(this.resourceUrl + '/editHeaderSearch', { params: options, observe: 'response' })
    }

    editDetailsLoad(req?: any): Observable<any> {
        const options = createRequestOption(req);
        return this.http
            .get<any>(this.resourceUrl + '/editDetailsSearch', { params: options, observe: 'response' })
    }

    enclosureLoad(req?: any): Observable<any> {
        const options = createRequestOption(req);
        return this.http
            .get<any>(this.resourceUrl + '/enclosureLoad', { params: options, observe: 'response' })
    }

    save(params): Observable<any> {
        let headers = {
            'content-type': 'application/json'
        } 
        return this.http
            .post<any>(this.resourceUrl + '/add', params, { headers: headers, observe: 'response' })
            .pipe(map((res: any) => this.convertDateFromServer(res)));
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
        return this.http.delete<any>(`${this.resourceUrl}/${id}/delete`, { observe: 'response' });
    }

    protected convertDateFromClient(qmsMaterielEntry: IQmsMaterielEntry): IQmsMaterielEntry {
        const copy: IQmsMaterielEntry = Object.assign({}, qmsMaterielEntry, {
            makeTime: qmsMaterielEntry.makeTime != null && qmsMaterielEntry.makeTime.isValid() ? qmsMaterielEntry.makeTime.toJSON() : null,
            modifyTime:
                qmsMaterielEntry.modifyTime != null && qmsMaterielEntry.modifyTime.isValid() ? qmsMaterielEntry.modifyTime.toJSON() : null
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
            res.body.forEach((qmsMaterielEntry: IQmsMaterielEntry) => {
                qmsMaterielEntry.makeTime = qmsMaterielEntry.makeTime != null ? moment(qmsMaterielEntry.makeTime) : null;
                qmsMaterielEntry.modifyTime = qmsMaterielEntry.modifyTime != null ? moment(qmsMaterielEntry.modifyTime) : null;
            });
        }
        return res;
    }
}
