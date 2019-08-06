import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { Message } from 'primeng/components/common/api';
import { IQmsProduct } from 'app/shared/model/qms-product.model';
import { QmsProductService } from './qms-product.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MaterialSelectionComponent } from 'app/popup/materialSelection/materialSelection.component'
@Component({
    selector: 'jhi-qms-product-update',
    templateUrl: './qms-product-update.component.html',
    styleUrls: [
        './product.scss'
    ]
})
export class QmsProductUpdateComponent implements OnInit {
    qmsProduct: IQmsProduct;
    isSaving: boolean;
    makeTime: string;
    modifyTime: string;
    materielId: any;
    materielCd = "";
    materielName = "";
    flag: any;
    flagStatus: any;
    msgs: Message[] = [];
    materielIdCheck: any;
    constructor(private qmsProductService: QmsProductService, private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) { }

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ qmsProduct }) => {
            this.qmsProduct = qmsProduct;
            this.materielIdCheck = this.qmsProduct.materielId;
            // 如果是添加页面，则flag为0
            if (this.qmsProduct.productNum == null) {
                this.flag = 0;
                this.flagStatus = '0';
                this.qmsProduct.flagStatus = '0';
            } else {
                this.flag = 1;
                this.flagStatus = '0';
            }
            if (this.qmsProduct.id !== undefined) {
                //物料数据
                this.qmsProductService.getMaterielList({ data: this.qmsProduct.materielId })
                    .subscribe(data => {
                        console.log(data);
                        this.materielId = data[0]["id"]
                        this.materielCd = data[0]["materielCd"]
                        this.materielName = data[0]["materielName"]
                    })
            }

            this.makeTime = this.qmsProduct.makeTime != null ? this.qmsProduct.makeTime.format(DATE_TIME_FORMAT) : null;
            this.modifyTime = this.qmsProduct.modifyTime != null ? this.qmsProduct.modifyTime.format(DATE_TIME_FORMAT) : null;
        });
    }

    previousState() {
        this.router.navigate(['/product']);
    }

    save() {
        this.isSaving = true;
        this.qmsProduct.makeTime = this.makeTime != null ? moment(this.makeTime, DATE_TIME_FORMAT) : null;
        this.qmsProduct.modifyTime = this.modifyTime != null ? moment(this.modifyTime, DATE_TIME_FORMAT) : null;
        if (this.qmsProduct.id !== undefined) {
            //更新
            this.qmsProduct.materielId = this.materielId;
            console.log(this.qmsProduct);
            //如果更新完的数据的两个值跟之前没区别，直接走更新
            if (this.materielIdCheck == this.materielId) {
                this.subscribeToSaveResponse(this.qmsProductService.update(this.qmsProduct));
            } else {
                //更新的check
                this.qmsProductService.sameCheck({ productNum: this.qmsProduct.productNum, materielId: this.qmsProduct.materielId }).subscribe(data => {
                    if (data.body === 1) {
                        this.msgs.push({ severity: 'error', summary: '提示', detail: '该产品已存在!' });
                        this.isSaving = false;
                    } else {

                        this.subscribeToSaveResponse(this.qmsProductService.update(this.qmsProduct));
                    }
                });
            }


        } else {
            //从新增进入
            //物料编码重复的Check
            this.qmsProduct.materielId = this.materielId;
            this.qmsProductService.sameCheck({ productNum: this.qmsProduct.productNum, materielId: this.qmsProduct.materielId }).subscribe(data => {
                if (data.body === 1) {
                    this.msgs.push({ severity: 'error', summary: '提示', detail: '该产品已存在!' });
                    this.isSaving = false;
                } else {

                    this.subscribeToSaveResponse(this.qmsProductService.create(this.qmsProduct));
                }
            });
            //添加
            // this.qmsProduct.materielId = this.materielId;
            // this.subscribeToSaveResponse(this.qmsProductService.create(this.qmsProduct));
        }
    }

    goToMaterial() {
        this.modalService.open(MaterialSelectionComponent as Component, { backdrop: 'static', keyboard: false, size: 'lg' }).result.then(
            (result) => {
                if (result !== undefined) {
                    console.log(result);
                    this.materielId = result["id"];
                    this.materielCd = result["materielCd"];
                    this.materielName = result["materielName"];

                }
            }
        );
    }

    searchMateriel() {
        this.qmsProductService.getMaterielKeyUpList({ materielCd: this.materielCd })
            .subscribe(data => {

                if (data.length == 0) {
                    this.materielName = "";
                } else {
                    this.materielId = data[0]["id"];
                    this.materielName = data[0]["materielName"]
                }
            });
    }

    blurMateriel() {
        console.log(this.materielCd);
        if (this.materielCd != "") {
            this.qmsProductService.getMaterielKeyUpList({ materielCd: this.materielCd })
                .subscribe(data => {

                    if (data.length == 0) {
                        this.msgs.push({ severity: 'error', summary: '提示', detail: '该物料不存在!' });
                        this.materielCd = ""
                        this.materielName = "";
                        this.materielId = 0
                    } else {
                        this.materielId = data[0]["id"];
                        this.materielName = data[0]["materielName"]
                    }


                });
        } else {
            this.materielName = "";
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IQmsProduct>>) {
        result.subscribe((res: HttpResponse<IQmsProduct>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }
}
