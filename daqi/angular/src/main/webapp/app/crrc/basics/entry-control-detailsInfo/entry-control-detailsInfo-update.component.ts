import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Message } from 'primeng/components/common/api';
import { IQmsMateriel } from 'app/shared/model/qms-materiel.model';

import { IQmsEntryControlDetails } from 'app/shared/model/qms-entry-control-details.model';
import { EntryControlDetailsInfoService } from './entry-control-detailsInfo.service';

@Component({
    selector: 'jhi-entry-control-detailsInfo-update',
    templateUrl: './entry-control-detailsInfo-update.component.html',
    styleUrls: ['./entry-control-detailsInfo.scss']
})
export class EntryControlDetailsInfoUpdateComponent implements OnInit {
    qmsEntryControlDetails: IQmsEntryControlDetails;
    isSaving: boolean;
    makeTime: string;
    modifyTime: string;
    materielName: string = '';
    // 消息初始化
    msgs: Message[] = [];
    constructor(private entryControlDetailsInfoService: EntryControlDetailsInfoService, private activatedRoute: ActivatedRoute, private router: Router) { }

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ qmsEntryControlDetails }) => {
            this.qmsEntryControlDetails = qmsEntryControlDetails;
            // 取得物料名称
            this.getMaterielNameInfo();
            // this.makeTime =
            //     this.qmsEntryControlDetails.makeTime != null ? this.qmsEntryControlDetails.makeTime.format(DATE_TIME_FORMAT) : null;
            // this.modifyTime =
            //     this.qmsEntryControlDetails.modifyTime != null ? this.qmsEntryControlDetails.modifyTime.format(DATE_TIME_FORMAT) : null;
        });
    }

    previousState() {
        // window.history.back();
        this.router.navigate(['/entry-control-detailsInfo']);
    }
    /**
     * 物料编码焦点离开取得物料名称
     */
    getMaterielNameInfo() {
        if (this.qmsEntryControlDetails.materielId !== null && this.qmsEntryControlDetails.materielId !== undefined) {
            // 取得选中数据
            this.entryControlDetailsInfoService.findMaterielName(this.qmsEntryControlDetails.materielId)
                .subscribe((materielNameInfoBack: HttpResponse<IQmsMateriel>) => {
                    if (materielNameInfoBack.body.id !== null) {
                        this.materielName = materielNameInfoBack.body.materielName;
                    } else {
                        this.msgs.push({ severity: 'error', summary: '提示', detail: '物料编码不存在' });
                    }
                });
        }

    }
    save() {
        this.isSaving = true;
        // this.qmsEntryControlDetails.makeTime = this.makeTime != null ? moment(this.makeTime, DATE_TIME_FORMAT) : null;
        // this.qmsEntryControlDetails.modifyTime = this.modifyTime != null ? moment(this.modifyTime, DATE_TIME_FORMAT) : null;
        if (this.qmsEntryControlDetails.id !== undefined) {
            this.subscribeToSaveResponse(this.entryControlDetailsInfoService.update(this.qmsEntryControlDetails));
        } else {
            this.subscribeToSaveResponse(this.entryControlDetailsInfoService.create(this.qmsEntryControlDetails));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IQmsEntryControlDetails>>) {
        result.subscribe(
            (res: HttpResponse<IQmsEntryControlDetails>) => this.onSaveSuccess(),
            (res: HttpErrorResponse) => this.onSaveError(res)
        );
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError(res) {
        this.isSaving = false;
        if (res.error.title === 'DataAlreadyExists') {
            this.msgs.push({ severity: 'error', summary: '提示', detail: '该物料编码下的检查项目已存在。' });
        }
    }
}
