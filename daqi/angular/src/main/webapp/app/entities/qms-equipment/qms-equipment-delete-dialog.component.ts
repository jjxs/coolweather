import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IQmsEquipment } from 'app/shared/model/qms-equipment.model';
import { QmsEquipmentService } from './qms-equipment.service';

@Component({
    selector: 'jhi-qms-equipment-delete-dialog',
    templateUrl: './qms-equipment-delete-dialog.component.html'
})
export class QmsEquipmentDeleteDialogComponent {
    qmsEquipment: IQmsEquipment;

    constructor(
        private qmsEquipmentService: QmsEquipmentService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.qmsEquipmentService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'qmsEquipmentListModification',
                content: 'Deleted an qmsEquipment'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-qms-equipment-delete-popup',
    template: ''
})
export class QmsEquipmentDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ qmsEquipment }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(QmsEquipmentDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.qmsEquipment = qmsEquipment;
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
