import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { IQmsVehicleTypeClass } from 'app/shared/model/qms-vehicle-type-class.model';
import { QmsVehicleTypeClassService } from './qms-vehicle-type-class.service';
import { Message } from 'primeng/components/common/api';

@Component({
    selector: 'jhi-qms-vehicle-type-class-update',
    templateUrl: './qms-vehicle-type-class-update.component.html',
    styleUrls: [
        './vehicle-type.scss'
    ]
})
export class QmsVehicleTypeClassUpdateComponent implements OnInit {
    qmsVehicleTypeClass: IQmsVehicleTypeClass;
    isSaving: boolean;
    makeTime: string;
    modifyTime: string;
    msgs: Message[] = [];
    flag: any;
    flagStatus: any;
    constructor(private qmsVehicleTypeClassService: QmsVehicleTypeClassService, private activatedRoute: ActivatedRoute, private router: Router) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ qmsVehicleTypeClass }) => {
            this.qmsVehicleTypeClass = qmsVehicleTypeClass;

            if(this.qmsVehicleTypeClass.vehicleClass==null){
                this.flag = 0;
                this.flagStatus = '0';
                this.qmsVehicleTypeClass.flagStatus = '0';
            }else{
                this.flag = 1;
                this.flagStatus = '0';
            }
            this.makeTime = this.qmsVehicleTypeClass.makeTime != null ? this.qmsVehicleTypeClass.makeTime.format(DATE_TIME_FORMAT) : null;
            this.modifyTime =
                this.qmsVehicleTypeClass.modifyTime != null ? this.qmsVehicleTypeClass.modifyTime.format(DATE_TIME_FORMAT) : null;
        });
    }

    previousState() {
        this.router.navigate(['/vehicle-type-class']);
    }

    save() {


        if(this.qmsVehicleTypeClass.id !== undefined){
            //从更新进入
            this.subscribeToSaveResponse(this.qmsVehicleTypeClassService.update(this.qmsVehicleTypeClass));
        }else{
             //从新增进入
            //供应商编码重复的Check
            this.qmsVehicleTypeClassService.sameCheck({ samecheck: this.qmsUnit.unitCd }).subscribe(data => {
                if (data.body === 1) {
                    this.msgs.push({ severity: 'error', summary: '提示', detail: '该单位已存在!' });
                } else {
                    this.isSaving = true;
                    this.qmsUnit.makeTime = this.makeTime != null ? moment(this.makeTime, DATE_TIME_FORMAT) : null;
                    this.qmsUnit.modifyTime = this.modifyTime != null ? moment(this.modifyTime, DATE_TIME_FORMAT) : null;
                    this.subscribeToSaveResponse(this.qmsUnitService.create(this.qmsUnit));
                }
            });
        }

        this.qmsVehicleTypeClass.makeTime = this.makeTime != null ? moment(this.makeTime, DATE_TIME_FORMAT) : null;
        this.qmsVehicleTypeClass.modifyTime = this.modifyTime != null ? moment(this.modifyTime, DATE_TIME_FORMAT) : null;
        if (this.qmsVehicleTypeClass.id !== undefined) {
            this.subscribeToSaveResponse(this.qmsVehicleTypeClassService.update(this.qmsVehicleTypeClass));
        } else {
            this.subscribeToSaveResponse(this.qmsVehicleTypeClassService.create(this.qmsVehicleTypeClass));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IQmsVehicleTypeClass>>) {
        result.subscribe((res: HttpResponse<IQmsVehicleTypeClass>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }
}
