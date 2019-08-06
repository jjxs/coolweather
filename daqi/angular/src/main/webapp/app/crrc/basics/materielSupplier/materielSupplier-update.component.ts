import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { MaterialSelectionComponent } from '../../../popup/materialSelection'
import { IQmsMaterielSupplier } from 'app/shared/model/qms-materiel-supplier.model';
import { QmsMaterielSupplierService } from './materielSupplier.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SupplierSelectionComponent } from 'app/popup/supplierSeletion';
import { Message } from 'primeng/components/common/api';
@Component({
    selector: 'jhi-qms-materiel-supplier-update',
    templateUrl: './materielSupplier-update.component.html',
    styleUrls: [
        './materielSupplier.scss'
    ]
})
export class QmsMaterielSupplierUpdateComponent implements OnInit {
    qmsMaterielSupplier: any;
    isSaving: boolean;
    makeTime: string;
    modifyTime: string;
    msgs: Message[] = [];
    constructor(private qmsMaterielSupplierService: QmsMaterielSupplierService,
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private modalService: NgbModal,
    ) { }

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ qmsMaterielSupplier }) => {
            this.qmsMaterielSupplier = qmsMaterielSupplier;
            this.makeTime = this.qmsMaterielSupplier.makeTime != null ? this.qmsMaterielSupplier.makeTime.format(DATE_TIME_FORMAT) : null;
            this.modifyTime =
                this.qmsMaterielSupplier.modifyTime != null ? this.qmsMaterielSupplier.modifyTime.format(DATE_TIME_FORMAT) : null;
        });
        if (this.qmsMaterielSupplier.remark === null || this.qmsMaterielSupplier.remark === undefined) {
            this.qmsMaterielSupplier.remark = '';
        }
    }

    previousState() {
        this.router.navigate(['/qms-materiel-supplier']);
    }

    save() {
        this.isSaving = true;
        this.qmsMaterielSupplier.makeTime = this.makeTime != null ? moment(this.makeTime, DATE_TIME_FORMAT) : null;
        this.qmsMaterielSupplier.modifyTime = this.modifyTime != null ? moment(this.modifyTime, DATE_TIME_FORMAT) : null;
        if (this.qmsMaterielSupplier.id !== undefined) {
            this.subscribeToSaveResponse(this.qmsMaterielSupplierService.updateMS({
                id: this.qmsMaterielSupplier.id,
                materielId: this.qmsMaterielSupplier.materielId,
                supplierId: this.qmsMaterielSupplier.supplierId,
                remark: this.qmsMaterielSupplier.remark,
            }));
        } else {
            this.subscribeToSaveResponse(this.qmsMaterielSupplierService.createMS({
                materielId: this.qmsMaterielSupplier.materielId,
                supplierId: this.qmsMaterielSupplier.supplierId,
                remark: this.qmsMaterielSupplier.remark,
            }));
        }
    }

    private subscribeToSaveResponse(result: Observable<any>) {
        result.subscribe((res: any) => {
            if (res.status === '1')
                this.onSaveSuccess();
            else {
                this.msgs.push({ severity: 'error', summary: '提示', detail: '此物料供应商关联已存在!' });
                this.isSaving = false;
                return;
            }
        }, (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }

    // 物料弹出
    materielPop() {
        this.modalService.open(MaterialSelectionComponent as Component, { backdrop: 'static', keyboard: false, size: 'lg' }).result.then(
            (result) => {
                if (result !== undefined) {
                    this.qmsMaterielSupplier.materielCd = result.materielCd;
                    this.qmsMaterielSupplier.materielName = result.materielName;
                    this.qmsMaterielSupplier.materielId = result.id;
                    if (this.qmsMaterielSupplier.supplierId !== null) {
                        this.isSaving = false;
                    }
                }
            }
        );
    }

    // 供应商弹出
    supplierPop() {
        this.modalService.open(SupplierSelectionComponent as Component, { backdrop: 'static', keyboard: false, size: 'lg' }).result.then(
            (result) => {
                if (result !== undefined) {
                    this.qmsMaterielSupplier.supplierCd = result.supplierCd;
                    this.qmsMaterielSupplier.supplierName = result.supplierName;
                    this.qmsMaterielSupplier.supplierId = result.id;
                    if (this.qmsMaterielSupplier.materielId !== null) {
                        this.isSaving = false;
                    }
                }
            }
        );
    }

    // 输入时查询物料
    searchMateriel() {
        this.qmsMaterielSupplierService.findMateriel({
            materielCd: this.qmsMaterielSupplier.materielCd,
        }).subscribe((res) => {
            if (res !== null) {
                this.qmsMaterielSupplier.materielCd = res.materielCd;
                this.qmsMaterielSupplier.materielId = res.id;
                this.qmsMaterielSupplier.materielName = res.materielName;
                if (this.qmsMaterielSupplier.supplierId !== null) {
                    this.isSaving = false;
                }
            } else {
                this.qmsMaterielSupplier.materielId = null;
                this.qmsMaterielSupplier.materielName = null;
                this.msgs.push({ severity: 'error', summary: '提示', detail: '物料不存在!' });
                this.isSaving = true;
            }
        })
    }

    // 输入时查询供应商
    searchSupplier() {
        this.qmsMaterielSupplierService.findSupplier({
            supplierCd: this.qmsMaterielSupplier.supplierCd,
        }).subscribe((res) => {
            if (res !== null) {
                this.qmsMaterielSupplier.supplierCd = res.supplierCd;
                this.qmsMaterielSupplier.supplierId = res.id;
                this.qmsMaterielSupplier.supplierName = res.supplierName;
                if (this.qmsMaterielSupplier.materielId !== null) {
                    this.isSaving = false;
                }
            } else {
                this.qmsMaterielSupplier.supplierId = null;
                this.qmsMaterielSupplier.supplierName = null;
                this.msgs.push({ severity: 'error', summary: '提示', detail: '供应商不存在!' });
                this.isSaving = true;
            }
        })
    }
}
