import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiParseLinks, JhiAlertService } from 'ng-jhipster';
import { Message } from 'primeng/components/common/api';
import { IQmsUnit } from 'app/shared/model/qms-unit.model';
import { Principal } from 'app/core';
import { QmsMaterielService } from 'app/crrc/basics/materiel/qms-materiel.service'
import { ITEMS_PER_URL, } from 'app/shared';
import { ITEMS_PER_PAGE, } from 'app/shared';
import { QmsUnitService } from './qms-unit.service';

@Component({
    selector: 'jhi-qms-unit',
    templateUrl: './qms-unit.component.html',
    styleUrls: [
        './unit.scss'
    ]
})
export class QmsUnitComponent implements OnInit, OnDestroy {
    currentAccount: any;
    qmsUnits: IQmsUnit[];
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
    // 工序编码条件检索
    bianMa = '';
    // 工序名称条件检索
    gongName = '';
    //删除check
    deletecheck = '';
    msgs: Message[] = [];
    urldata = "";
    //模板下载的服务器地址
    // urls = 'http://192.168.86.135:8082/file/excel/unit.xls';
    urls = ITEMS_PER_URL + '/file/excel/unit.xls';
    constructor(
        private qmsUnitService: QmsUnitService,
        private parseLinks: JhiParseLinks,
        private jhiAlertService: JhiAlertService,
        private principal: Principal,
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private eventManager: JhiEventManager,
        private qmsMaterielService: QmsMaterielService
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
        this.qmsUnitService
            .query({
                bianMa: this.bianMa,
                gongName: this.gongName,
                page: this.page - 1,
                size: this.itemsPerPage,
                sort: this.sort()
            })
            .subscribe(
                (res: HttpResponse<IQmsUnit[]>) => this.paginateQmsUnits(res.body, res.headers),
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }

    //点击删除按钮触发时间
    delete(id, unitCd) {
        this.deletecheck = id;
        this.qmsUnitService.deleteCheck({ deletecheck: this.deletecheck }).subscribe(data => {
            if (data.body === 1) {
                // alert("不能删除");
                this.msgs.push({ severity: 'error', summary: '提示', detail: '该数据还在被使用,不能删除!' });
            } else {
                this.router.navigate(['./', { outlets: { popup: 'unit/' + id + '/delete' } }], { relativeTo: this.activatedRoute });
            }

        });


    }

    // 清空检索条件
    emptyInfo() {
        this.bianMa = '';
        this.gongName = '';
        this.loadAll();
    }
    //Excel数据导入
    ImportExcel() {
        document.getElementById('file').click();
    }

    //数据导入
    upload(event: any) {
        // 如果没有文件上传则返回
        if (event.target.files.length === 0) {

            return;
        } else {
            this.qmsUnitService.importExcelFile('/upload', event.target.files).subscribe(
                data => {
                    if (data.status === 'success') {
                        if (data.flag === "1") {
                            this.msgs.push({ severity: 'success', summary: '成功', detail: data.message });
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

    openFile() {
    //    console.log(this.urldata);
       window.location.href = this.urldata+'/file/excel/unit.xls';
    }

    loadCarsLazy(event) {
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
        this.router.navigate(['/qms-unit'], {
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
            '/qms-unit',
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
        this.registerChangeInQmsUnits();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IQmsUnit) {
        return item.id;
    }

    registerChangeInQmsUnits() {
        this.eventSubscriber = this.eventManager.subscribe('qmsUnitListModification', response => this.loadAll());
    }

    sort() {
        const result = [this.predicate + ',' + (this.reverse ? 'asc' : 'desc')];
        if (this.predicate !== 'id') {
            result.push('id');
        }
        return result;
    }

    private paginateQmsUnits(data: IQmsUnit[], headers: HttpHeaders) {
        this.links = this.parseLinks.parse(headers.get('link'));
        this.totalItems = parseInt(headers.get('X-Total-Count'), 10);
        this.queryCount = this.totalItems;
        this.qmsUnits = data;
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
