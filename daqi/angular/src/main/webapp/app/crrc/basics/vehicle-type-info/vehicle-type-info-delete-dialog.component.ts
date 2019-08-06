import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';
import * as moment from 'moment';
import { IQmsVehicleTypeInfo } from 'app/shared/model/qms-vehicle-type-info.model';
import { VehicleTypeInfoService } from './vehicle-type-info.service';
import { Message } from 'primeng/components/common/api';
@Component({
    selector: 'jhi-vehicle-type-info-delete-dialog',
    templateUrl: './vehicle-type-info-delete-dialog.component.html'
})
export class VehicleTypeInfoDeleteDialogComponent {
    qmsVehicleTypeInfo: IQmsVehicleTypeInfo;
    // 排他时间
    updateTimes: any;
    msgs: Message[] = [];
    constructor(
        private qmsVehicleTypeInfoService: VehicleTypeInfoService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager, private router: Router
    ) { }

    clear() {

        this.router.navigate(['/vehicle-type-info']);
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.qmsVehicleTypeInfo.flagStatus = '1';
        this.qmsVehicleTypeInfo.modifyTime = moment(this.updateTimes);
        this.qmsVehicleTypeInfoService.updateCarType(this.qmsVehicleTypeInfo).subscribe(data => {
            this.msgs = [];
            if (data.body === 1 || data.body === '1') {
                this.msgs.push({ severity: 'error', summary: '提示', detail: '该车型已被更新' });
            } else if (data.body === 2 || data.body === '2') {
                this.msgs.push({ severity: 'error', summary: '提示', detail: '该车型仍在使用中' });
            } else {
                this.eventManager.broadcast({
                    name: 'VehicleTypeInfoListModificationNew',
                    content: 'Deleted an qmsVehicleTypeInfo'
                });
                this.router.navigate(['/vehicle-type-info']);
                this.activeModal.dismiss(true);
            }
        });

    }
}

@Component({
    selector: 'jhi-vehicle-type-info-delete-popup',
    template: ''
})
export class VehicleTypeInfoDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private qmsVehicleTypeInfoService: VehicleTypeInfoService, private modalService: NgbModal) { }

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ qmsVehicleTypeInfo }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(VehicleTypeInfoDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.qmsVehicleTypeInfo = qmsVehicleTypeInfo;
                // 排他时间
                this.qmsVehicleTypeInfoService.find(qmsVehicleTypeInfo.id).subscribe(data => {
                    this.ngbModalRef.componentInstance.updateTimes = data.body.modifyTime;
                });
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate([{ outlets: { popup: null } }], { replaceUrl: true, queryParamsHandling: 'merge' });
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate([{ outlets: { popup: null } }], { replaceUrl: true, queryParamsHandling: 'merge' });
                        this.ngbModalRef = null;
                    }
                );
            }, 0);
        });
    }

    ngOnDestroy() {
        this.ngbModalRef = null;
    }
}
