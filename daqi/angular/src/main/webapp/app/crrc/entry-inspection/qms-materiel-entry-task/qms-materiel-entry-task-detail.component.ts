import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { IQmsMaterielEntry } from 'app/shared/model/qms-materiel-entry.model';
import { QmsMaterielEntryService } from './qms-materiel-entry-task.service';
import { HttpClient } from '@angular/common/http';
import { NgbDateAdapter, NgbDateNativeAdapter } from '@ng-bootstrap/ng-bootstrap';
@Component({
    selector: 'jhi-qms-materiel-entry-detail',
    templateUrl: './qms-materiel-entry-task-detail.component.html',
    styleUrls: [
        './qms-materiel-entry-task.scss',
        './file.scss'
    ],
    providers: [{provide: NgbDateAdapter, useClass: NgbDateNativeAdapter}]
})
export class QmsMaterielEntryTaskDetailComponent implements OnInit {
    qmsMaterielEntry: IQmsMaterielEntry;
    qmsMaterielDetails = [];
    enclosures = [];
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
    constructor(private activatedRoute: ActivatedRoute,
        private router: Router,
        private qmsMaterielEntryService: QmsMaterielEntryService,
        private http: HttpClient
    ) { }

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ qmsMaterielEntry }) => {
            this.qmsMaterielEntry = qmsMaterielEntry;
            this.loadAll();
            this.loadDetails();
            this.loadEnclosures();
        });
    }

    previousState() {
        this.router.navigate(['/qms-materiel-entry']);
    }

    // 加载上半部分数据
    loadAll() {
        this.qmsMaterielEntryService.editHeaderLoad({
            id: this.qmsMaterielEntry.id
        }).subscribe(res => {
            console.log(res.body);
            var data = res.body.result;
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
            this.materielCd = data.materielCd;
            this.materielName = data.materielName;
            this.supplierCd = data.supplierCd;
            this.supplierName = data.supplierName;
            this.entryDate = new Date(data.entryDate);
        })
    }

    // 加载明细部分数据
    loadDetails() {
        this.qmsMaterielEntryService.editDetailsLoad({
            id: this.qmsMaterielEntry.id,
        }).subscribe(res => {
            console.log(res.body);
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

    closePreview() {
        document.getElementById('previewContent').innerHTML = '';
        this.showModal = false;
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
                    console.log(data);
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

    showDate() {
        console.log(this.entryDate);
    }
}
