import { Component, OnInit } from '@angular/core';
import { JhiEventManager, JhiParseLinks, JhiAlertService } from 'ng-jhipster';
import { HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { QmsMateriel, IQmsMateriel } from 'app/shared/model/qms-materiel.model';
import { LocalStorageService } from 'ngx-webstorage';
import { Message } from 'primeng/components/common/api';
import { UserSelectService } from './userSelect.service';
import { Principal } from 'app/core';
/**
 * 商品列表popup
 */
@Component({
    selector: 'jhi-user-select',
    templateUrl: './userSelect.component.html',
    styleUrls: ['userSelect.scss']
})
export class UserSelectComponent implements OnInit {
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
    // 用户名
    name = '';
    // 用户姓名
    userName = '';
    // 用户选择
    userSelect: any;
    qmsUsers: any;
    constructor(
        private userSelectService: UserSelectService,
        public activeModal: NgbActiveModal,
        private localStorage: LocalStorageService,
        private jhiAlertService: JhiAlertService,
        private principal: Principal,
        private parseLinks: JhiParseLinks,
    ) {
    }
    loadAll() {
        this.userSelectService
            .queryRbacUsers({
                searchUsersMes: this.name,
                userCode: this.userName,
                page: this.page - 1,
                size: this.itemsPerPage,
                sort: this.sort()
            })
            .subscribe(
                (res: HttpResponse<IQmsMateriel[]>) => this.paginateQmsUser(res.body, res.headers),
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }
    // 清空检索条件
    emptyInfo() {
        this.userName = '';
        this.name = '';
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
        if (this.userSelect === null) {
            // 错误消息提示
            this.msgs.push({ severity: 'error', summary: 'error', detail: '请选择数据' });
        } else {
            this.localStorage.store('qmsMaterielSelect', this.userSelect);
            // 保存返回到上一页
            this.activeModal.close(this.userSelect);
        }
    }

    sort() {
        const result = [this.predicate + ',' + (this.reverse ? 'asc' : 'desc')];
        if (this.predicate !== 'id') {
            result.push('id');
        }
        return result;
    }

    private paginateQmsUser(data: any, headers: HttpHeaders) {
        this.links = this.parseLinks.parse(headers.get('link'));
        this.totalItems = parseInt(headers.get('X-Total-Count'), 10);
        this.queryCount = this.totalItems;
        this.qmsUsers = data;
        console.log(data);
        if (data.length > 0) {
            this.userSelect = data[0];
        }
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
