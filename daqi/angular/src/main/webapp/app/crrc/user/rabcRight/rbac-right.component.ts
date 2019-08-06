import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiParseLinks, JhiAlertService } from 'ng-jhipster';

import { IRbacRight } from 'app/shared/model/rbac-right.model';
import { Principal } from 'app/core';

import { ITEMS_PER_PAGE } from 'app/shared';
import { RbacRightService } from './rbac-right.service';
import { Message } from 'primeng/components/common/api';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';

@Component({
    selector: 'jhi-rbac-right',
    templateUrl: './rbac-right.component.html',
    styleUrls: ['rbac-right.scss']
})
export class RbacRightComponent implements OnInit, OnDestroy {
    currentAccount: any;
    rbacRights: IRbacRight[];
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
    rightName: any = '';
    rightCode:any = '';
    savaFlag: String;
    msgs: Message[] = [];
    errorMessage: any;
    addRights: any;
    updRights:any;

    constructor(
        private rbacRightService: RbacRightService,
        private parseLinks: JhiParseLinks,
        private jhiAlertService: JhiAlertService,
        private principal: Principal,
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private eventManager: JhiEventManager,
        private translate: TranslateService,
    ) {
        this.itemsPerPage = ITEMS_PER_PAGE;
        this.routeData = this.activatedRoute.data.subscribe(data => {
            this.page = data.pagingParams.page;
            this.previousPage = data.pagingParams.page;
            this.reverse = data.pagingParams.ascending;
            this.predicate = data.pagingParams.predicate;
        });
    }
    // 查询权限
    rightsSearch() {
        this.page = 1;
        this.loadAll();
    }

     /**
     * 分页事件
     */
    loadRoleLazy(event) {
        this.page = event.first / this.itemsPerPage + 1;
        this.loadAll();
    }

    loadAll() {
        this.rbacRightService
            .getRightInfos({
                page: this.page - 1,
                size: this.itemsPerPage,
                sort: this.sort(),
                rightName: this.rightName,
                rightCode:this.rightCode
            })
            .subscribe(
                (res: HttpResponse<IRbacRight[]>) => this.paginateRbacRights(res.body, res.headers),
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }

    // 清空检索条件
    emptyInfo() {
        this.rightName = '';
        this.rightCode = '';
        this.loadAll();
    }

    loadPage(page: number) {
        if (page !== this.previousPage) {
            this.previousPage = page;
            this.transition();
        }
    }

    transition() {
        this.router.navigate(['/rbac-right'], {
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
            '/rbac-right',
            {
                page: this.page,
                sort: this.predicate + ',' + (this.reverse ? 'asc' : 'desc')
            }
        ]);
        this.loadAll();
    }

    ngOnInit() {
        this.translate.get('alertInfo').subscribe(
            value => {
              this.errorMessage = value.tip;
              this.updRights = value.updRights;
              this.addRights = value.addRights;
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
        this.registerChangeInRbacRights();
    }

    loadCarsLazy(event) {
        this.page = event.first / this.itemsPerPage + 1;
        this.loadAll();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IRbacRight) {
        return item.id;
    }

    registerChangeInRbacRights() {
        this.eventSubscriber = this.eventManager.subscribe('rbacRightListModification', response => this.loadAll());
    }

    sort() {
        const result = [this.predicate + ',' + (this.reverse ? 'asc' : 'desc')];
        if (this.predicate !== 'id') {
            result.push('id');
        }
        return result;
    }

    private paginateRbacRights(data: IRbacRight[], headers: HttpHeaders) {
        this.links = this.parseLinks.parse(headers.get('link'));
        this.totalItems = parseInt(headers.get('X-Total-Count'), 10);
        this.queryCount = this.totalItems;
        this.rbacRights = data;
        if ( this.savaFlag === '1') {
            // this.msgs.push({ severity: 'success', summary: this.errorMessage, detail: this.addRights });

        } else if (this.savaFlag === '2') {
            // this.msgs.push({ severity: 'success', summary: this.errorMessage, detail: this.updRights });
        }
        this.savaFlag = '';
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    delete(id) {
        this.rbacRightService.deleteCheck({ deletecheck: id }).subscribe(data => {
            if (data.body === 1) {
                // alert("不能删除");
                this.msgs.push({ severity: 'error', summary: '提示', detail: '该数据还在被使用,不能删除!' });
            } else {
                this.router.navigate(['./', { outlets: { popup: 'rbacRight/' + id + '/delete'} }], { relativeTo: this.activatedRoute });
            }

        });
        
    }
}
