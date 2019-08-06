import { Component, OnInit, ɵConsole } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpResponse, HttpErrorResponse, HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { MaterialSelectionComponent } from 'app/popup/materialSelection'
import { SupplierSelectionComponent } from 'app/popup/supplierSeletion'
import { MaterialSelectionInspectComponent } from 'app/popup/materialSelectionInpsect'
import { SupplierSelectionInspectComponent } from 'app/popup/supplierSeletionInspect'
import { IQmsMaterielEntry } from 'app/shared/model/qms-materiel-entry.model';
import { QmsMaterielEntryService } from './qms-materiel-entry-task.service';
import { NgbModal, NgbCalendar, NgbCalendarHebrew } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiParseLinks, JhiAlertService } from 'ng-jhipster';
import { QmsMaterielDetails } from 'app/shared/model/qms-materiel-details.model';
import { ConfirmComponent } from './confirm-dialog.component';
import { NgbDateAdapter, NgbDateStruct, NgbDateNativeAdapter } from '@ng-bootstrap/ng-bootstrap';
@Component({
    selector: 'jhi-qms-materiel-entry-update',
    templateUrl: './qms-materiel-entry-task-update.component.html',
    styleUrls: [
        './qms-materiel-entry-task.scss',
        './file.scss'
    ],
})
export class QmsMaterielEntryTaskUpdateComponent implements OnInit {
    msgs = [];
    diff = '2';
    headerData: any;
    qmsMaterielDetails = [];
    enclosures = [];
    qmsMaterielEntry: IQmsMaterielEntry;
    isSaving: boolean;
    makeTime: string;
    modifyTime: string;
    links: any;
    totalItems: any;
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
    materielId = '';
    materielCd = '';
    supplierId = '';
    supplierCd = '';
    materielName = '';
    supplierName = '';
    // 规格型号
    specificationType = '';
    // 图号
    figureNumber = '';
    // 包装数量
    packingQuantity = '';
    // 到货数量
    entryQuantity = '';
    // 到货类型
    entryType = '0';
    // 采购单号
    purchaseOrderNumber = '';
    // 原始批号/编号
    batchNumber = '';
    //制造年月
    madeYmd = '';
    // 制造厂代号
    madeFactoryCd = '';
    // 材质
    texTure = '';
    // 铸号
    castingNum = '';
    // 进场日期
    entryDate;
    flag = '1';
    rows: any[];
    tmpFiles = [];
    // 显示附件预览
    showModal = false;
    // acceptFile = 'image/jpeg,.pdf';
    acceptFile = 'image/jpeg,application/msword,application/pdf,audio/mpeg';
    deleteList = [];

    // 文件上传以上
    num: any;
    data: any;
    content: any;
    goMaterialSelect: boolean;
    video = new ArrayBuffer(10240);
    startMonth: string;
    startDay: string;
    startHH: string;
    startMM: string;
    startSS: string;

    dateValue: any;  
    constructor(private qmsMaterielEntryService: QmsMaterielEntryService, private activatedRoute: ActivatedRoute,
        private router: Router,
        private modalService: NgbModal,
        private parseLinks: JhiParseLinks,
        private jhiAlertService: JhiAlertService,
        private http: HttpClient,
    ) { }

    ngOnInit() {
        this.page = 1;
        this.queryCount = 0;
        this.itemsPerPage = 2;
        this.predicate = 'id';
        this.reverse = true;
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ qmsMaterielEntry }) => {
            this.qmsMaterielEntry = qmsMaterielEntry;
            if (this.qmsMaterielEntry.id === undefined) {
                // 添加
                this.diff = '1';
                var qmsMaterielDetail = new QmsMaterielDetails();
                qmsMaterielDetail.goodsQuantity = null;
                qmsMaterielDetail.goodsCd = '';
                this.qmsMaterielDetails.push(qmsMaterielDetail);
            } else {
                // 编辑
                this.diff = '2';
                this.loadAll();
                this.loadDetails();
                this.loadEnclosures();
            }
        });
    }

    // 加载上半部分数据
    loadAll() {
        this.qmsMaterielEntryService.editHeaderLoad({
            id: this.qmsMaterielEntry.id
        }).subscribe(res => {
            var data = res.body.result;
            // this.headerData = data;
            this.specificationType = data.specificationType;
            this.figureNumber = data.figureNumber;
            this.packingQuantity = data.packingQuantity;
            this.entryQuantity = data.entryQuantity;
            this.entryType = data.entryType;
            this.purchaseOrderNumber = data.purchaseOrderNumber;
            this.batchNumber = data.batchNumber;
            this.madeYmd = data.madeYmd;
            this.madeFactoryCd = data.madeFactoryCd;
            this.texTure = data.texTure;
            this.castingNum = data.castingNum;
            this.materielId = data.materielId;
            this.materielCd = data.materielCd;
            this.materielName = data.materielName;
            this.supplierId = data.supplierId;
            this.supplierCd = data.supplierCd;
            this.supplierName = data.supplierName;
            this.entryDate = new Date(data.entryDate);
            console.log(this.entryDate);
        })
    }

    // 加载明细部分数据
    loadDetails() {
        this.qmsMaterielEntryService.editDetailsLoad({
            id: this.qmsMaterielEntry.id,
        }).subscribe(res => {
            this.qmsMaterielDetails = res.body;
        })
    }

    // 加载附件表
    loadEnclosures() {
        this.qmsMaterielEntryService.enclosureLoad({
            id: this.qmsMaterielEntry.id,
        }).subscribe(res => {
            this.enclosures = res.body;
        })
    }

    sort() {
        const result = [this.predicate + ',' + (this.reverse ? 'asc' : 'desc')];
        if (this.predicate !== 'id') {
            result.push('id');
        }
        return result;
    }

    // 取消事件
    previousState() {
        if (this.flag === '2') {
            const a = this.modalService.open(ConfirmComponent as Component, { backdrop: 'static', keyboard: false, size: 'lg' }).result.then(
                (result) => {
                    if (result) {
                        this.save();
                    } else {
                        this.router.navigate(['/qms-materiel-entry']);
                    }
                }
            );
        } else {
            this.router.navigate(['/qms-materiel-entry']);
        }
    }

    private paginateQmsMaterielDetails(data: any, headers: HttpHeaders) {
        this.links = this.parseLinks.parse(headers.get('link'));
        this.totalItems = parseInt(headers.get('X-Total-Count'), 10);
        this.queryCount = this.totalItems;
        this.qmsMaterielDetails = data;
        if (this.qmsMaterielDetails.length < 2) {
            for (var i = 0; i < (2 - this.qmsMaterielDetails.length); i++) {
                var qmsMaterielDetail = new QmsMaterielDetails();
                qmsMaterielDetail.goodsQuantity = null;
                qmsMaterielDetail.goodsCd = '';
                this.qmsMaterielDetails.push(qmsMaterielDetail);
            }
        }
    }

    save() {
        let flag = this.entryDetailsCheck();
        this.entryQuantity = '0';
        this.qmsMaterielDetails.forEach(element => {
            this.entryQuantity = (parseInt(this.entryQuantity) + parseInt(element.goodsQuantity)).toString();
        });
        if (flag) {
            let enclosureAddressList = this.enclosures;
            let time = this.timeback();
            let i = 0;
            enclosureAddressList.forEach(element => {
                enclosureAddressList[i].enclosureAddress = time + '/' + element.enclosureAddress.substr(element.enclosureAddress.lastIndexOf('/') + 1);
                i++;
            });
            this.qmsMaterielEntryService.save({
                id: this.qmsMaterielEntry.id,
                specificationType: this.specificationType,
                figureNumber: this.figureNumber,
                packingQuantity: this.packingQuantity,
                entryQuantity: this.entryQuantity,
                entryType: this.entryType,
                purchaseOrderNumber: this.purchaseOrderNumber,
                batchNumber: this.batchNumber,
                madeYmd: this.madeYmd,
                madeFactoryCd: this.madeFactoryCd,
                texTure: this.texTure,
                castingNum: this.castingNum,
                materielId: this.materielId,
                supplierId: this.supplierId,
                entryDate: new Date(this.entryDate),
                qmsMaterielDetails: this.qmsMaterielDetails,
                enclosures: enclosureAddressList,
                deleteList: this.deleteList,
            }).subscribe(res => {
                if (res.body.status === '1') {
                    this.router.navigate(['/qms-materiel-entry']);
                } else {
                    this.msgs.push({ severity: 'error', summary: 'error', detail: '保存失败' })
                }
            })
        }
    }

    private entryDetailsCheck() {
        this.msgs = [];
        if (this.materielId === '') {
            this.msgs.push({ severity: 'error', summary: 'error', detail: '请选择物料' });
            return false;
        }
        if (this.supplierId === '') {
            this.msgs.push({ severity: 'error', summary: 'error', detail: '请选择供应商' });
            return false;
        }
        console.log(this.packingQuantity);
        console.log(this.packingQuantity !== '');
        if (this.packingQuantity !== '') {
            if (isNaN(parseInt(this.packingQuantity))) {
                this.msgs.push({ severity: 'error', summary: 'error', detail: '包装数量不为整数' });
                return false;
            }
            if (this.packingQuantity.indexOf('-') !== -1) {
                this.msgs.push({ severity: 'error', summary: 'error', detail: '包装数量不能输入负数' });
                return false;
            }
        }
        if (this.entryQuantity !== '') {
            if (isNaN(parseInt(this.entryQuantity))) {
                this.msgs.push({ severity: 'error', summary: 'error', detail: '到货数量不为整数' });
                return false;
            }
            if (this.entryQuantity.indexOf('-') !== -1) {
                this.msgs.push({ severity: 'error', summary: 'error', detail: '到货数量不能输入负数' });
                return false;
            }
        }
        for (var i = 0; i < this.qmsMaterielDetails.length; i++) {
            if (this.qmsMaterielDetails[i].id === undefined) {
                if (this.qmsMaterielDetails[i].goodsCd === '') {
                    this.qmsMaterielDetails.splice(i, 1);
                    i--;
                } else {
                    if (this.entryType === '0') {
                        if (this.qmsMaterielDetails[i].goodsQuantity !== 1 && this.qmsMaterielDetails[i].goodsQuantity !== '1') {
                            this.msgs.push({ severity: 'error', summary: 'error', detail: '到货类型为单件,数量只能输入1' })
                            return false;
                        }
                    }
                }
            } else {
                if (this.entryType === '0') {
                    if (this.qmsMaterielDetails[i].goodsQuantity !== 1 && this.qmsMaterielDetails[i].goodsQuantity !== '1') {
                        this.msgs.push({ severity: 'error', summary: 'error', detail: '到货类型为单件,数量只能输入1' })
                        return false;
                    }
                }
                if (this.qmsMaterielDetails[i].goodsCd === '') {
                    this.msgs.push({ severity: 'error', summary: 'error', detail: '单件号不能为空' });
                    return false;
                } else {
                    if (this.qmsMaterielDetails[i].goodsQuantity === '') {
                        this.msgs.push({ severity: 'error', summary: 'error', detail: '数量不能为空' });
                        return false;
                    }
                }
            }
        }
        return true;
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    // private subscribeToSaveResponse(result: Observable<HttpResponse<IQmsMaterielEntry>>) {
    //     result.subscribe((res: HttpResponse<IQmsMaterielEntry>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    // }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
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

    loadCarsLazy(event) {
        if (event === '1') {
            this.queryCount = this.queryCount + 2;
            this.page = (this.queryCount / this.itemsPerPage) + 1;
            this.qmsMaterielDetails = [];
            if (this.qmsMaterielDetails.length < 2) {
                for (var i = 0; i < (2 - this.qmsMaterielDetails.length); i++) {
                    var qmsMaterielDetail = new QmsMaterielDetails();
                    qmsMaterielDetail.goodsQuantity = null;
                    qmsMaterielDetail.goodsCd = '';
                    this.qmsMaterielDetails.push(qmsMaterielDetail);
                }
            }
        } else {
            this.page = event.first / this.itemsPerPage + 1;
            this.loadDetails();
        }
    }

    edit() {
        this.flag = '2';
    }

    add() {
        var qmsMaterielDetail = new QmsMaterielDetails();
        qmsMaterielDetail.goodsQuantity = null;
        qmsMaterielDetail.goodsCd = '';
        this.qmsMaterielDetails.push(qmsMaterielDetail);
    }

    countCheck(count, i) {
        if (this.entryType === '0') {
            if (count.goodsQuantity !== '1' && count.goodsQuantity !== 1 && (count.goodsCd !== '')) {
                this.msgs.push({ severity: 'error', summary: 'error', detail: '到货类型为单件,数量只能输入1' });
            }
        }
        if (this.entryType !== '0') {
            if (isNaN(count.goodsQuantity) || count.goodsQuantity.indexOf('-') !== -1 || count.goodsQuantity.indexOf('.') !== -1) {
                this.msgs.push({ severity: 'error', summary: 'error', detail: '数量应该为正整数' });
            }
        }
        if ((i + 1) === this.qmsMaterielDetails.length && this.qmsMaterielDetails[i].goodsCd !== '' && this.qmsMaterielDetails[i].goodsCd !== null && this.qmsMaterielDetails[i].goodsQuantity !== '' && this.qmsMaterielDetails[i].goodsQuantity !== null) {
            var qmsMaterielDetail = new QmsMaterielDetails();
            qmsMaterielDetail.goodsQuantity = null;
            qmsMaterielDetail.goodsCd = '';
            this.qmsMaterielDetails.push(qmsMaterielDetail);
        }
    }

    select() {
        document.getElementById('file').click();
    }

    tmpSaveFile(e) {
        let files = [];
        let fnames = [];
        for (const df of this.enclosures) {
            fnames.push(df['enclosureAddress']);
        }
        for (const f of e.target.files) {
            if (fnames.indexOf(f.name) < 0) {
                this.tmpFiles.push(f);
                files.push(f);
            }
        }
        if (files != null && files.length > 0) {
            for (const file of files) {
                this.enclosures.push(
                    {
                        enclosureAddress: file.name
                    }
                )
            }
        }
    }

    viewFile(id) {
        // const id = '1561529455565.doc';
        const imgType = 'jpg,JPG,jpeg,JPEG,png,PNG,bmp,BMP';
        const videoType = 'mp4,rmvb,flv,avi,mkv,MP4,RMVB,FLV,AVI,MKV';
        // const docType = 'doc,docx,DOC,DOCX';
        const pdfType = 'pdf,PDF,doc,docx,DOC,DOCX';
        const fileType = id.substr(id.lastIndexOf('.') + 1);
        let mediaNode = null;
        const params = { fileId: id };
        this.showModal = true;
        document.getElementById('previewTitle').innerText = id;
        if (imgType.indexOf(fileType) >= 0 || videoType.indexOf(fileType) >= 0 || pdfType.indexOf(fileType) >= 0) {
            if (imgType.indexOf(fileType) >= 0) {
                mediaNode = document.createElement('img');
                mediaNode['style'] = 'width:60%;margin-left:20%;';
            } else if (videoType.indexOf(fileType) >= 0) {
                mediaNode = document.createElement('video');
                mediaNode['controls'] = 'controls';
                mediaNode['style'] = 'height:100%;margin-left:20%;';
            } else if (pdfType.indexOf(fileType) >= 0) {
                mediaNode = document.createElement('embed');
                mediaNode['style'] = 'width:100%;height:100%;';
            }
            this.http.get('http://192.168.86.165:8082/imgServer/viewFile', { responseType: 'blob', params }).subscribe(
                data => {
                    mediaNode.src = URL.createObjectURL(data);
                    document.getElementById('previewContent').appendChild(mediaNode);
                }
            );
        }
        // else if (docType.indexOf(fileType) >= 0) {
        //   this.http.get('http://localhost:8082/imgServer/viewFile', { responseType: 'text', params }).subscribe(
        //     vdata => {
        //       const docNode = document.createElement('div');
        //       docNode.innerHTML = vdata;
        //       document.getElementById('previewContent').appendChild(docNode);
        //     }
        //   );
        // } 
        else {
            return;
        }
        // const params = { fileId: '"C:/Users/DL0787/Desktop/12345.docx"' };
    }

    // 以下文件上传
    closePreview() {
        document.getElementById('previewContent').innerHTML = '';
        this.showModal = false;
    }

    delete(index) {
        if (this.enclosures[index].id !== undefined) {
            this.deleteList.push(this.enclosures[index]);
        }
        this.enclosures.splice(index, 1);
    }

    timeback() {
        const d = new Date();
        if (d.getMonth() + 1 < 10) {
            this.startMonth = '0' + (d.getMonth() + 1);
        } else {
            this.startMonth = '' + (d.getMonth() + 1);
        }
        if (d.getDate() < 10) {
            this.startDay = '0' + d.getDate();
        } else {
            this.startDay = '' + d.getDate();
        }
        if (d.getHours() < 10) {
            this.startHH = '0' + d.getHours();
        } else {
            this.startHH = '' + d.getHours();
        }
        if (d.getMinutes() < 10) {
            this.startMM = '0' + d.getMinutes();
        } else {
            this.startMM = '' + d.getMinutes();
        }
        if (d.getSeconds() < 10) {
            this.startSS = '0' + d.getSeconds();
        } else {
            this.startSS = '' + d.getSeconds();
        }

        const fileName = d.getFullYear() + this.startMonth + this.startDay + this.startHH + this.startMM + this.startSS;

        return fileName;
    }
}
