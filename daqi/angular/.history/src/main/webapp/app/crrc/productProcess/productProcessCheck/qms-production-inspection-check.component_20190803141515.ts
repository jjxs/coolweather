import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BomInformationComponent1 } from '../../../popup/bomTreeSelection/bom-infomation.component'
import { QmsProductComponent } from '../../../popup/productSelection/qms-product.component'
import { IQmsProductionInspection } from 'app/shared/model/qms-production-inspection.model';
import { QmsProductionInspectionService } from './qms-production-inspection.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Message } from 'primeng/components/common/api';

@Component({
    selector: 'jhi-qms-production-inspection-check',
    templateUrl: './qms-production-inspection-check.component.html',
    styleUrls: [
        './productProcess.scss'
    ]
})
export class QmsProductionInspectionCheckComponent implements OnInit {
    qmsProductionInspection: IQmsProductionInspection;
    isSaving: boolean;
    makeTime: string;
    modifyTime: string;
    msgs: Message[] = [];


    // 物料编码
    materielCd: ''
    // 物料名称
    materielName: ''
    // 物料Id
    materielId: ''
    //工艺Id
    bomTechnologyId: ''
    //中梁号
    workno: ''
    // 工序特征
    operationType: any
    // 编号
    serialNumber: ''
    // 炉批号
    furnace: ''
    // 备注
    remark: ''
    // 单选项
    isNumber: any


    constructor(
        private router: Router, 
        private qmsProductionInspectionService: QmsProductionInspectionService, 
        private activatedRoute: ActivatedRoute,
        private modalsService: NgbModal
        ) {
            this.isNumber = '1'
        }

    ngOnInit() {
        console.log(this.materielCd)
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ qmsProductionInspection }) => {
            this.qmsProductionInspection = qmsProductionInspection;
        });
    }

    previousState() {
        this.router.navigate(['/productProcessCheck']);
    }

    clickBianHao() {
        this.qmsProductionInspection.workno = "";
    }

    clickWorkNo() {
        this.qmsProductionInspection.serialNumber = "";
    }

    //物料Cd离开焦点事件
    materieBlurMar() {

        this.qmsProductionInspectionService.getMateriel({ materielCd: this.materielCd })
            .subscribe(data => {
                if (data.body === null) {
                    this.msgs.push({ severity: 'error', summary: '提示', detail: '该物料不存在!' });
                    this.materielCd == "";
                }else {
                    this.qmsProductionInspection.materielId = data.body.materielId;
                    this.materielName = data.body.materielName
                }
            });
    }

    // 物料子画面
    goToMPS() {

        this.modalsService.open(BomInformationComponent1 as Component, { backdrop: 'static', keyboard: false, windowClass: 'modal-xl', size: 'lg' }).result.then(
            (result) => {
                if (result !== undefined) {
                    console.log(result)
                    // this.operationType = result.operationType;
                    this.qmsProductionInspection.materielId = result.materielId;
                    this.qmsProductionInspection.bomTechnologyId = result.technologyId;
                    this.materielCd = result.materielCd;
                    this.materielName = result.materielName;
                }
            }
        );
    }

    // 产品子画面
    goToProduct() {
        // 物料必须入力
        if (this.qmsProductionInspection.materielId === null || this.qmsProductionInspection.materielId === undefined) {
            this.msgs.push({ severity: 'error', summary: '提示', detail: '物料编码不能为空!' });
            return;
        }

        const toBatch = this.modalsService.open(QmsProductComponent as Component, { backdrop: 'static', keyboard: false, size: 'lg' })
            toBatch.componentInstance.materielId = this.qmsProductionInspection.materielId;
            toBatch.componentInstance.sp = "sp1.2"
            toBatch.result.then(
            (result) => {
                if (result !== undefined) {
                    console.log(result)
                    this.qmsProductionInspection.materielId = result.materielId;
                    this.materielCd = result.materielCd;
                    this.materielName = result.materielName;
                    this.qmsProductionInspection.serialNumber = result.productNum;
                }
            }
        );
    }

    save() {
        if (this.qmsProductionInspection.materielId === null || this.qmsProductionInspection.materielId === undefined) {
            this.msgs.push({ severity: 'error', summary: '提示', detail: '物料编码不能为空!' });
            return
        }

        // if (this.materielName == '' || this.materielName == undefined) {
        //     this.msgs.push({ severity: 'error', summary: '提示', detail: '物料名称不能为空!' });
        //     return
        // }

        // 编号
        if (this.isNumber == 1) {
            if (this.qmsProductionInspection.serialNumber == '' || this.qmsProductionInspection.serialNumber == undefined) {
                this.msgs.push({ severity: 'error', summary: '提示', detail: '编号不能为空!' });
                return
            }
        }else {
            if (this.qmsProductionInspection.workno == '' || this.qmsProductionInspection.workno == undefined) {
                this.msgs.push({ severity: 'error', summary: '提示', detail: '中梁号不能为空!' });
                return
            }
        }
        
        this.qmsProductionInspectionService.allCheck({params: this.qmsProductionInspection}).subscribe(data => {
            // 检验成功
            if (data.body.code === '1'){

                this.qmsProductionInspectionService.doBatchGeneration(this.qmsProductionInspection).subscribe(data => {
                    if (data.body.code === "1") {
                        this.previousState();
                    }else if(data.body.code == "2") {
                        this.msgs.push({ severity: 'error', summary: '提示', detail: '检验任务已经存在!' });
                        
                    }else {
                        this.msgs.push({ severity: 'error', summary: '提示', detail: '批量生成任务失败!' });
                    }
                })

            }else if(data.body.code === '2') {
                this.msgs.push({ severity: 'error', summary: '提示', detail: '物料在工艺表不存在!' });
            }
        })

    //     this.qmsProductionInspectionService.repeatCheck({ bomTechnologyId: this.qmsProductionInspection.bomTechnologyId, serialNumber: this.qmsProductionInspection.serialNumber }).subscribe(data => {
    //         if (data.body === 1) {
    //             this.msgs.push({ severity: 'error', summary: '提示', detail: '编号重复!' });
    //             return
    //         } else {

    //             // 首工序
    //             if (this.operationType == "F") {
    //                 // 编号校验
    //                 this.qmsProductionInspectionService.serialNumberCheck({materielId: this.qmsProductionInspection.materielId, serialNumber: this.qmsProductionInspection.serialNumber}).subscribe(data => {
    //                 });
    //             }
                
    //             this.qmsProductionInspectionService.doBatchGeneration(this.qmsProductionInspection).subscribe(
    //                 (res: any) => this.previousState(),
    //                 (res: HttpErrorResponse) => {
    //                     this.msgs.push({ severity: 'error', summary: '提示', detail: '批量生成任务失败!' });
    //                 })
    //         }
    //     });
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
