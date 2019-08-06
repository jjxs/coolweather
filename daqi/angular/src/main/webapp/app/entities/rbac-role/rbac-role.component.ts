import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiParseLinks, JhiAlertService } from 'ng-jhipster';

import { IRbacRole } from 'app/shared/model/rbac-role.model';
import { Principal } from 'app/core';

import { ITEMS_PER_PAGE } from 'app/shared';
import { RbacRoleService } from './rbac-role.service';
import { Message } from 'primeng/components/common/api';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';

@Component({
    selector: 'jhi-rbac-role',
    templateUrl: './rbac-role.component.html',
    styleUrls: ['rbac-role.scss']
})
export class RbacRoleComponent implements OnInit, OnDestroy {
    currentAccount: any;
    rbacRoles: IRbacRole[];
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
    // 模糊查询参数
    roleName: any = '';
    savaFlag: String;
    msgs: Message[] = [];
    errorMessage: any;
    updRoles: any;
    addRoles: any;

    constructor(
        private rbacRoleService: RbacRoleService,
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

    loadAll() {
        this.rbacRoleService
            .getRoleInfo({
                page: this.page - 1,
                size: this.itemsPerPage,
                sort: this.sort(),
                roleName: this.roleName
            })
            .subscribe(
                (res: HttpResponse<IRbacRole[]>) => this.paginateRbacRoles(res.body, res.headers),
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }
    // 查询角色名
     rolesSearch() {
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

    loadPage(page: number) {
        if (page !== this.previousPage) {
            this.previousPage = page;
            this.transition();
        }
    }

    transition() {
        this.router.navigate(['/rbac-role'], {
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
            '/rbac-role',
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
              this.addRoles = value.addRoles;
              this.updRoles = value.updRoles;
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
        this.registerChangeInRbacRoles();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IRbacRole) {
        return item.id;
    }

    registerChangeInRbacRoles() {
        this.eventSubscriber = this.eventManager.subscribe('rbacRoleListModification', response => this.loadAll());
    }

    sort() {
        const result = [this.predicate + ',' + (this.reverse ? 'asc' : 'desc')];
        if (this.predicate !== 'id') {
            result.push('id');
        }
        return result;
    }

    delete(id) {
        this.router.navigate(['./', { outlets: { popup: 'rbac-role/'+ id + '/delete'}}], {relativeTo: this.activatedRoute});
    }

    private paginateRbacRoles(data: IRbacRole[], headers: HttpHeaders) {
        this.links = this.parseLinks.parse(headers.get('link'));
        this.totalItems = parseInt(headers.get('X-Total-Count'), 10);
        this.queryCount = this.totalItems;
        this.rbacRoles = data;
        if ( this.savaFlag === '1') {
            this.msgs.push({ severity: 'success', summary: this.errorMessage, detail: this.addRoles });
            
        } else if (this.savaFlag === '2') {
            this.msgs.push({ severity: 'success', summary: this.errorMessage, detail: this.updRoles });
        }
        this.savaFlag = '';
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
