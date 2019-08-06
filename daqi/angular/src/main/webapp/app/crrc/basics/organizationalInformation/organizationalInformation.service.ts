import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IQmsOrganizationInfo } from 'app/shared/model/qms-organization-info.model';
import { TreeNode } from 'primeng/api';
type EntityResponseType = HttpResponse<IQmsOrganizationInfo>;
type EntityArrayResponseType = HttpResponse<IQmsOrganizationInfo[]>;

@Injectable({ providedIn: 'root' })
export class OrganizationInfoService {
    public resourceUrl = SERVER_API_URL + 'api/qms-organization-infos';

    constructor(private http: HttpClient) { }

    create(qmsOrganizationInfo: IQmsOrganizationInfo): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(qmsOrganizationInfo);
        return this.http
            .post<IQmsOrganizationInfo>(this.resourceUrl + '/CreateInfo', copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(qmsOrganizationInfo: IQmsOrganizationInfo): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(qmsOrganizationInfo);
        return this.http
            .put<IQmsOrganizationInfo>(this.resourceUrl + '/UpdateInfo', copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<IQmsOrganizationInfo>(`${this.resourceUrl + '/detail'}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    // query(req?: any): Observable<HttpResponse<TreeNode[]>> {
    //     const options = createRequestOption(req);
    //     return this.http
    //         .get<TreeNode[]>(this.resourceUrl + '/getAllList', { params: options, observe: 'response' })
    //         .pipe(map((res: HttpResponse<TreeNode[]>) => this.convertDateArrayFromServer(res)));
    // }
    query(param?: any): Observable<any> {
        return this.http.post(`${this.resourceUrl + '/getAllList'}`, param);
    }
    // 测试数据
    getFilesystem() {
        return this.http.get<TreeNode>('content/dateInfo.json')
            .toPromise()
            .then(res => <TreeNode[]>res.data);
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
    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    protected convertDateFromClient(qmsOrganizationInfo: IQmsOrganizationInfo): IQmsOrganizationInfo {
        const copy: IQmsOrganizationInfo = Object.assign({}, qmsOrganizationInfo, {
            makeTime:
                qmsOrganizationInfo.makeTime != null && qmsOrganizationInfo.makeTime.isValid()
                    ? qmsOrganizationInfo.makeTime.toJSON()
                    : null,
            modifyTime:
                qmsOrganizationInfo.modifyTime != null && qmsOrganizationInfo.modifyTime.isValid()
                    ? qmsOrganizationInfo.modifyTime.toJSON()
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

    protected convertDateArrayFromServer(res: HttpResponse<TreeNode[]>): HttpResponse<TreeNode[]> {
        if (res.body) {
            // res.body.forEach((qmsOrganizationInfo: TreeNode) => {
            //     qmsOrganizationInfo.makeTime = qmsOrganizationInfo.makeTime != null ? moment(qmsOrganizationInfo.makeTime) : null;
            //     qmsOrganizationInfo.modifyTime = qmsOrganizationInfo.modifyTime != null ? moment(qmsOrganizationInfo.modifyTime) : null;
            // });
        }
        return res;
    }
}
