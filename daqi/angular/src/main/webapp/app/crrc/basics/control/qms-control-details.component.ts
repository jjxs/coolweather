import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiParseLinks, JhiAlertService } from 'ng-jhipster';
import { Message } from 'primeng/components/common/api';
import { IQmsControlDetails } from 'app/shared/model/qms-control-details.model';
import { Principal } from 'app/core';
import { QmsMaterielService } from 'app/crrc/basics/materiel/qms-materiel.service'
import { ITEMS_PER_PAGE } from 'app/shared';
import { QmsControlDetailsService } from './qms-control-details.service';

@Component({
    selector: 'jhi-qms-control-details',
    templateUrl: './qms-control-details.component.html',
    styleUrls: [
        './control.scss'
    ]
})
export class QmsControlDetailsComponent implements OnInit, OnDestroy {
    currentAccount: any;
    qmsControlDetails: IQmsControlDetails[];
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
    msgs: Message[] = [];
    msgs1: Message[] = [];
    urldata = "";
    // xiangmu
    xiangmu = '';
    loading=false;

    constructor(
        private qmsControlDetailsService: QmsControlDetailsService,
        private parseLinks: JhiParseLinks,
        private jhiAlertService: JhiAlertService,
        private principal: Principal,
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private eventManager: JhiEventManager,
        private qmsMaterielService:QmsMaterielService,
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
        this.qmsMaterielService.getMasterList({ kbnCd: 'M14' })
        .subscribe(data => {
            this.urldata = data[0]["label"]
        });
        this.qmsControlDetailsService
            .query({
                xiangmu: this.xiangmu,
                page: this.page - 1,
                size: this.itemsPerPage,
                sort: this.sort()
            })
            .subscribe(
                (res: HttpResponse<IQmsControlDetails[]>) => this.paginateQmsControlDetails(res.body, res.headers),
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }

    loadCarsLazy(event) {
        this.page = event.first / this.itemsPerPage + 1;
        this.loadAll();
    }

    // 清空检索条件
    emptyInfo() {
        this.xiangmu = '';
        this.loadAll();
    }

    //点击删除按钮触发时间
    delete(id) {
        this.router.navigate(['./', { outlets: { popup: 'control/' + id + '/delete' } }], { relativeTo: this.activatedRoute });
    }

    openFile() {
        //    console.log(this.urldata);
        window.location.href = this.urldata + '/file/excel/control.xls';
    }

    //Excel数据导入
    ImportExcel() {
        document.getElementById('file').click();
    }
    //数据导入
    upload(event: any) {
        this.loading = true;
        // 如果没有文件上传则返回
        if (event.target.files.length === 0) {

            return;
        } else {
            this.qmsControlDetailsService.importExcelFile('/upload', event.target.files).subscribe(
                data => {
                    this.loading = false;
                    if (data.status === 'success') {
                        if (data.flag === "1") {
                            this.msgs1.push({ severity: 'success', summary: '成功', detail: data.message });
                        } else {
                            this.msgs.push({ severity: 'error', summary: '', detail: data.message1 });
                            this.msgs.push({ severity: 'error', summary: '', detail: data.message2 });
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

    loadPage(page: number) {
        if (page !== this.previousPage) {
            this.previousPage = page;
            this.transition();
        }
    }

    transition() {
        this.router.navigate(['/qms-control-details'], {
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
            '/qms-control-details',
            {
                page: this.page,
                sort: this.predicate + ',' + (this.reverse ? 'asc' : 'desc')
            }
        ]);
        this.loadAll();
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInQmsControlDetails();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IQmsControlDetails) {
        return item.id;
    }

    registerChangeInQmsControlDetails() {
        this.eventSubscriber = this.eventManager.subscribe('qmsControlDetailsListModification', response => this.loadAll());
    }

    sort() {
        const result = [this.predicate + ',' + (this.reverse ? 'asc' : 'desc')];
        if (this.predicate !== 'id') {
            result.push('id');
        }
        return result;
    }

    private paginateQmsControlDetails(data: IQmsControlDetails[], headers: HttpHeaders) {
        this.links = this.parseLinks.parse(headers.get('link'));
        this.totalItems = parseInt(headers.get('X-Total-Count'), 10);
        this.queryCount = this.totalItems;
        this.qmsControlDetails = data;
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
