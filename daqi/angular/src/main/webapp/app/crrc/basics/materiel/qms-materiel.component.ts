import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiParseLinks, JhiAlertService } from 'ng-jhipster';
import { Message } from 'primeng/components/common/api';
import { IQmsMateriel } from 'app/shared/model/qms-materiel.model';
import { Principal } from 'app/core';

import { ITEMS_PER_PAGE } from 'app/shared';
import { QmsMaterielService } from './qms-materiel.service';

@Component({
    selector: 'jhi-qms-materiel',
    templateUrl: './qms-materiel.component.html',
    styleUrls: [
        './materiel.scss'
    ]
})
export class QmsMaterielComponent implements OnInit, OnDestroy {
    currentAccount: any;
    qmsMateriels: IQmsMateriel[];
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
    loading = false;
    //删除check
    deletecheck = '';
    // 物料编码条件检索
    bianMa = '';
    // 物料名称条件检索
    gongName = '';
    //图号
    tuhao = "";
    //规格
    guige = "";
    //生产方式
    shengValue =null;
    //物料属性
    shuxingValue=null;
    //删除check
    
    scfs = [];
    shuxing= [];
    
    
    constructor(
        private qmsMaterielService: QmsMaterielService,
        private parseLinks: JhiParseLinks,
        private jhiAlertService: JhiAlertService,
        private principal: Principal,
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private eventManager: JhiEventManager,
        
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
        //生产方式
        this.qmsMaterielService.getMasterList( { kbnCd:'M01'})
        .subscribe(data => {
            this.scfs = data
        })
        //属性
        this.qmsMaterielService.getMasterList( { kbnCd:'M02'})
        .subscribe(data => {
            this.shuxing = data
        })
        this.qmsMaterielService
            .query({
                bianMa: this.bianMa,
                gongName: this.gongName,
                tuhao:this.tuhao,
                guige:this.guige,
                shengValue:this.shengValue,
                shuxingValue:this.shuxingValue,
                page: this.page - 1,
                size: this.itemsPerPage,
                sort: this.sort()
            })
            .subscribe(
                (res: HttpResponse<IQmsMateriel[]>) => this.paginateQmsMateriels(res.body, res.headers),
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }

    loadCarsLazy(event) {
        this.page = event.first / this.itemsPerPage + 1;
        this.loadAll();
    }
    // 清空检索条件
    emptyInfo() {
        this.bianMa = '';
        this.gongName = '';
        this.tuhao = "";
        //规格
        this.guige = "";
        this.shengValue= null ;
        this.shuxingValue= null ;
        this.loadAll();
    }
    //点击删除按钮触发时间
    delete(id, materielCd) {
        this.deletecheck = id;
        this.qmsMaterielService.deleteCheck({ deletecheck: this.deletecheck }).subscribe(data => {
            if (data.body === 1) {
                // alert("不能删除");
                this.msgs1.push({ severity: 'error', summary: '提示', detail: '该数据还在被使用,不能删除!' });
            } else {
                this.router.navigate(['./', { outlets: { popup: 'materiel/' + id + '/delete' } }], { relativeTo: this.activatedRoute });
            }

        });
            
    }
    //Excel数据导入
    ImportExcel() {
        this.msgs = [];
        this.msgs1 = [];
        document.getElementById('file').click();
    }

    //数据导入
    upload(event: any) {
        this.loading = true;
        // 如果没有文件上传则返回
        if (event.target.files.length === 0) {

            return;
        } else {
            this.qmsMaterielService.importExcelFile('/upload', event.target.files).subscribe(
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
        this.router.navigate(['/qms-materiel'], {
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
            '/qms-materiel',
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
        this.registerChangeInQmsMateriels();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IQmsMateriel) {
        return item.id;
    }

    registerChangeInQmsMateriels() {
        this.eventSubscriber = this.eventManager.subscribe('qmsMaterielListModification', response => this.loadAll());
    }

    sort() {
        const result = [this.predicate + ',' + (this.reverse ? 'asc' : 'desc')];
        if (this.predicate !== 'id') {
            result.push('id');
        }
        return result;
    }

    private paginateQmsMateriels(data: IQmsMateriel[], headers: HttpHeaders) {
        this.links = this.parseLinks.parse(headers.get('link'));
        this.totalItems = parseInt(headers.get('X-Total-Count'), 10);
        this.queryCount = this.totalItems;
        this.qmsMateriels = data;
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
