import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IQmsSupplier } from 'app/shared/model/qms-supplier.model';
import { QmsSupplierService } from './qms-supplier.service';

@Component({
    selector: 'jhi-qms-supplier-delete-dialog',
    templateUrl: './qms-supplier-delete-dialog.component.html'
})
export class QmsSupplierDeleteDialogComponent {
    qmsSupplier: IQmsSupplier;

    constructor(
        private qmsSupplierService: QmsSupplierService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.qmsSupplierService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'qmsSupplierListModification',
                content: 'Deleted an qmsSupplier'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-qms-supplier-delete-popup',
    template: ''
})
export class QmsSupplierDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ qmsSupplier }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(QmsSupplierDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.qmsSupplier = qmsSupplier;
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
