import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { Message } from 'primeng/components/common/api';
import { IQmsSupplier } from 'app/shared/model/qms-supplier.model';
import { QmsSupplierService } from './qms-supplier.service';
import { QmsSupplierClassComponent } from 'app/popup/supplierClassSelection/qms-supplier-class.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
    selector: 'jhi-qms-supplier-update',
    templateUrl: './qms-supplier-update.component.html',
    styleUrls: ['./supplierInformation.scss']
})
export class QmsSupplierUpdateComponent implements OnInit {
    qmsSupplier: IQmsSupplier;
    isSaving: boolean;
    makeTime: string;
    modifyTime: string;
    flag: any;
    flagStatus: any;
    msgs: Message[] = [];
    suppkierClass: any;        //供应商分类编码
    suppkierClassName: any;    //供应商分类名称
    supplierClassId: any;       //供应商分类id
    constructor(private qmsSupplierService: QmsSupplierService, private activatedRoute: ActivatedRoute, private router: Router,
        private modalService: NgbModal, ) { }

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ qmsSupplier }) => {
            this.qmsSupplier = qmsSupplier;
            // 如果是添加页面，则flag为0
            if (this.qmsSupplier.supplierCd == null) {
                this.flag = 0;
                this.flagStatus = '0';
                this.qmsSupplier.flagStatus = '0';
            } else {
                this.flag = 1;
                this.flagStatus = '0';
                //生产方式
                this.qmsSupplierService.getSupplierList({ data: this.qmsSupplier.supplierClassId })
                    .subscribe(data => {
                        this.supplierClassId = data[0]["id"]
                        this.suppkierClass = data[0]["suppkierClass"]
                        this.suppkierClassName = data[0]["suppkierClassName"]
                    })
            }
            this.makeTime = this.qmsSupplier.makeTime != null ? this.qmsSupplier.makeTime.format(DATE_TIME_FORMAT) : null;
            this.modifyTime = this.qmsSupplier.modifyTime != null ? this.qmsSupplier.modifyTime.format(DATE_TIME_FORMAT) : null;
        });
        //  //生产方式
        //  this.qmsSupplierService.getSupplierList( { data:this.qmsSupplier.supplierClassId})
        //  .subscribe(data => {
        //      this.suppkierClass = data[0]["suppkierClass"]
        //      this.suppkierClassName = data[0]["suppkierClassName"]
        //  })
    }

    previousState() {
        // window.history.back();
        this.router.navigate(['/supplier']);
    }

    // 打开物料工序选择
    goToMPS() {
        this.modalService.open(QmsSupplierClassComponent as Component, { backdrop: 'static', keyboard: false, size: 'lg' }).result.then(
            (result) => {
                if (result !== undefined) {
                    console.log(result)
                    this.supplierClassId = result["id"]
                    this.suppkierClass = result["suppkierClass"];
                    this.suppkierClassName = result["suppkierClassName"]
                }
            }
        );
    }

    save() {
        //保存的时候如果编码为空，则报错误信息
        if (this.qmsSupplier.supplierCd == "" || this.qmsSupplier.supplierCd == null) {
            this.msgs.push({ severity: 'error', summary: '提示', detail: '供应商编码不能为空' });
        } else {
            // 供应商分类编码不正确的check

            //供应商编码重复的Check
            if (this.qmsSupplier.id !== undefined) {
                this.qmsSupplier.supplierClassId = this.supplierClassId
                //从更新进入
                this.subscribeToSaveResponse(this.qmsSupplierService.update(this.qmsSupplier));
            } else {
                //从新增进入
                //供应商编码重复的Check
                this.qmsSupplierService.sameCheck({ samecheck: this.qmsSupplier.supplierCd }).subscribe(data => {
                    if (data.body === 1) {
                        this.msgs.push({ severity: 'error', summary: '提示', detail: '该供应商已存在!' });
                    } else {
                        this.qmsSupplier.supplierClassId = this.supplierClassId
                        this.isSaving = true;
                        this.qmsSupplier.makeTime = this.makeTime != null ? moment(this.makeTime, DATE_TIME_FORMAT) : null;
                        this.qmsSupplier.modifyTime = this.modifyTime != null ? moment(this.modifyTime, DATE_TIME_FORMAT) : null;
                        this.subscribeToSaveResponse(this.qmsSupplierService.create(this.qmsSupplier));
                    }
                });

            }




        }

    }

    searchSuppkierClass() {

        this.qmsSupplierService.getsuppkierClassList({ suppkierClass: this.suppkierClass })
            .subscribe(data => {

                if (data.length == 0) {
                    this.suppkierClassName = "";
                } else {
                    this.supplierClassId = data[0]["id"];
                    this.suppkierClassName = data[0]["suppkierClassName"]
                }
            });
    }

    blurSuppkierClass() {
        this.qmsSupplierService.getsuppkierClassList({ suppkierClass: this.suppkierClass })
            .subscribe(data => {
                if (this.suppkierClass != "") {
                    if (data.length == 0) {
                        this.msgs.push({ severity: 'error', summary: '提示', detail: '该供应商分类不存在!' });
                        this.suppkierClass = ""
                        this.suppkierClassName = "";
                        this.supplierClassId = 0
                    } else {
                        this.supplierClassId = data[0]["id"];
                        this.suppkierClassName = data[0]["suppkierClassName"]
                    }
                }else{
                    this.suppkierClassName = "";
                }

            });
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IQmsSupplier>>) {
        result.subscribe((res: HttpResponse<IQmsSupplier>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }
}
