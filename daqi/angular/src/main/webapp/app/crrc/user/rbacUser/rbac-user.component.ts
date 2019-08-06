import {Component, OnInit, OnDestroy} from '@angular/core';
import {HttpErrorResponse, HttpHeaders, HttpResponse} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {JhiEventManager, JhiParseLinks, JhiAlertService} from 'ng-jhipster';

import {IRbacUser} from 'app/shared/model/rbac-user.model';
import {Principal} from 'app/core';

import {ITEMS_PER_PAGE} from 'app/shared';
import {RbacUserService} from './rbac-user.service';
import {Message} from 'primeng/components/common/api';
import {TranslateService, LangChangeEvent} from '@ngx-translate/core';

@Component({
    selector: 'jhi-rbac-user',
    templateUrl: './rbac-user.component.html',
    styleUrls: [
        'rbac-user.scss'
    ]
})
export class RbacUserComponent implements OnInit, OnDestroy {
    currentAccount: any;
    // 记录查询回来的所有用户
    rbacUsers: IRbacUser[];
    error: any;
    success: any;
    eventSubscriber: Subscription;
    routeData: any;
    links: any;
    totalItems: any;
    queryCount: any;
    itemsPerPage: any;
    page: any;
    predicate: any;
    previousPage: any;
    reverse: any;
    // 编辑隐藏标示
    updateFlag: boolean;
    // 删除隐藏标示
    deleteFlag: boolean;
    // 模糊查询参数
    searchUsersMes: any = '';
    userCode:any = '';
    savaFlag: String;
    msgs: Message[] = [];
    errorMessage: any;
    addUsers: any;
    updUsers: any;

    constructor(
        private rbacUserService: RbacUserService,
        private parseLinks: JhiParseLinks,
        private jhiAlertService: JhiAlertService,
        private principal: Principal,
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private eventManager: JhiEventManager,
        private translate: TranslateService,
    ) {
        this.itemsPerPage = ITEMS_PER_PAGE;
        // 从当前的URL信息中获取路由信息
        this.routeData = this.activatedRoute.data.subscribe(data => {
            this.page = data.pagingParams.page;
            this.previousPage = data.pagingParams.page;
            this.reverse = data.pagingParams.ascending;
            this.predicate = data.pagingParams.predicate;
        });
    }

    // 调用rbacUserService查询
    loadAll() {
        this.rbacUserService.queryRbacUsers({
            page: this.page - 1,
            size: this.itemsPerPage,
            sort: this.sort(),
            searchUsersMes: this.searchUsersMes,
            userCode:this.userCode
        })
            .subscribe(
                (res: HttpResponse<IRbacUser[]>) => this.paginateRbacUsers(res.body, res.headers),
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }

     // 清空检索条件
     emptyInfo() {
        this.searchUsersMes = '';
        this.userCode = '';
        this.loadAll();
    }

    // 查询员工
    usersSearch() {
        this.page = 1;
        this.loadAll();
    }

    loadPage(page: number) {
        if (page !== this.previousPage) {
            this.previousPage = page;
            this.transition();
        }
    }

    // 重新定向到用户管理页面
    transition() {
        this.router.navigate(['/rbacUser'], {
            queryParams: {
                page: this.page,
                size: this.itemsPerPage,
                sort: this.predicate + ',' + (this.reverse ? 'asc' : 'desc')
            }
        });
        this.loadAll();
    }

    clear() {
        this.page = 0;
        this.router.navigate([
            '/rbacUser',
            {
                page: this.page,
                sort: this.predicate + ',' + (this.reverse ? 'asc' : 'desc')
            }
        ]);
        this.loadAll();
    }

    // 初始化时候，记录当前用户，加载第一页用户列表，注册用户变动通知
    ngOnInit() {

        this.translate.get('alertInfo').subscribe(
            value => {
                this.errorMessage = value.tip;
                this.updUsers = value.updUsers;
                this.addUsers = value.addUsers;
            }
        );
        this.activatedRoute.queryParams.subscribe(
            params => {
                this.savaFlag = params['savaFlag'];
            }
        );
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInRbacUsers();

    }

    delete(id) {
        this.router.navigate(['./', {outlets: {popup: 'rbacUser/' + id + '/delete'}}], {relativeTo: this.activatedRoute});

    }

    // 销毁时候要反注册
    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IRbacUser) {
        return item.id;
    }

    registerChangeInRbacUsers() {
        this.eventSubscriber = this.eventManager.subscribe('rbacUserListModification', response => this.loadAll());
    }

    // 排序回调方法，默认根据ID排序，与sort指令对应
    sort() {
        const result = [this.predicate + ',' + (this.reverse ? 'asc' : 'desc')];
        if (this.predicate !== 'id') {
            result.push('id');
        }
        return result;
    }

    /**
     * 分页事件
     */
    loadCarsLazy(event) {
        this.page = event.first / this.itemsPerPage + 1;
        this.loadAll();
    }

    // 查询成功时候的回调
    private paginateRbacUsers(data: IRbacUser[], headers: HttpHeaders) {
        this.links = this.parseLinks.parse(headers.get('link'));
        this.totalItems = parseInt(headers.get('X-Total-Count'), 10);
        this.queryCount = this.totalItems;
        this.rbacUsers = data;
        console.log(this.rbacUsers);
        if (this.savaFlag === '1') {
            // this.msgs.push({severity: 'success', summary: this.errorMessage, detail: this.addUsers});

        } else if (this.savaFlag === '2') {
            // this.msgs.push({severity: 'success', summary: this.errorMessage, detail: this.updUsers});
        }
        this.savaFlag = '';
    }

    // 查询失败时候的回调
    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
