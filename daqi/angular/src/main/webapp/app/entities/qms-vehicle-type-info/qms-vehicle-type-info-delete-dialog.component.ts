import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IQmsVehicleTypeInfo } from 'app/shared/model/qms-vehicle-type-info.model';
import { QmsVehicleTypeInfoService } from './qms-vehicle-type-info.service';

@Component({
    selector: 'jhi-qms-vehicle-type-info-delete-dialog',
    templateUrl: './qms-vehicle-type-info-delete-dialog.component.html'
})
export class QmsVehicleTypeInfoDeleteDialogComponent {
    qmsVehicleTypeInfo: IQmsVehicleTypeInfo;

    constructor(
        private qmsVehicleTypeInfoService: QmsVehicleTypeInfoService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.qmsVehicleTypeInfoService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'qmsVehicleTypeInfoListModification',
                content: 'Deleted an qmsVehicleTypeInfo'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-qms-vehicle-type-info-delete-popup',
    template: ''
})
export class QmsVehicleTypeInfoDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ qmsVehicleTypeInfo }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(QmsVehicleTypeInfoDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.qmsVehicleTypeInfo = qmsVehicleTypeInfo;
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
