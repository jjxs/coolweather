import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Message } from 'primeng/components/common/api';
import { MessageService } from 'primeng/api';
import { Md5 } from "ts-md5/dist/md5";
import { SERVER_API_URL } from 'app/app.constants';
import { QmsProductComponent } from '../../../popup/productSelection/qms-product.component'
import { MaterielDetailsSelectionComponent } from '../../../popup/materielDetailsSelection/materielDetailsSelection.component'
import { IQmsProductionInspection } from 'app/shared/model/qms-production-inspection.model';
import { IQmsPartsAssemblyRelation } from 'app/shared/model/qms-parts-assembly-relation.model';
import { QmsProductionInspectionValue } from 'app/shared/model/qms-production-inspection-value.model';
import { QmsProductionInspectionSelfService } from './qms-production-inspection.self.service';


@Component({
    selector: 'jhi-self-check-update',
    templateUrl: './self-check-update.component.html',
    styleUrls: [
        './productProcessSelf.scss',
        './file.scss'
    ],
    providers: [MessageService]
})
export class QmsProductionInspectionUpdateSelfComponent implements OnInit {
    // 生产检验表数据
    qmsProductionInspection: any;
    // 工序质量控制点详细表
    qmsQualityControlDetails: any[];
    // 工序装配关系表
    qmsPartsAssemblyRelation: any[];
    // 生产检验结果表
    qmsProductionInspectionValue: QmsProductionInspectionValue;
    // 工序质量控制点详细 错误集合
    qualityControlDetailsErrorSet = new Set();
    // 错误集合
    errorList = new Array();

    isSaving: boolean;
    // 错误信息
    msgs: Message[] = [];
    // label信息
    labelTitle: any;
    // 管理人
    makeUser: any

    // 不合格品管理表  质量检查项目级别
    controlLevel: string;
    // 检验编号
    checkNumber: number;
    // 合格区分名
    isOkName: string;
    // 编辑区分
    editDistinguish = false;
    // 来源名称
    productModeName: string;

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
    showModal: boolean;
    docHtml: any;
    digiFiles: any;
    uploading: boolean;
    @Output() closeModal = new EventEmitter<boolean>();

    predicate: any;
    previousPage: any;
    reverse: any;
    queryParams: any;
    acceptFile: any;
    onDelete: any;
    confirmModal: any;
    checkReturn: any;
    infoId: any;
    isEdit: boolean;
    filePath: any;
    tmpFiles: any;
    itemsPerPage: any;
    ipAddress: any;

    constructor(
        private http: HttpClient,
        private translate: TranslateService,
        private router: Router,
        private qmsProductionInspectionService: QmsProductionInspectionSelfService,
        private activatedRoute: ActivatedRoute,
        private modalsService: NgbModal,
        private messageService: MessageService,
    ) {
        this.controlLevel = 'C';
        this.tmpFiles = [];
        this.num = 0;
        this.content = '';
        this.goMaterialSelect = false;
        this.showModal = false;
        this.docHtml = '';
        this.digiFiles = [];
        this.uploading = false;
        this.acceptFile = 'image/jpeg,application/msword,application/pdf,audio/mp4,video/mp4';
        this.onDelete = [];
        this.confirmModal = false;
        this.checkReturn = {};
        this.filePath = 'DqPSelfCheckFile/';
        this.itemsPerPage = 999;
    }

    // 服务器Ip
    getServiceIp() {
        const params = {
            kbnCd: "M18"
        }
        this.http.get(SERVER_API_URL + 'api/qms-materiels/master', { params }).subscribe(
            data => {
                console.log("ip",data[0].label)
                this.ipAddress = data[0].label
                // this.checkStatus = data;
                // this.isOk = '1';
            }
        );
    }

    ngOnInit() {

        this.isSaving = false;

        this.labelTitle = {
            'tab1': '质量检验项目',
            'tab2': '装配物料',
            'tab3': '上传附件',
        };
        this.getServiceIp()

        this.activatedRoute.data.subscribe(({ qmsProductionInspection }) => {
            this.qmsProductionInspection = qmsProductionInspection;

    
            // 编辑区分
            const param ={
                inspectionId: qmsProductionInspection.id,
                inspectionDiff: 'C'
            }

            this.qmsProductionInspectionService.editDistinguish(param).subscribe(data => {
                if( data.body.code === 0) {
                    this.editDistinguish = true;
                }
            })

            // 合格区分名称设置
            if (qmsProductionInspection.isOk == '0') {
                this.isOkName = "未检验"
            } else if (qmsProductionInspection.isOk == '1') {
                this.isOkName = "合格"
            } else if (qmsProductionInspection.isOk == '2') {
                this.isOkName = "不合格"
            }

            // 获取一览数据
            this.findQmsQualityControlDetailsByTechId()
        });
    }

    // 弹出子画面
    goPop(rowData, index) {
        if (rowData.productMode === 'M') {
            this.modalsService.open(QmsProductComponent as Component, { backdrop: 'static', keyboard: false, windowClass: 'modal-xl', size: 'lg' }).result.then(
                (result) => {
                    if (result !== undefined) {

                        this.qmsPartsAssemblyRelation[index].bianHao = result.productNum
                        this.qmsPartsAssemblyRelation[index].hid = result.id
                    }
                }
            );
        } else {
            const param = { 'materielId': rowData.materielId };
            const modalRef = this.modalsService.open(MaterielDetailsSelectionComponent as Component, { backdrop: 'static', keyboard: false, size: 'lg' });
            modalRef.componentInstance.paramInfo = param;
            modalRef.result.then(
                (result) => {
                    this.qmsPartsAssemblyRelation[index].bianHao = result.goodsCd
                    this.qmsPartsAssemblyRelation[index].hid = result.id
                    this.qmsPartsAssemblyRelation[index].madeFactoryCd = result.madeFactoryCd
                    this.qmsPartsAssemblyRelation[index].madeYmd = result.madeYMD
                }
            );
        }
    }

    // 以下文件上传
    closePreview() {
        document.getElementById('previewContent').innerHTML = '';
        this.showModal = false;
    }

    // 选择文件
    tmpSaveFile(e) {
        let files = [];
        let fnames = [];
        console.log("dig", this.digiFiles)
        for (const df of this.digiFiles) {
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
                this.digiFiles.push(
                    {
                        enclosureAddress: file.name
                    }
                )
            }
        }
    }

    deleteReady(enclosureAddress, index) {
        this.confirmModal = true;
        this.onDelete.push(enclosureAddress);
        if (this.editDistinguish && (this.digiFiles[index].id !== undefined && this.digiFiles[index].id !== null && this.digiFiles[index].id !== '')) {

            this.deleteFile(this.digiFiles[index].id);
            this.deleteTmp(index, enclosureAddress);
        } else {
            this.deleteTmp(index, enclosureAddress);
        }
        // this.messageService.clear();
        // this.messageService.add({ key: 'c', sticky: true, severity: 'warn', summary: '确认删除?', detail: '点击确认以继续' });

    }
    /**
     * 文件删除服务器相关信息
     */
    deleteFile(id) {

        if (!this.onDelete || this.onDelete == null || this.onDelete.length == 0) // 无选择则不执行删除
            return;
        for (const enclosureAddress of this.onDelete) {
            this.messageService.clear();

            const params = {
                inspectionInfoId: id.toString(),
                inspectionKbn: '1',
                enclosureAddress: enclosureAddress
            }
            this.http.get(SERVER_API_URL + 'api/process-informations-infos/deleteFile', { params }).subscribe(
                data => {
                    console.log(data);
                    if (data) {
                        const delParams = { fileId:  enclosureAddress };
                        this.http.get(this.ipAddress+ '/imgServer/deleteFile', { params: delParams }).subscribe(
                            data => {
                                console.log(data);
                                if (data) {
                                }
                            }
                        );
                    }
                }
            );
        }
    }
    deleteTmp(index, enclosureAddress) {
        this.digiFiles.splice(index, 1);

        for (let a = 0; a < this.tmpFiles.length; a++) {

            if (this.tmpFiles[a].name === enclosureAddress) {
                this.tmpFiles.splice(a, 1);
                break;
            }

        };
        this.tmpFiles.name.splice(enclosureAddress, 1);
        this.confirmModal = false;
        this.messageService.clear();
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
            this.http.get(this.ipAddress + '/imgServer/viewFile', { responseType: 'blob', params }).subscribe(
                data => {
                    console.log(data);
                    mediaNode.src = URL.createObjectURL(data);
                    document.getElementById('previewContent').appendChild(mediaNode);
                }
            );
        }
    }

    uploadFlowFiles(id) {
        console.log('开始上传文件')
        const files = this.tmpFiles;
        
        // this.messageService.clear();
        this.messageService.add({ severity: 'info', summary: '正在上传...', detail: '' });
        this.uploading = true;
        // console.log(e.target.files);
        // const files = e.target.files;
        for (const file of files) {
            if (file.size > 1204 * 1024 * 30) {
                alert('File oversize!');
                return;
            }
        }
        // // const body = {data: files};
        // this.uploadData = new FormData();
        // this.uploadData.append('file', files);
        // return this.http.put('http://123.59.250.196:8181/imgServer/upLoadAllImage', this.uploadData, { responseType: 'text' });
        // 设置数据
        const formData: FormData = new FormData();
        const fileLength = files.length;
        for (let index = 0; index < fileLength; index++) {
            const singleFile = files[index];
            formData.append('picture', singleFile);
        }
        //  formData.append('picture', files[0]);

        const options = {
            filePath: '',
            width: 500,
            height: 500
        };
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
        const newDate = d.getFullYear() + '-' + this.startMonth + '-' + this.startDay + ' ' + this.startHH + ':' + this.startMM + ':' + this.startSS;

        const jsonParam = JSON.stringify({
            date: newDate,
            token: Md5.hashStr(newDate + 'reqhtl' + 'reqhtlp'),
            param: options
        });

        formData.append('jsonParam', jsonParam);

        const param = { picture: files, jsonParam: jsonParam };
        // Padding.zeroPadding.add(to: "Cncsys".bytes, blockSize: 16)
        // formData.append('subPath', location.hash.slice(location.hash.indexOf('/') + 1, -1) + '/');
        formData.append('subPath', this.filePath);

        this.http.post('http://localhost:8082/imgServer/upLoadAllImage', formData).subscribe(
            data => {
                console.log(data);
                if (data['errCode'] == '0000') {
                    data['id'] = id;
                    this.updateEnclosureDB(data);
                }
                else
                    alert('Upload Failed');
                this.uploading = false;
            }
        );
    }
    
    async updateEnclosureDB(data) {
        this.msgs = [];
        // id = '1561037665794.docx';
        // this.digiFiles.splice(index, 1);
        // const params = { fileId: location.hash.slice(location.hash.indexOf('/') + 1, -1) + '/' + id };
        // console.log(params);
        let params = {}
        for (let i = 0; i < data['retMsg'].length; i++) {
            let file = data['retMsg'][i]['Url'].substr(data['retMsg'][i]['Url'].lastIndexOf('/') + 1);
            params = {
                inspectionInfoId: data['id'],
                inspectionKbn: '2',
                enclosureAddress: this.filePath + file
            }
            try {
                await this.http.get(SERVER_API_URL + 'api/process-informations-infos/uploadFile', { params }).subscribe(
                    data => {
                        console.log(data);
                        this.previousState();
                        // this.getFileList();
                        // this.messageService.clear();

                        this.msgs.push({ severity: 'success', summary: '上传成功', detail: file });
                    }
                );
            } catch (error) {
                // this.messageService.clear();

                this.msgs.push({ severity: 'error', summary: '上传失败', detail: file });
                continue;
            }
        }
    }

    previousState() {
        this.router.navigate(['/productProcessSelfCheck']);
    }


    // 质量检验check
    qualityInspectionCheck() {
        this.qualityControlDetailsErrorSet = new Set()
        this.errorList = new Array();

        // 实测值是否填写
        for (var i = 0; i < this.qmsQualityControlDetails.length; i++) {
            if (this.qmsQualityControlDetails[i].testValue === null || this.qmsQualityControlDetails[i].testValue.toString() == '') {
                this.msgs.push({ severity: 'error', summary: '提示', detail: '实测值不能为空!' });
                return
            }
        }

        // 实测值是否合格
        for (var i = 0; i < this.qmsQualityControlDetails.length; i++) {
            // 数字区分
            if (this.qmsQualityControlDetails[i].inspectionResultDiff == '0') {
                if (this.qmsQualityControlDetails[i].upperDeviation !== null) {
                    if (this.qmsQualityControlDetails[i].testValue > this.qmsQualityControlDetails[i].standard + this.qmsQualityControlDetails[i].upperDeviation) {
                        // this.msgs.push({ severity: 'error', summary: '提示', detail: '存在数据不符合技术要求!' });
                        this.qualityControlDetailsErrorSet.add(i)
                    }
                }

                if (this.qmsQualityControlDetails[i].lowerDeviation !== null) {
                    if (this.qmsQualityControlDetails[i].testValue < this.qmsQualityControlDetails[i].standard - this.qmsQualityControlDetails[i].lowerDeviation) {
                        // this.msgs.push({ severity: 'error', summary: '提示', detail: '存在数据不符合技术要求!' });
                        this.qualityControlDetailsErrorSet.add(i)
                    }
                }

            } else {
                if (this.qmsQualityControlDetails[i].testValue.toString() == 'N') {
                    this.qualityControlDetailsErrorSet.add(i)
                }
            }
        }
    }

    // 获取一览数据
    findQmsQualityControlDetailsByTechId () {
        // 质量检验项目
        this.qmsProductionInspectionService
        .findQmsQualityControlDetailsByTechId({ pid: this.qmsProductionInspection.id })
        .subscribe(data => {
            this.qmsQualityControlDetails = data.body;

            // 检查人
            if (this.qmsQualityControlDetails.length > 0) {
                this.makeUser = this.qmsQualityControlDetails[0].makeUser;
            }
            this.qualityInspectionCheck()
        })

        // 装配
        this.qmsProductionInspectionService
            .findAssemblyRelationByTechId({ pid: this.qmsProductionInspection.id })
            .subscribe(data => {
                this.qmsPartsAssemblyRelation = data.body;
        })
        
        // 获取附件列表
        this.qmsProductionInspectionService
            .obtainFile({ qmsProductionInspectionId: this.qmsProductionInspection.id })
            .subscribe(data => {
                this.digiFiles = data.body;
        })
        
    }



    save() {
        // 向生产检验结果表插入数据
        this.qmsProductionInspectionValue = new QmsProductionInspectionValue();
        this.qmsProductionInspectionValue.isOk = this.qualityControlDetailsErrorSet.size !== 0? "0": "1"
        this.qmsProductionInspectionValue.inspectionDiff = "C"
        this.qmsProductionInspectionValue.inspectionId = this.qmsProductionInspection.id
        this.qmsProductionInspectionValue.checkNumber = this.qmsProductionInspection.checkNumber
        this.qmsProductionInspectionValue.flagStatus = "0"

        // 装配check
        this.qmsProductionInspectionService.checkProductionRelation({params: this.qmsPartsAssemblyRelation}).subscribe(data => {

            if (data.body.result === '2') {
                this.msgs.push({ severity: 'error', summary: '提示', detail: '装配重复使用!' });
            }else if(data.body.result === '1') {
                
                const params = {
                    qpi : this.qmsProductionInspection, // 生成检验数据
                    errorList: this.errorList,          // 不合格集合
                    controlLevel: this.controlLevel,    // 不合格等级
                    qpar: this.qmsPartsAssemblyRelation,// 装配关系
                    qqcd: this.qmsQualityControlDetails, // 工序质量控制点详细表
                    qpiv: this.qmsProductionInspectionValue // 生产检验结果数据
                }   
                this.qmsProductionInspectionService.saveAll(params).toPromise().then(data => {
                    if (data.body.code === "2") {
                        this.msgs.push({ severity: 'error', summary: '提示', detail: '超出入厂单件数量!' });
                    }

                    

                    // 上传附件
                    if (data.body.valueId !=='' && data.body.code === '1' && this.tmpFiles.length >= 0) {
                        this.uploadFlowFiles(data.body.valueId)
                    }else {
                        if (this.qualityControlDetailsErrorSet.size === 0 && data.body.code === "1") {
                            this.previousState()
                        }

                        this.qualityControlDetailsErrorSet = new Set()
                        this.errorList = new Array();
                        this.findQmsQualityControlDetailsByTechId()
                    }
                    

                    
                })
            }
        })
    }

    check() {
        const files = this.tmpFiles;

        if (files.length <= 0) {
            // this.router.navigate(['/process-informations']);
            document.getElementById('cancel-save').click();
        } else if (files.length > 5) {
            this.messageService.add({ severity: 'error', summary: '最多上传5个文件', detail: '' });
            return;
        }

        // 检验编号check
        if (this.qmsProductionInspection.checkNumber == undefined || this.qmsProductionInspection.checkNumber == null) {
            this.msgs.push({ severity: 'error', summary: '提示', detail: '请输入检验编号!' });
            return
        }

        if (isNaN(this.qmsProductionInspection.checkNumber)) {
            this.msgs.push({ severity: 'error', summary: '提示', detail: '检验编号不正确!' });
            return
        }


        // 实测值是否填写
        for (var i = 0; i < this.qmsPartsAssemblyRelation.length; i++) {
            if (this.qmsPartsAssemblyRelation[i].bianHao === null || this.qmsPartsAssemblyRelation[i].bianHao.toString() == '') {
                this.msgs.push({ severity: 'error', summary: '提示', detail: '编号不能为空!' });
                return
            }
        }

        this.qualityInspectionCheck()

        // 把不合格信息放到集合里
        if (this.qualityControlDetailsErrorSet.size > 0) {
            this.msgs.push({ severity: 'error', summary: '提示', detail: '存在数据不符合技术要求!' });
            const _this = this;
            this.qualityControlDetailsErrorSet.forEach(function (element : number, sameElement, set) {

                if (_this.controlLevel === 'A') {
                    return
                }

                if (_this.qmsQualityControlDetails[element].abcType === 'B') {
                    _this.controlLevel = 'B'
                }

                if (_this.qmsQualityControlDetails[element].abcType === 'A') {
                    _this.controlLevel = 'A'
                    return
                }
            })
            this.qualityControlDetailsErrorSet.forEach(function (element : number, sameElement, set) {
                _this.errorList.push(_this.qmsQualityControlDetails[element])
            })
        }

        this.save()

        

        // this.qmsProductionInspectionService.createProductionRelation(
        //         {   list: this.qmsPartsAssemblyRelation,
        //             pid: this.qmsProductionInspection.id,
        //             mid: this.qmsProductionInspection.materielId,
        //             serialNumber: this.qmsProductionInspection.serialNumber
        //         }
        //     ).subscribe(data => {
        //         console.log("data", data)

        //         if (data.body.result.code === '0') {
        //             this.msgs.push({ severity: 'error', summary: '提示', detail: '超出入厂单件数量!' });
        //         }
        // })
        


        

        


        


        // 存在不合格数据
        // if (this.qualityControlDetailsErrorSet.size > 0) {
        //     this.msgs.push({ severity: 'error', summary: '提示', detail: '存在数据不符合技术要求!' });
        //     const _this = this;
        //     this.qualityControlDetailsErrorSet.forEach(function (element : number, sameElement, set) {

        //         if (_this.controlLevel === 'A') {
        //             return
        //         }

        //         if (_this.qmsQualityControlDetails[element].abcType === 'B') {
        //             _this.controlLevel = 'B'
        //         }

        //         if (_this.qmsQualityControlDetails[element].abcType === 'A') {
        //             _this.controlLevel = 'A'
        //             return
        //         }
        //     })

            

        //     const params = {
        //         bomTechnologyId: this.qmsProductionInspection.bomTechnologyId,
        //         processId: this.qmsProductionInspection.processId,
        //         materielId: this.qmsProductionInspection.materielId,
        //         controlLevel: this.controlLevel,
        //         serialNumber: this.qmsProductionInspection.serialNumber,
        //         furnace: this.qmsProductionInspection.furnace
        //     }

        //     // 新增一条到不合格品管理表		
        //     this.qmsProductionInspectionService.createQmsUnqualifiedProduct(params).subscribe(data => {

        //         // 根据返回的ip 批量插入到不合格品明细管理表
        //         this.qualityControlDetailsErrorSet.forEach(function (element : number, sameElement, set) {
        //             const params = {
        //                 unqualifiedProductId: data.body.unqualifiedProductId,
        //                 inspectionItem: _this.qmsQualityControlDetails[element].inspectionItem,
        //                 inspectionInstrument: _this.qmsQualityControlDetails[element].inspectionInstrument,
        //                 checkResult: _this.qmsQualityControlDetails[element].testValue,
        //                 upperDeviation: _this.qmsQualityControlDetails[element].upperDeviation,
        //                 lowerDeviation: _this.qmsQualityControlDetails[element].lowerDeviation,
        //                 abcType: _this.qmsQualityControlDetails[element].abcType,
        //             }
        //             _this.qmsProductionInspectionService.createQmsUnqualifiedProductDetails(params).subscribe(data => {
        //             })
        //         })
        //     })
        // } 
        

        // if (this.qmsQualityControlDetails.length !== 0) {

        //     // 判断结果表是否有数据确认是新增还是更新
        //     if (this.qmsQualityControlDetails[0].resultId === null) {
        //         // 向结果表插入数据
        //         this.qmsProductionInspectionService.createQmsProductionInspectionResult({params: this.qmsQualityControlDetails}).subscribe(data => {
                    
        //             // 获取一览数据
        //             this.findQmsQualityControlDetailsByTechId()
        //         })

        //         // 向生产检验结果表插入数据
        //         this.qmsProductionInspectionValue = new QmsProductionInspectionValue();
        //         this.qmsProductionInspectionValue.isOk = this.qualityControlDetailsErrorSet.size !== 0? "0": "1"
        //         this.qmsProductionInspectionValue.inspectionDiff = "C"
        //         this.qmsProductionInspectionValue.inspectionId = this.qmsProductionInspection.id
        //         this.qmsProductionInspectionValue.checkNumber = this.checkNumber
        //         this.qmsProductionInspectionValue.flagStatus = "0"
        //         this.qmsProductionInspectionService.createQmsProductionInspectionValue(this.qmsProductionInspectionValue).subscribe(data => {})
        //     }else {


        //         const params  = {
        //             checkNumber: this.checkNumber,
        //             inspectionId: this.qmsProductionInspection.id,
        //             inspectionDiff: "C",
        //             isOk: this.qualityControlDetailsErrorSet.size !== 0? "0": "1"
        //         }

        //         this.qmsProductionInspectionService.updateQmsProductionInspectionValues(params).subscribe(data => {})

        //         this.qmsProductionInspectionService.updateQmsProductionInspectionResult({params: this.qmsQualityControlDetails}).subscribe(data => {
                    
        //             // 获取一览数据
        //             this.findQmsQualityControlDetailsByTechId()
        //         })
        //     }
        // }
        

        // if (this.qualityControlDetailsErrorSet.size == 0) {
        //     this.previousState()
        // }

        // 上传附件
        // this.uploadFlowFiles(this.qmsProductionInspection.id)
        

    }

    test(i) {
        var result = ''
        this.qualityControlDetailsErrorSet.forEach(function (element, sameElement, set) {
            if (i == element) {
                result = '#e20a0ad6'
            }
        })
        return result
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IQmsProductionInspection>>) {
        result.subscribe(
            (res: HttpResponse<IQmsProductionInspection>) => this.onSaveSuccess(),
            (res: HttpErrorResponse) => this.onSaveError()
        );
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }
}
