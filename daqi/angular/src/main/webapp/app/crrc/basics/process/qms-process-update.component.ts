import { Component, OnInit } from '@angular/core';
import { ActivatedRoute ,Router} from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { Message } from 'primeng/components/common/api';
import { IQmsProcess } from 'app/shared/model/qms-process.model';
import { QmsProcessService } from './qms-process.service';

@Component({
    selector: 'jhi-qms-process-update',
    templateUrl: './qms-process-update.component.html',
    styleUrls: [
        './process.scss'
    ]
})
export class QmsProcessUpdateComponent implements OnInit {
    qmsProcess: IQmsProcess;
    isSaving: boolean;
    makeTime: string;
    modifyTime: string;
    flag: any;
    flagStatus: any;
    msgs: Message[] = [];

    constructor(private qmsProcessService: QmsProcessService, private activatedRoute: ActivatedRoute,private router: Router) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ qmsProcess }) => {
            this.qmsProcess = qmsProcess;
            // 如果是添加页面，则flag为0
            if(this.qmsProcess.processCd==null){
                this.flag = 0;
                this.flagStatus = '0';
                this.qmsProcess.flagStatus = '0';
            }else{
                this.flag = 1;
                this.flagStatus = '0';
            }
            this.makeTime = this.qmsProcess.makeTime != null ? this.qmsProcess.makeTime.format(DATE_TIME_FORMAT) : null;
            this.modifyTime = this.qmsProcess.modifyTime != null ? this.qmsProcess.modifyTime.format(DATE_TIME_FORMAT) : null;
        });
    }

    previousState() {
        this.router.navigate(['/process']);
    }

    save() {
        //保存的时候如果编码为空，则报错误信息
        if (this.qmsProcess.processCd == "" || this.qmsProcess.processCd == null) {
            this.msgs.push({ severity: 'error', summary: '提示', detail: '工序编码不能为空' });
        }else{
            //工序编码重复的Check
            if(this.qmsProcess.id !== undefined){
                //从更新进入
                this.subscribeToSaveResponse(this.qmsProcessService.update(this.qmsProcess));
            }else{
                 //从新增进入
                //供应商编码重复的Check
                this.qmsProcessService.sameCheck({ samecheck: this.qmsProcess.processCd }).subscribe(data => {
                    if (data.body === 1) {
                        this.msgs.push({ severity: 'error', summary: '提示', detail: '该工序已存在!' });
                    } else {
                        this.isSaving = true;
                        this.qmsProcess.makeTime = this.makeTime != null ? moment(this.makeTime, DATE_TIME_FORMAT) : null;
                        this.qmsProcess.modifyTime = this.modifyTime != null ? moment(this.modifyTime, DATE_TIME_FORMAT) : null;
                        this.subscribeToSaveResponse(this.qmsProcessService.create(this.qmsProcess));
                    }
                });
            }
        }
        
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IQmsProcess>>) {
        result.subscribe((res: HttpResponse<IQmsProcess>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }
}
