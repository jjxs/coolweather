import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IQmsVehicleTypeClass } from 'app/shared/model/qms-vehicle-type-class.model';
import { QmsVehicleTypeClassService } from './qms-vehicle-type-class.service';

@Component({
    selector: 'jhi-qms-vehicle-type-class-delete-dialog',
    templateUrl: './qms-vehicle-type-class-delete-dialog.component.html'
})
export class QmsVehicleTypeClassDeleteDialogComponent {
    qmsVehicleTypeClass: IQmsVehicleTypeClass;

    constructor(
        private qmsVehicleTypeClassService: QmsVehicleTypeClassService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.qmsVehicleTypeClassService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'qmsVehicleTypeClassListModification',
                content: 'Deleted an qmsVehicleTypeClass'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-qms-vehicle-type-class-delete-popup',
    template: ''
})
export class QmsVehicleTypeClassDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ qmsVehicleTypeClass }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(QmsVehicleTypeClassDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.qmsVehicleTypeClass = qmsVehicleTypeClass;
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
