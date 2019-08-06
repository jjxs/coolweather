import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IQmsMaterielSupplier } from 'app/shared/model/qms-materiel-supplier.model';
import { QmsMaterielSupplierService } from './materielSupplier.service';

@Component({
    selector: 'jhi-qms-materiel-supplier-delete-dialog',
    templateUrl: './materielSupplier-delete-dialog.component.html'
})
export class QmsMaterielSupplierDeleteDialogComponent {
    qmsMaterielSupplier: IQmsMaterielSupplier;

    constructor(
        private qmsMaterielSupplierService: QmsMaterielSupplierService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager,
        private router: Router,
    ) {}

    clear() {
        this.router.navigate(['/qms-materiel-supplier']);
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.qmsMaterielSupplierService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'qmsMaterielSupplierListModification',
                content: 'Deleted an qmsMaterielSupplier'
            });
            this.router.navigate(['/qms-materiel-supplier']);
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-qms-materiel-supplier-delete-popup',
    template: ''
})
export class QmsMaterielSupplierDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ qmsMaterielSupplier }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(QmsMaterielSupplierDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.qmsMaterielSupplier = qmsMaterielSupplier;
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
