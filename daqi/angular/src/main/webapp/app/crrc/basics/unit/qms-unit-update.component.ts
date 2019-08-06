import { Component, OnInit } from '@angular/core';
import { ActivatedRoute ,Router} from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { Message } from 'primeng/components/common/api';
import { IQmsUnit } from 'app/shared/model/qms-unit.model';
import { QmsUnitService } from './qms-unit.service';

@Component({
    selector: 'jhi-qms-unit-update',
    templateUrl: './qms-unit-update.component.html',
    styleUrls: [
        './unit.scss'
    ]
})
export class QmsUnitUpdateComponent implements OnInit {
    qmsUnit: IQmsUnit;
    isSaving: boolean;
    makeTime: string;
    modifyTime: string;
    flag: any;
    flagStatus: any;
    msgs: Message[] = [];

    constructor(private qmsUnitService: QmsUnitService, private activatedRoute: ActivatedRoute,private router: Router) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ qmsUnit }) => {
            this.qmsUnit = qmsUnit;
            // 如果是添加页面，则flag为0
            if(this.qmsUnit.unitCd==null){
                this.flag = 0;
                this.flagStatus = '0';
                this.qmsUnit.flagStatus = '0';
            }else{
                this.flag = 1;
                this.flagStatus = '0';
            }
            this.makeTime = this.qmsUnit.makeTime != null ? this.qmsUnit.makeTime.format(DATE_TIME_FORMAT) : null;
            this.modifyTime = this.qmsUnit.modifyTime != null ? this.qmsUnit.modifyTime.format(DATE_TIME_FORMAT) : null;
        });
    }

    previousState() {
        this.router.navigate(['/unit']);
    }

    save() {
        if(this.qmsUnit.id !== undefined){
            //从更新进入
            this.subscribeToSaveResponse(this.qmsUnitService.update(this.qmsUnit));
        }else{
             //从新增进入
            //供应商编码重复的Check
            this.qmsUnitService.sameCheck({ samecheck: this.qmsUnit.unitCd }).subscribe(data => {
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
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IQmsUnit>>) {
        result.subscribe((res: HttpResponse<IQmsUnit>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }
}
