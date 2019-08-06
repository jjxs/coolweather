import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { map } from 'rxjs/operators';
import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IQmsMateriel } from 'app/shared/model/qms-materiel.model';

type EntityResponseType = HttpResponse<IQmsMateriel>;
type EntityArrayResponseType = HttpResponse<IQmsMateriel[]>;

@Injectable({ providedIn: 'root' })
export class MaterialSelectService {
    public resourceUrl = SERVER_API_URL + 'api/qms-materiels';
    public resourceUrlNew = SERVER_API_URL + 'api';

    constructor(private http: HttpClient) { }

    create(qmsVehicleTypeInfo: IQmsMateriel): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(qmsVehicleTypeInfo);
        return this.http
            .post<IQmsMateriel>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }
    createInfo(qmsVehicleTypeInfo: IQmsMateriel): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(qmsVehicleTypeInfo);
        return this.http
            .post<IQmsMateriel>(this.resourceUrl + '/createInfo', copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(qmsVehicleTypeInfo: IQmsMateriel): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(qmsVehicleTypeInfo);
        return this.http
            .put<IQmsMateriel>(this.resourceUrl + '/updateInfo', copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<IQmsMateriel>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IQmsMateriel[]>(this.resourceUrl , { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    search(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IQmsMateriel[]>(this.resourceUrl + '/search' , { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }
    
    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl + '/deleteInfo'}/${id}`, { observe: 'response' });
    }

    queryVehicleTypeInfo(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IQmsMateriel[]>(SERVER_API_URL + 'api/qms-vehicle-type-info/search', { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    protected convertDateFromClient(qmsVehicleTypeInfo: IQmsMateriel): IQmsMateriel {
        const copy: IQmsMateriel = Object.assign({}, qmsVehicleTypeInfo, {

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
            res.body.forEach((qmsVehicleTypeInfo: IQmsMateriel) => {

            });
        }
        return res;
    }
}
