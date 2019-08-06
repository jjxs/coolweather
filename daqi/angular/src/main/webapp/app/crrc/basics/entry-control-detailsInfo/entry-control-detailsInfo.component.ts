import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { IEntryControlDetailsInfo } from 'app/shared/model/entry-control-detailsInfo.model';
import { Principal } from 'app/core';

import { ITEMS_PER_PAGE } from 'app/shared';
import { EntryControlDetailsInfoService } from './entry-control-detailsInfo.service';
import { Message } from 'primeng/components/common/api';
@Component({
    selector: 'jhi-entry-control-detailsInfo',
    templateUrl: './entry-control-detailsInfo.component.html',
    styleUrls: ['./entry-control-detailsInfo.scss']
})
export class EntryControlDetailsInfoComponent implements OnInit, OnDestroy {
    currentAccount: any;
    qmsEntryControlDetails: IEntryControlDetailsInfo[];
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
    // 物料编码
    materielCdVague: string = '';
    // 物料名称
    materielNameVague: string = '';
    // 检查项目
    inspectionItemVague: string = '';
    // 加载图画
    loading: boolean;
    // 消息初始化
    msgs: Message[] = [];
    constructor(
        private entryControlDetailsInfoService: EntryControlDetailsInfoService,
        private principal: Principal,
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private eventManager: JhiEventManager
    ) {
        this.itemsPerPage = ITEMS_PER_PAGE;
        this.routeData = this.activatedRoute.data.subscribe(data => {
            this.page = data.pagingParams.page;
            this.previousPage = data.pagingParams.page;
            this.reverse = data.pagingParams.ascending;
            this.predicate = data.pagingParams.predicate;
        });
    }
    // 清空检索条件
    emptyInfo() {
        this.materielCdVague = '';
        this.materielNameVague = '';
        this.inspectionItemVague = '';
        this.loadAll();
    }
    /**
     * 一览数据获取
     */
    loadAll() {
        // 模糊查询加分页
        const param: any = {
            'materielCdVague': this.materielCdVague, 'materielNameVague': this.materielNameVague,
            'inspectionItemVague': this.inspectionItemVague, 'pageNumber': this.page, 'sizeNumber': this.itemsPerPage,
        };
        // 取得一览数据
        this.entryControlDetailsInfoService
            .getentryConDetailsAll(param)
            .subscribe(data => {
                // 接受返回数据
                this.qmsEntryControlDetails = data.entryControlDtailsInfo;
                // 判断是否有数据
                if (this.qmsEntryControlDetails.length !== 0) {
                    // 取得总条数
                    this.queryCount = this.qmsEntryControlDetails[0].numberCount;
                } else {
                    // 总条数赋值
                    this.queryCount = 0;
                }
            }
            );
        // 取得总条数
    }

    loadPage(page: number) {
        if (page !== this.previousPage) {
            this.previousPage = page;
            this.transition();
        }
    }

    transition() {
        this.router.navigate(['/entry-control-detailsInfo'], {
            queryParams: {
                page: this.page,
                size: this.itemsPerPage,
                sort: this.predicate + ',' + (this.reverse ? 'asc' : 'desc')
            }
        });
        // this.loadAll();
    }
    /**
     * 懒加载取数据
     * @param event
     */
    loadCarsLazy(event) {
        this.loading = true;
        this.itemsPerPage = 6;
        this.page = event.first / this.itemsPerPage + 1;
        this.loadAll();
        this.loading = false;
    }
    clear() {
        this.page = 0;
        this.router.navigate([
            '/entry-control-detailsInfo',
            {
                page: this.page,
                sort: this.predicate + ',' + (this.reverse ? 'asc' : 'desc')
            }
        ]);
        // this.loadAll();
    }

    /**
     * 初始化加载
     */
    ngOnInit() {

        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInQmsEntryControlDetails();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IEntryControlDetailsInfo) {
        return item.id;
    }

    registerChangeInQmsEntryControlDetails() {
        this.eventSubscriber = this.eventManager.subscribe('qmsEntryControlDetailsListModification', response => this.loadAll());
    }

    sort() {
        const result = [this.predicate + ',' + (this.reverse ? 'asc' : 'desc')];
        if (this.predicate !== 'id') {
            result.push('id');
        }
        return result;
    }
    // 删除车型信息
    delete(id) {
        this.router.navigate(['./', { outlets: { popup: 'entry-control-detailsInfo/' + id + '/delete' } }], { relativeTo: this.activatedRoute });
    }
    /**
     * 导入
     */
    ImportCSV() {
        document.getElementById('file').click();
    }
    /**
     * 文件上传
     * @param event 
     */
    upload(event: any) {
        // 如果没有文件上传则返回
        if (event.target.files.length === 0) {

            return;
        } else {
            this.entryControlDetailsInfoService.importExcelFile('/upload', event.target.files).subscribe(
                data => {
                    if (data.status === 'success') {
                        if (data.flag === '1') {
                            this.msgs.push({ severity: 'success', summary: '成功', detail: data.message });
                        } else {
                            this.msgs.push({ severity: 'success', summary: '成功', detail: data.message });
                            // for (let f = 0; f < data.messageError.length; f++) {
                            this.msgs.push({ severity: 'error', summary: '', detail: data.messageError });
                            // }
                        }

                    } else {
                        this.msgs.push({ severity: 'error', summary: 'error', detail: data.message });
                    }
                    // 清空excel
                    event.target.value = '';
                    this.loadAll();
                },
                error => {
                    // 清空excel
                    event.target.value = '';
                }
            );
        }
    }
}
