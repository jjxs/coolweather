import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { IQmsSupplierClass } from 'app/shared/model/qms-supplier-class.model';
import { QmsSupplierClassService } from './qms-supplier-class.service';

@Component({
    selector: 'jhi-qms-supplier-class-update',
    templateUrl: './qms-supplier-class-update.component.html',
    styleUrls: [
        './supplierClass.scss'
    ]
})
export class QmsSupplierClassUpdateComponent implements OnInit {
    qmsSupplierClass: IQmsSupplierClass;
    isSaving: boolean;
    makeTime: string;
    modifyTime: string;
    flag: any;
    flagStatus: any;

    constructor(private qmsSupplierClassService: QmsSupplierClassService, private activatedRoute: ActivatedRoute,private router:Router) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ qmsSupplierClass }) => {
            this.qmsSupplierClass = qmsSupplierClass;
            // 如果是添加页面，则flag为0
            if(this.qmsSupplierClass.suppkierClass==null){
                this.flag = 0;
                this.flagStatus = '0';
                this.qmsSupplierClass.flagStatus = '0';
            }else{
                this.flag = 1;
                this.flagStatus = '0';
            }
            this.makeTime = this.qmsSupplierClass.makeTime != null ? this.qmsSupplierClass.makeTime.format(DATE_TIME_FORMAT) : null;
            this.modifyTime = this.qmsSupplierClass.modifyTime != null ? this.qmsSupplierClass.modifyTime.format(DATE_TIME_FORMAT) : null;
        });
    }

    previousState() {
        this.router.navigate(['/supplierClass']);
    }

    save() {
        this.isSaving = true;
        this.qmsSupplierClass.makeTime = this.makeTime != null ? moment(this.makeTime, DATE_TIME_FORMAT) : null;
        this.qmsSupplierClass.modifyTime = this.modifyTime != null ? moment(this.modifyTime, DATE_TIME_FORMAT) : null;
        if (this.qmsSupplierClass.id !== undefined) {
            this.subscribeToSaveResponse(this.qmsSupplierClassService.update(this.qmsSupplierClass));
        } else {
            this.subscribeToSaveResponse(this.qmsSupplierClassService.create(this.qmsSupplierClass));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IQmsSupplierClass>>) {
        result.subscribe((res: HttpResponse<IQmsSupplierClass>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }
}
