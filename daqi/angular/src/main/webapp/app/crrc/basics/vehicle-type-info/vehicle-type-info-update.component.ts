import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IQmsVehicleTypeInfo } from 'app/shared/model/qms-vehicle-type-info.model';
import { VehicleTypeInfoService } from './vehicle-type-info.service';
import { Message } from 'primeng/components/common/api';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { VehicleTypeClassSelectionComponent } from '../../../popup/vehicleTypeClassSelection'
@Component({
    selector: 'jhi-vehicle-type-info-update',
    templateUrl: './vehicle-type-info-update.component.html',
    styleUrls: ['vehicle-type-info.css']
})
export class VehicleTypeInfoUpdateComponent implements OnInit {
    qmsVehicleTypeInfo: IQmsVehicleTypeInfo;
    isSaving: boolean;
    makeTime: string;
    modifyTime: string;
    vehicleClass: any = '';
    vehicleClassName: any = '';
    // 消息初始化
    msgs: Message[] = [];

    constructor(private qmsVehicleTypeInfoService: VehicleTypeInfoService, private modalsService: NgbModal, private activatedRoute: ActivatedRoute, private router: Router) { }

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ qmsVehicleTypeInfo }) => {
            this.qmsVehicleTypeInfo = qmsVehicleTypeInfo;
            this.qmsVehicleTypeInfoService.findClass(this.qmsVehicleTypeInfo.vehicleClassId).subscribe(datas => {
                this.vehicleClass = datas.body.vehicleClass;
                this.vehicleClassName = datas.body.vehicleClassName;
            })
            //  this.makeTime = this.qmsVehicleTypeInfo.makeTime != null ? this.qmsVehicleTypeInfo.makeTime.format(DATE_TIME_FORMAT) : null;
            //  this.modifyTime =
            //      this.qmsVehicleTypeInfo.modifyTime != null ? this.qmsVehicleTypeInfo.modifyTime.format(DATE_TIME_FORMAT) : null;
        });
    }

    previousState() {
        // window.history.back();
        this.router.navigate(['/vehicle-type-info']);
    }
    /**
     * 焦点离开
     */
    getVehicleClassNameInfo() {
        this.qmsVehicleTypeInfoService.findCarType(this.vehicleClass).subscribe(datas => {
            // 判断是否取到值
            if (datas.body.id !== null) {
                this.qmsVehicleTypeInfo.vehicleClassId = datas.body.id;
                this.vehicleClass = datas.body.vehicleClass;
                this.vehicleClassName = datas.body.vehicleClassName;
            } else {
                this.msgs.push({ severity: 'error', summary: '提示', detail: '车型分类不存在' });
            }

        })
    }
    save() {
        this.msgs = [];
        this.isSaving = true;
        if (this.qmsVehicleTypeInfo.vehicleType === '') {
            this.msgs.push({ severity: 'error', summary: '提示', detail: '车型不能为空' });
            this.isSaving = false;
        }
        if (this.qmsVehicleTypeInfo.vehicleTypeName === '') {
            this.msgs.push({ severity: 'error', summary: '提示', detail: '车型名称不能为空' });
            this.isSaving = false;
        }
        //  this.qmsVehicleTypeInfo.makeTime = this.makeTime != null ? moment(this.makeTime) : null;
        //  this.qmsVehicleTypeInfo.modifyTime = this.modifyTime != null ? moment(this.modifyTime) : null;
        if (this.qmsVehicleTypeInfo.id !== undefined) {
            this.subscribeToSaveResponse(this.qmsVehicleTypeInfoService.update(this.qmsVehicleTypeInfo));
        } else {
            if (this.qmsVehicleTypeInfo.remark === undefined) {
                this.qmsVehicleTypeInfo.remark = '';
            }
            this.subscribeToSaveResponse(this.qmsVehicleTypeInfoService.createInfo(this.qmsVehicleTypeInfo));
        }
    }

    /**
     * 新增和修改返回信息
     *
     * @param result
     * @author DL0733
    */
    private subscribeToSaveResponse(result: Observable<HttpResponse<IQmsVehicleTypeInfo>>) {
        result.subscribe((res: HttpResponse<IQmsVehicleTypeInfo>) =>
            this.onSaveSuccess(), (res: HttpErrorResponse) =>
                this.onSaveError(res)
        );
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    // 跳转Popup
    typeVehicleClass() {
        this.modalsService.open(VehicleTypeClassSelectionComponent as Component, { backdrop: 'static', keyboard: false, size: 'lg' }).result.then(
            (result) => {
                if (result !== undefined) {
                    // alert(JSON.stringify(result))
                    this.qmsVehicleTypeInfo.vehicleClassId = result.id;
                    this.vehicleClass = result.vehicleClass;
                    this.vehicleClassName = result.vehicleClassName;
                }
            }
        );
    }

    private onSaveError(res) {
        this.isSaving = false;
        if (res.error.title === 'dataModified') {
            this.msgs.push({ severity: 'error', summary: '提示', detail: '该数据已被修改' });

        } else if (res.error.title === 'dataDoesNotExis') {
            this.msgs.push({ severity: 'error', summary: '提示', detail: '该数据不存在' });

        } else if (res.error.title === 'DataAlreadyID') {
            this.msgs.push({ severity: 'error', summary: '提示', detail: '该车型已存在' });
        }
    }
}
