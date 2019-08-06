import { Component, OnInit } from '@angular/core';
import { JhiParseLinks, JhiAlertService } from 'ng-jhipster';
import { HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { LocalStorageService } from 'ngx-webstorage';
import { Message } from 'primeng/components/common/api';
import { Principal } from 'app/core';
import { SupplierSelectService } from './supplierSeletion.service';
/**
 * 商品列表popup
 */
@Component({
    selector: 'jhi-materialprocedureselection',
    templateUrl: './supplierSeletion.component.html',
    styleUrls: ['supplierSeletion.scss']
})
export class SupplierSelectionComponent implements OnInit {
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
    // 供应商编码检索
    supplierCd = '';
    // 供应商名称检索
    supplierName = '';
    // 初始化参数：一览返回数据
    qmsSuppliers = [];
    supplierSelect: any;
    constructor(
        private supplierSelectService: SupplierSelectService,
        public activeModal: NgbActiveModal,
        private localStorage: LocalStorageService,
        private jhiAlertService: JhiAlertService,
        private principal: Principal,
        private parseLinks: JhiParseLinks,
    ) {
    }
    loadAll() {
        this.supplierSelectService
            .search({
                supplierCd: this.supplierCd,
                supplierName: this.supplierName,
                page: this.page - 1,
                size: this.itemsPerPage,
                sort: this.sort()
            })
            .subscribe(
                (res: HttpResponse<any>) => this.paginateQmsSupplier(res.body, res.headers),
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }
    // 清空检索条件
    emptyInfo() {
        this.supplierCd = '';
        this.supplierName = '';
        this.loadAll();
    }

    loadCarsLazy(event) {
        this.page = event.first / this.itemsPerPage + 1;
        this.loadAll();
    }

    ngOnInit() {
        this.page = 1;
        this.queryCount = 0;
        this.itemsPerPage = 6;
        this.predicate = 'id';
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
        if (this.supplierSelect === null) {
            // 错误消息提示
            this.msgs.push({ severity: 'error', summary: 'error', detail: '请选择数据' });
        } else {
            this.localStorage.store('qmssupplierSelect', this.supplierSelect);
            // 保存返回到上一页
            this.activeModal.close(this.supplierSelect);
        }
    }

    sort() {
        const result = [this.predicate + ',' + (this.reverse ? 'asc' : 'desc')];
        if (this.predicate !== 'id') {
            result.push('id');
        }
        return result;
    }

    private paginateQmsSupplier(data: any, headers: HttpHeaders) {
        this.links = this.parseLinks.parse(headers.get('link'));
        this.totalItems = parseInt(headers.get('X-Total-Count'), 10);
        this.queryCount = this.totalItems;
        this.qmsSuppliers = data;
        if (data.length > 0) {
            this.supplierSelect = data[0];
        }
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
