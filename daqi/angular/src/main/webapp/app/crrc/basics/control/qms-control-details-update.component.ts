import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { Message } from 'primeng/components/common/api';
import { IQmsControlDetails } from 'app/shared/model/qms-control-details.model';
import { QmsControlDetailsService } from './qms-control-details.service';

@Component({
    selector: 'jhi-qms-control-details-update',
    templateUrl: './qms-control-details-update.component.html',
    styleUrls: [
        './control.scss'
    ]
})
export class QmsControlDetailsUpdateComponent implements OnInit {
    qmsControlDetails: IQmsControlDetails;
    isSaving: boolean;
    makeTime: string;
    modifyTime: string;
    flag: any;
    flagStatus: any;
    msgs: Message[] = [];
    //结果区分

    result = [
        { label: '数字', value: '0' },
        { label: '下拉', value: '1' }
    ];

    constructor(private qmsControlDetailsService: QmsControlDetailsService, private activatedRoute: ActivatedRoute, private router: Router, ) { }

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ qmsControlDetails }) => {
            this.qmsControlDetails = qmsControlDetails;
            // 如果是添加页面，则flag为0
            if (this.qmsControlDetails.inspectionCd == null) {
                this.flag = 0;
                this.flagStatus = '0';
                this.qmsControlDetails.flagStatus = '0';
            } else {
                this.flag = 1;
                this.flagStatus = '0';
            }
            this.makeTime = this.qmsControlDetails.makeTime != null ? this.qmsControlDetails.makeTime.format(DATE_TIME_FORMAT) : null;
            this.modifyTime = this.qmsControlDetails.modifyTime != null ? this.qmsControlDetails.modifyTime.format(DATE_TIME_FORMAT) : null;
        });
    }

    previousState() {
        this.router.navigate(['/control']);
    }

    save() {

        if (this.qmsControlDetails.inspectionResultDiff == null || this.qmsControlDetails.inspectionResultDiff == "") {
            this.msgs.push({ severity: 'error', summary: '提示', detail: '结果区分不能为空!' });
        } else {
            if (this.qmsControlDetails.id !== undefined) {
                //从更新进入
                this.subscribeToSaveResponse(this.qmsControlDetailsService.update(this.qmsControlDetails));
            } else {
                //从新增进入
                //物料编码重复的Check
                this.qmsControlDetailsService.sameCheck({ samecheck: this.qmsControlDetails.inspectionCd }).subscribe(data => {
                    if (data.body === 1) {
                        this.msgs.push({ severity: 'error', summary: '提示', detail: '该检验项目已存在!' });
                    } else {
                        this.isSaving = true;
                        this.qmsControlDetails.makeTime = this.makeTime != null ? moment(this.makeTime, DATE_TIME_FORMAT) : null;
                        this.qmsControlDetails.modifyTime = this.modifyTime != null ? moment(this.modifyTime, DATE_TIME_FORMAT) : null;
                        this.subscribeToSaveResponse(this.qmsControlDetailsService.create(this.qmsControlDetails));


                    }
                });
            }
        }

    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IQmsControlDetails>>) {
        result.subscribe((res: HttpResponse<IQmsControlDetails>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }
}
