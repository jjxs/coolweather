import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpHeaders, HttpResponse, HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiParseLinks, JhiAlertService } from 'ng-jhipster';

import { IQmsMaterielEntry } from 'app/shared/model/qms-materiel-entry.model';
import { Principal } from 'app/core';
import { MaterialSelectionInspectComponent } from 'app/popup/materialSelectionInpsect';
import { SupplierSelectionInspectComponent } from 'app/popup/supplierSeletionInspect';
import { UserSelectComponent } from 'app/popup/userSelect';
import { ConfirmComponent } from './confirm-dialog.component';
import { ITEMS_PER_PAGE } from 'app/shared';
import { QmsMaterielEntryService } from './qms-materiel-entry.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { QmsMaterielService } from 'app/crrc/basics/materiel/qms-materiel.service';
@Component({
    selector: 'jhi-qms-materiel-entry',
    templateUrl: './qms-materiel-entry.component.html',
    styleUrls: [
        './qms-materiel-entry.scss'
    ]
})
export class QmsMaterielEntryComponent implements OnInit, OnDestroy {
    currentAccount: any;
    qmsMaterielEntries: IQmsMaterielEntry[];
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
    materielId = '';
    materielCd = '';
    materielName = '';
    figureNumber = '';
    supplierId = '';
    supplierCd = '';
    supplierName = '';
    specificationType = '';
    purchaseOrderNumber = '';
    flagInspects = [];
    flagInspect = '';
    enclosures = [];
    enclosure = '';
    checkType = '';
    entryDate = '';
    managerDatas = [];
    msgs = [];
    msgs1 = [];
    loading = false;
    urldata = '';
    constructor(
        private qmsMaterielEntryService: QmsMaterielEntryService,
        private parseLinks: JhiParseLinks,
        private jhiAlertService: JhiAlertService,
        private principal: Principal,
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private eventManager: JhiEventManager,
        private modalService: NgbModal,
        private qmsMaterielService: QmsMaterielService,
        private http: HttpClient,
    ) {
        this.itemsPerPage = 6;
        this.routeData = this.activatedRoute.data.subscribe(data => {
            this.page = data.pagingParams.page;
            this.previousPage = data.pagingParams.page;
            this.reverse = data.pagingParams.ascending;
            this.predicate = data.pagingParams.predicate;
        });
    }

    // 查询
    loadAll() {
        this.qmsMaterielService.getMasterList({ kbnCd: 'M14' })
            .subscribe(data => {
                this.urldata = data[0]["label"]
            });
        this.qmsMaterielEntryService
            .search({
                materielCd: this.materielCd,
                materielName: this.materielName,
                figureNumber: this.figureNumber,
                supplierCd: this.supplierCd,
                supplierName: this.supplierName,
                specificationType: this.specificationType,
                purchaseOrderNumber: this.purchaseOrderNumber,
                flagInspect: this.flagInspect,
                enclosure: this.enclosure,
                page: this.page - 1,
                size: this.itemsPerPage,
                sort: this.sort()
            })
            .subscribe(
                (res: HttpResponse<IQmsMaterielEntry[]>) => this.paginateQmsMaterielEntries(res.body, res.headers),
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }

    loadPage(page: number) {
        if (page !== this.previousPage) {
            this.previousPage = page;
            this.transition();
        }
    }

    transition() {
        this.router.navigate(['/qms-materiel-entry'], {
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
            '/qms-materiel-entry',
            {
                page: this.page,
                sort: this.predicate + ',' + (this.reverse ? 'asc' : 'desc')
            }
        ]);
        this.loadAll();
    }

    ngOnInit() {
        this.flagInspects = [
            { label: '全部', value: '-1' },
            { label: '未检', value: '0' },
            { label: '检中', value: '1' },
            { label: '完成', value: '3' },
        ];
        this.flagInspect = '0';
        this.enclosures = [
            { label: '', value: '' },
            { label: '有', value: '1' },
            { label: '无', value: '0' },
        ];
        this.enclosure = '';
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInQmsMaterielEntries();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IQmsMaterielEntry) {
        return item.id;
    }

    registerChangeInQmsMaterielEntries() {
        this.eventSubscriber = this.eventManager.subscribe('qmsMaterielEntryListModification', response => this.loadAll());
    }

    sort() {
        const result = [this.predicate + ',' + (this.reverse ? 'asc' : 'desc')];
        if (this.predicate !== 'id') {
            result.push('id');
        }
        return result;
    }

    private paginateQmsMaterielEntries(data: IQmsMaterielEntry[], headers: HttpHeaders) {
        this.links = this.parseLinks.parse(headers.get('link'));
        this.totalItems = parseInt(headers.get('X-Total-Count'), 10);
        this.queryCount = this.totalItems;
        this.qmsMaterielEntries = data;
        this.managerDatas = data;
        let i = 0;
        this.managerDatas.forEach(element => {
            if (element.entryDate !== null && element.entryDate !== '' && element.entryDate !== undefined) {
                this.managerDatas[i].entryDate = element.entryDate.split(' ')[0];
            }
            i++
        });
        console.log(data);
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    loadCarsLazy(event) {
        this.page = event.first / this.itemsPerPage + 1;
        this.loadAll();
    }

    // 清空按钮
    emptyInfo() {
        this.materielId = '';
        this.materielCd = '';
        this.materielName = '';
        this.figureNumber = '';
        this.supplierId = '';   
        this.supplierCd = '';
        this.supplierName = '';
        this.specificationType = '';
        this.purchaseOrderNumber = '';
        this.flagInspect = '';
        this.enclosure = '';
        this.loadAll();
    }

    // 导入点击事件
    //Excel数据导入
    ImportExcelFile() {
        this.msgs1 = [];
        this.msgs = [];
        document.getElementById('file').click();
    }
    //数据导入
    upload(event: any) {
        this.loading = true;
        this.msgs1 = [];
        // 如果没有文件上传则返回
        if (event.target.files.length === 0) {

            return;
        } else {
            this.qmsMaterielEntryService.importExcelFile('/upload', event.target.files).subscribe(
                data => {
                    this.loading = false;
                    if (data.status === 'success') {
                        if (data.flag === "1") {
                            this.msgs.push({ severity: 'success', summary: '成功', detail: data.message });
                        } else {
                            this.msgs1.push({ severity: 'error', summary: '', detail: data.message1 });
                            this.msgs1.push({ severity: 'error', summary: '', detail: data.message2 });
                        }

                    } else {
                        this.msgs1.push({ severity: 'error', summary: 'error', detail: data.message });
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

    // 物料弹出
    materielPop() {
        const a = this.modalService.open(MaterialSelectionInspectComponent as Component, { backdrop: 'static', keyboard: false, size: 'lg' })
        if (this.supplierId !== '') {
            a.componentInstance.supplierId = this.supplierId;
            a.result.then(
                (result) => {
                    if (result !== undefined) {
                        this.materielCd = result.materielCd;
                        this.materielName = result.materielName;
                        this.materielId = result.id;
                    }
                }
            );
        } else {
            a.result.then(
                (result) => {
                    if (result !== undefined) {
                        this.materielCd = result.materielCd;
                        this.materielName = result.materielName;
                        this.materielId = result.id;
                    }
                }
            );
        }
    }

    // 供应商弹出
    supplierPop() {
        const a = this.modalService.open(SupplierSelectionInspectComponent as Component, { backdrop: 'static', keyboard: false, size: 'lg' })
        if (this.materielId !== '') {
            a.componentInstance.materielId = this.materielId;
            a.result.then(
                (result) => {
                    if (result !== undefined) {
                        this.supplierId = result.id;
                        this.supplierCd = result.supplierCd;
                        this.supplierName = result.supplierName;
                    }
                }
            );
        } else {
            a.result.then(
                (result) => {
                    if (result !== undefined) {
                        this.supplierId = result.id;
                        this.supplierCd = result.supplierCd;
                        this.supplierName = result.supplierName;
                    }
                }
            );
        }
    }

    // 删除按钮点击
    delete(event) {
        this.msgs = [];
        this.qmsMaterielEntryService.deleteFlag({
            id: event.id
        }).subscribe(res => {
            if (res.body.status === '1') {
                this.router.navigate(['qms-materiel-entry/', { outlets: { popup: 'qms-materiel-entry/' + event.id + '/delete' } }]);
            } else {
                this.msgs.push({ severity: 'success', summary: '成功', detail: '当前进场数据已报检,不可删除!' });
            }
        })
    }

    // 报检事件
    inspect(event) {
        this.modalService.open(UserSelectComponent as Component, { backdrop: 'static', keyboard: false, size: 'lg' }).result.then(
            (result) => {
                if (result !== undefined) {
                    let user = result;
                    const a = this.modalService.open(ConfirmComponent as Component, { backdrop: 'static', keyboard: false, size: 'lg' });
                    a.componentInstance.flag = '1';
                    a.result.then(
                        (result) => {
                            if (result) {
                                this.qmsMaterielEntryService.send({
                                    id: event.id,
                                    userId: user.id,
                                    userName: user.userName
                                }).subscribe(res=>{
                                    if(res.body.status === '1') {
                                        console.log('发送成功');
                                    } else {
                                        console.log('发送失败');
                                    }
                                })
                            } 
                        }
                    );
                }
            }
        );
    }

    openFile() {
        window.location.href = this.urldata + '/file/excel/materielEntry.xls';
    }
}
