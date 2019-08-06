import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { ActivatedRoute, Router, CanDeactivate } from '@angular/router';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiParseLinks, JhiAlertService } from 'ng-jhipster';
import { Message } from 'primeng/components/common/api';
import { IQmsEntryControlDetails, QmsEntryControlDetails } from 'app/shared/model/qms-entry-control-details.model';
import { Principal } from 'app/core';
import { MaterialSelectionComponent } from '../../../popup/materialSelection'
import { ITEMS_PER_PAGE } from 'app/shared';
import { QmsEntryControlDetailsService } from './qms-entry-control-details.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EntryInspectionSelectionComponent } from '../../../popup/entryInspectionSelection'
import { resolve } from 'q';
import { ConfirmComponent } from './confirm-dialog.component';
import { QmsMaterielService } from 'app/crrc/basics/materiel/qms-materiel.service'
import { LocalStorageService, SessionStorageService } from 'ngx-webstorage';
import { HttpClient } from '@angular/common/http';
import { SERVER_API_URL } from 'app/app.constants';
@Component({
    selector: 'jhi-qms-entry-control-details',
    templateUrl: './qms-entry-control-details.component.html',
    styleUrls: [
        './qms-entry-control-details.scss'
    ]
})
export class QmsEntryControlDetailsComponent implements OnInit, OnDestroy {
    currentAccount: any;
    qmsEntryControlDetails: any[] = [];
    dQmsEntryControlDetails: any[] = [];
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
    flag = '0'; // '0'初始化, '1'只读(R), '2'写入(W)
    urldata = '';
    msgs: Message[] = [];
    // excel
    msgs1: Message[] = [];
    materielCd = '';
    materielName = '';
    materielObj: any;
    materielId = '';
    confirmFlag = false;
    loading = false;
    url = SERVER_API_URL + 'api/qms-entry-control-details';
    onFocus = '';
    constructor(
        private qmsEntryControlDetailsService: QmsEntryControlDetailsService,
        private principal: Principal,
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private eventManager: JhiEventManager,
        private modalService: NgbModal,
        private qmsMaterielService: QmsMaterielService,
        private localStorage: LocalStorageService,
        private http: HttpClient
    ) {
        this.itemsPerPage = ITEMS_PER_PAGE;
        this.routeData = this.activatedRoute.data.subscribe(data => {
            this.page = data.pagingParams.page;
            this.previousPage = data.pagingParams.page;
            this.reverse = data.pagingParams.ascending;
            // this.predicate = data.pagingParams.predicate;
            this.predicate = 'itemNumber';
        });
    }

    loadAll() {
        this.qmsMaterielService.getMasterList({ kbnCd: 'M14' })
            .subscribe(data => {
                this.urldata = data[0]["label"]
            });
        if (this.materielId === '' || this.materielId === undefined) {
            return;
        }

        this.qmsEntryControlDetailsService
            .findByMaterielId({
                materielId: this.materielId,
                page: this.page - 1,
                size: this.itemsPerPage,
                sort: this.sort()
            })
            .subscribe(
                (res) =>
                    this.qmsEntryControlDetails = res.body
            )
    }

    clear() {
        this.page = 0;
        this.router.navigate([
            '/qms-entry-control-details',
            {
                page: this.page,
                sort: this.predicate + ',' + (this.reverse ? 'asc' : 'desc')
            }
        ]);
        this.loadAll();
    }

    ngOnInit() {
        this.localStorage.store('editFlag', '0');
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInQmsEntryControlDetails();
    }



    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInQmsEntryControlDetails() {
        this.eventSubscriber = this.eventManager.subscribe('qmsEntryControlDetailsListModification', response => this.loadAll());
    }

    sort() {
        const result = [this.predicate + ',' + (this.reverse ? 'asc' : 'desc')];
        if (this.predicate !== 'itemNumber') {
            result.push('itemNumber');
        }
        return result;
    }

    // 物料弹出
    materielPop() {
        const a = this.modalService.open(MaterialSelectionComponent as Component, { backdrop: 'static', keyboard: false, size: 'lg' }).result.then(
            (result) => {
                if (result !== undefined) {
                    this.materielCd = result.materielCd;
                    this.materielName = result.materielName;
                    this.materielId = result.id;
                    this.materielObj = result;
                }
            }
        );
    }

    // 检索按钮点击事件
    search() {
        this.confirmFlag = false;
        if (this.flag === '2') {
            this.confirmSearch();
        } else {
            this.flag = '1';
            this.loadAll();
        }

    }

    //清除按钮点击事件
    emptyInfo() {
        this.confirmFlag = false;
        if (this.flag === '2') {
            this.confirmEmpty();
        } else {
            this.materielCd = '';
            this.materielName = '';
            this.materielId = '';
            this.flag = '0';
            this.qmsEntryControlDetails = [];
        }

    }


    // 编辑按钮点击事件
    edit() {
        this.localStorage.store('editFlag', '1');
        this.loadAll();
        let _this = this
        setTimeout(function () {
            if (_this.qmsEntryControlDetails.length === 0) {
                var qmsEntryControlDetail = new QmsEntryControlDetails();
                qmsEntryControlDetail.materielId = parseInt(this.materielId);
                qmsEntryControlDetail.flagStatus = '0';
                qmsEntryControlDetail.inspectionItem = '';
                qmsEntryControlDetail.inspectionInstrument = '';
                qmsEntryControlDetail.technicalRequirement = '';
                _this.qmsEntryControlDetails.push(qmsEntryControlDetail);
            }
            // 写入(W)
            _this.flag = '2';
        }, 100);
    }

    // 保存事件
    async save(saveflag) {
        this.msgs = [];
        for (let i = 0; i < this.qmsEntryControlDetails.length; i++) {
            var indexOfSub = -1;
            if ((this.qmsEntryControlDetails[i].inspectionItem === null || this.qmsEntryControlDetails[i].inspectionItem === '') &&
                this.qmsEntryControlDetails[i].inspectionInstrument === '' &&
                this.qmsEntryControlDetails[i].technicalRequirement === '' &&
                (this.qmsEntryControlDetails[i].standard === undefined || this.qmsEntryControlDetails[i].standard === '') &&
                (this.qmsEntryControlDetails[i].upperDeviation === undefined || this.qmsEntryControlDetails[i].upperDeviation === '') &&
                (this.qmsEntryControlDetails[i].lowerDeviation === undefined || this.qmsEntryControlDetails[i].lowerDeviation === '')) {
                this.qmsEntryControlDetails.splice(i, 1);
                i--;
                continue;
            }
            if (this.qmsEntryControlDetails[i].inspectionItem === null || this.qmsEntryControlDetails[i].inspectionItem === undefined || this.qmsEntryControlDetails[i].inspectionItem === '') {
                this.msgs.push({ severity: 'error', summary: 'error', detail: '第' + (i + 1) + '行检查项目不能为空' })
                return false;
            }

            if (this.qmsEntryControlDetails[i].upperDeviation !== null && this.qmsEntryControlDetails[i].upperDeviation !== undefined) {
                indexOfSub = this.qmsEntryControlDetails[i].upperDeviation.toString().indexOf('-');
                if (indexOfSub !== -1) {
                    this.msgs.push({ severity: 'error', summary: 'error', detail: '第' + (i + 1) + '上偏差不能为负数,请重新输入上偏差' })
                    return false;
                }
            }

            if (this.qmsEntryControlDetails[i].lowerDeviation !== null && this.qmsEntryControlDetails[i].lowerDeviation !== undefined) {
                indexOfSub = this.qmsEntryControlDetails[i].lowerDeviation.toString().indexOf('-');
                if (indexOfSub !== -1) {
                    this.msgs.push({ severity: 'error', summary: 'error', detail: '第' + (i + 1) + '下偏差不能为负数,请重新输入下偏差' })
                    return false;
                }
            }

            if (this.qmsEntryControlDetails[i].standard !== null && this.qmsEntryControlDetails[i].standard !== undefined && this.qmsEntryControlDetails[i].standard !== '') {
                var num = isNaN(this.qmsEntryControlDetails[i].standard);
                if (num) {
                    this.msgs.push({ severity: 'error', summary: 'error', detail: '第' + (i + 1) + '行标准值不是数值' })
                    return false;
                }
                if (this.qmsEntryControlDetails[i].upperDeviation === null || this.qmsEntryControlDetails[i].upperDeviation === undefined || this.qmsEntryControlDetails[i].upperDeviation === '') {
                    this.msgs.push({ severity: 'error', summary: 'error', detail: '第' + (i + 1) + '行标准值存在,请输入上偏差' })
                    return false;
                }
                num = isNaN(this.qmsEntryControlDetails[i].upperDeviation);
                if (num) {
                    this.msgs.push({ severity: 'error', summary: 'error', detail: '第' + (i + 1) + '行上偏差不是数值' })
                    return false;
                }
                if (this.qmsEntryControlDetails[i].lowerDeviation === null || this.qmsEntryControlDetails[i].lowerDeviation === undefined || this.qmsEntryControlDetails[i].lowerDeviation === '') {
                    this.msgs.push({ severity: 'error', summary: 'error', detail: '第' + (i + 1) + '行标准值存在,请输入下偏差' })
                    return false;
                }
                num = isNaN(this.qmsEntryControlDetails[i].lowerDeviation);
                if (num) {
                    this.msgs.push({ severity: 'error', summary: 'error', detail: '第' + (i + 1) + '行下偏差不是数值' })
                    return false;
                }
                this.qmsEntryControlDetails[i].inspectionResultDiff = '0';
            } else {
                this.qmsEntryControlDetails[i].inspectionResultDiff = '1';
            }
        }
        await this.qmsEntryControlDetailsService.addQmsControlDetails(this.qmsEntryControlDetails, this.dQmsEntryControlDetails, this.materielId).subscribe(res => {
            if (res.body.status === '1') {

                this.qmsEntryControlDetails = [];
                this.dQmsEntryControlDetails = [];
                this.localStorage.store('editFlag', '0');
                this.loadAll();
                console.log('保存完毕');
            } else {
                console.log('保存失败');
                return false;
            }
        });
        if (saveflag === '1') {
            this.flag = '0';
        } else {
            this.flag = '1';
        }
        console.log(this.dQmsEntryControlDetails);
        return true;
    }

    openFile() {
        window.location.href = this.urldata + '/file/excel/entryControlDetails.xls';
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
            this.qmsEntryControlDetailsService.importExcelFile('/upload', event.target.files).subscribe(
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

    // 输入时查询物料
    searchMateriel() {
        this.qmsEntryControlDetailsService.findMateriel({
            materielCd: this.materielCd,
        }).subscribe((res) => {
            if (res !== null) {
                this.materielCd = res.materielCd;
                this.materielId = res.id;
                this.materielName = res.materielName;
            } else {
                this.materielId = '';
                this.materielName = '';
            }
        })
    }

    // 失去焦点时检查物料是否存在
    checkMateriel() {
        this.msgs = [];
        if (this.materielId === '') {
            if (this.materielCd !== '') {
                this.msgs.push({ severity: 'error', summary: 'error', detail: '物料不存在' });
            }
        } else {
        }
    }

    // 添加按钮点击事件
    add(index) {
        var qmsEntryControlDetail = new QmsEntryControlDetails();
        qmsEntryControlDetail.materielId = parseInt(this.materielId);
        qmsEntryControlDetail.flagStatus = '0';
        qmsEntryControlDetail.inspectionItem = null;
        qmsEntryControlDetail.inspectionInstrument = '';
        qmsEntryControlDetail.technicalRequirement = '';
        this.qmsEntryControlDetails.splice(index + 1, 0, qmsEntryControlDetail);
        this.onFocus = index;
    }

    // 删除按钮点击事件
    delete(index) { 
        this.msgs = [];
        console.log(this.dQmsEntryControlDetails);
        if (this.qmsEntryControlDetails[index].id !== undefined && this.qmsEntryControlDetails[index].id !== null) {
            let params = {
                materielId: this.materielId
            }
            this.http.get<any>(this.url + `/deleteCheck`, { params: params, observe: 'response' }).subscribe(res => {
                if (res.body.status === '1') {
                    this.dQmsEntryControlDetails.push(this.qmsEntryControlDetails[index]);
                    console.log(this.dQmsEntryControlDetails);
                    this.qmsEntryControlDetails.splice(index, 1);
                    // 如果数据为空加一条空白行
                    if (this.qmsEntryControlDetails.length === 0) {
                        var qmsEntryControlDetail = new QmsEntryControlDetails();
                        qmsEntryControlDetail.materielId = parseInt(this.materielId);
                        qmsEntryControlDetail.flagStatus = '0';
                        qmsEntryControlDetail.inspectionItem = null;
                        qmsEntryControlDetail.inspectionInstrument = '';
                        qmsEntryControlDetail.technicalRequirement = '';
                        this.qmsEntryControlDetails.push(qmsEntryControlDetail);
                    }
                } else {
                    this.msgs.push({ severity: 'error', summary: 'error', detail: '当前检验点数据已使用，不可删除' })
                    return;
                }
            })
        } else {
            this.qmsEntryControlDetails.splice(index, 1);
            if (this.qmsEntryControlDetails.length === 0) {
                var qmsEntryControlDetail = new QmsEntryControlDetails();
                qmsEntryControlDetail.materielId = parseInt(this.materielId);
                qmsEntryControlDetail.flagStatus = '0';
                qmsEntryControlDetail.inspectionItem = null;
                qmsEntryControlDetail.inspectionInstrument = '';
                qmsEntryControlDetail.technicalRequirement = '';
                this.qmsEntryControlDetails.push(qmsEntryControlDetail);
            }
        }
    }

    // 字典按钮点击事件
    inspectionSelect() {
        this.modalService.open(EntryInspectionSelectionComponent as Component, { backdrop: 'static', keyboard: false, size: 'lg' }).result.then(
            (result) => {
                if (result !== undefined) {
                    result.forEach(element => {
                        var qmsEntryControlDetail = new QmsEntryControlDetails();
                        qmsEntryControlDetail.materielId = parseInt(this.materielId);
                        qmsEntryControlDetail.flagStatus = '0';
                        qmsEntryControlDetail.inspectionItem = element.inspectionItem;
                        qmsEntryControlDetail.inspectionInstrument = element.inspectionInstrument;
                        qmsEntryControlDetail.technicalRequirement = element.technicalRequirement;
                        this.qmsEntryControlDetails.push(qmsEntryControlDetail);
                    });
                }
            }
        );
    }

    // 清空确认
    confirmEmpty() {
        this.confirmFlag = false;
        const a = this.modalService.open(ConfirmComponent as Component, { backdrop: 'static', keyboard: false, size: 'lg' }).result.then(
            (result) => {
                if (result) {
                    if (this.save('1')) {
                        this.confirmFlag = result;
                        this.materielCd = '';
                        this.materielName = '';
                        this.materielId = '';
                        this.flag = '0';
                        this.qmsEntryControlDetails = [];
                        this.localStorage.store('editFlag', '0');
                    }
                } else {
                    this.materielCd = '';
                    this.materielName = '';
                    this.materielId = '';
                    this.flag = '0';
                    this.qmsEntryControlDetails = [];
                    this.localStorage.store('editFlag', '0');
                }
            }
        );
    }

    // 检索确认
    confirmSearch() {
        this.confirmFlag = false;
        var _this = this;
        const a = this.modalService.open(ConfirmComponent as Component, { backdrop: 'static', keyboard: false, size: 'lg' }).result.then(
            (result) => {
                if (result) {
                    this.confirmFlag = result;
                    if (this.save('')) {
                        this.flag = '1';
                    }
                } else {
                    this.flag = '1';
                    _this.loadAll();
                }
            }
        );
    }
}
