import { Component, OnInit } from '@angular/core';
import { JhiEventManager, JhiParseLinks, JhiAlertService } from 'ng-jhipster';
import { HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { QmsMateriel, IQmsMateriel } from 'app/shared/model/qms-materiel.model';
import { LocalStorageService } from 'ngx-webstorage';
import { Message } from 'primeng/components/common/api';
import { MaterialSelectService } from './materialSelection.service';
import { Principal } from 'app/core';
/**
 * 商品列表popup
 */
@Component({
    selector: 'jhi-materialselection',
    templateUrl: './materialSelection.component.html',
    styleUrls: ['materialSelection.scss']
})
export class MaterialSelectionInspectComponent implements OnInit {
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
    // 物料编码检索
    materielCd = '';
    // 物料名称检索
    materielName = '';
    // 供应商条件检索
    supplier = '';
    // 图号条件检索
    figureNumber = '';
    // 型号条件检索
    type = '';
    // 工艺名称条件检索
    processName = '';
    // 供应商id
    supplierId = '';
    // 初始化参数：一览返回数据
    qmsMateriels: QmsMateriel[];
    materielSelect: any;
    constructor(
        private materialSelectService: MaterialSelectService,
        public activeModal: NgbActiveModal,
        private localStorage: LocalStorageService,
        private jhiAlertService: JhiAlertService,
        private principal: Principal,
        private parseLinks: JhiParseLinks,
    ) {
    }
    loadAll() {
        this.materialSelectService
            .search({
                materielCd: this.materielCd,
                materielName: this.materielName,
                supplier: this.supplier,
                figureNumber: this.figureNumber,
                supplierId: this.supplierId,
                type: this.type,
                page: this.page - 1,
                size: this.itemsPerPage,
                sort: this.sort()
            })
            .subscribe(
                (res: HttpResponse<IQmsMateriel[]>) => this.paginateQmsMateriel(res.body, res.headers),
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }
    // 清空检索条件
    emptyInfo() {
        this.materielCd = '';
        this.materielName = '';
        this.supplier = '';
        this.figureNumber = '';
        this.type = '';
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
        if (this.materielSelect === null) {
            // 错误消息提示
            this.msgs.push({ severity: 'error', summary: 'error', detail: '请选择数据' });
        } else {
            this.localStorage.store('qmsMaterielSelect', this.materielSelect);
            // 保存返回到上一页
            this.activeModal.close(this.materielSelect);
        }
    }

    sort() {
        const result = [this.predicate + ',' + (this.reverse ? 'asc' : 'desc')];
        if (this.predicate !== 'id') {
            result.push('id');
        }
        return result;
    }

    private paginateQmsMateriel(data: any, headers: HttpHeaders) {
        this.links = this.parseLinks.parse(headers.get('link'));
        this.totalItems = parseInt(headers.get('X-Total-Count'), 10);
        this.queryCount = this.totalItems;
        this.qmsMateriels = data;
        if (data.length > 0) {
            this.materielSelect = data[0];
        }
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
