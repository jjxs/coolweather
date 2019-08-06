import { Component, OnInit } from '@angular/core';
import { JhiParseLinks, JhiAlertService } from 'ng-jhipster';
import { HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { IQmsMateriel } from 'app/shared/model/qms-materiel.model';
import { LocalStorageService } from 'ngx-webstorage';
import { Message } from 'primeng/components/common/api';
import { InspectionSelectService } from './entryInspectionSelection.service';
import { Principal } from 'app/core';
/**
 * 商品列表popup
 */
@Component({
    selector: 'jhi-entry-inspection-selection',
    templateUrl: './entryInspectionSelection.component.html',
    styleUrls: ['entryInspectionSelection.scss']
})
export class EntryInspectionSelectionComponent implements OnInit {
    currentAccount: any;
    links: any;
    totalItems: any;
    // message信息
    msgs: Message[] = [];
    // 错误信息
    error: any;
    // 正确信息
    success: any;
    // 第几页
    page: any;
    // 商品总数
    queryCount: any;
    // 每页显示条数
    itemsPerPage: any;
    // 排序字段
    predicate: any;
    // 顺序还是倒序
    reverse: boolean;
    // 项目编号检索
    itemCd = '';
    // 检查项目检索
    inspectionItem = '';
    // 初始化参数：一览返回数据
    qmsInspections: any;
    InspectionSelect = [];
    // 翻页不清空已选择内容
    flag = '1';
    constructor(
        private inspectionSelectService: InspectionSelectService,
        public activeModal: NgbActiveModal,
        private localStorage: LocalStorageService,
        private jhiAlertService: JhiAlertService,
        private principal: Principal,
        private parseLinks: JhiParseLinks,
    ) {
        
    }
    loadAll() {

        if(this.flag === '1') {
            this.InspectionSelect = [];
        }
        this.inspectionSelectService
            .search({
                itemCd: this.itemCd,
                inspectionItem: this.inspectionItem,
                page: this.page - 1,
                size: this.itemsPerPage,
                sort: this.sort()
            })
            .subscribe(
                (res: HttpResponse<IQmsMateriel[]>) => this.paginateQmsControlDetails(res.body, res.headers),
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }
    // 清空检索条件
    emptyInfo() {
        this.itemCd = '';
        this.inspectionItem = '';
        this.loadAll();
    }

    loadCarsLazy(event) {
        this.flag = '2'; 
        this.page = event.first / this.itemsPerPage + 1;
        this.loadAll();
        this.flag = '1';
    }

    ngOnInit() {
        this.page = 1;
        this.queryCount = 0;
        this.itemsPerPage = 6;
        this.predicate = 'id';
        this.reverse = true;
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
    }

    /**
     * 返回
     * @param record
     */
    goBack(record?: any) {
        this.activeModal.close(record);
    }

    /**
     * 确认
     */
    selected() {
        // 错误消息赋空
        this.msgs = [];
        // 判断是否选择数据
        if (this.InspectionSelect.length === 0) {
            // 错误消息提示
            this.msgs.push({ severity: 'error', summary: 'error', detail: '请选择数据' });
        } else {
            this.localStorage.store('InspectionSelect', this.InspectionSelect);
            // 保存返回到上一页
            this.activeModal.close(this.InspectionSelect);
        }
    }

    sort() {
        const result = [this.predicate + ',' + (this.reverse ? 'asc' : 'desc')];
        if (this.predicate !== 'id') {
            result.push('id');
        }
        return result;
    }

    private paginateQmsControlDetails(data: any, headers: HttpHeaders) {
        this.links = this.parseLinks.parse(headers.get('link'));
        this.totalItems = parseInt(headers.get('X-Total-Count'), 10);
        this.queryCount = this.totalItems;
        this.qmsInspections = data;
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
