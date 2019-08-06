import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IQmsSupplierClass } from 'app/shared/model/qms-supplier-class.model';
import { QmsSupplierClassService } from './qms-supplier-class.service';

@Component({
    selector: 'jhi-qms-supplier-class-delete-dialog',
    templateUrl: './qms-supplier-class-delete-dialog.component.html'
})
export class QmsSupplierClassDeleteDialogComponent {
    qmsSupplierClass: IQmsSupplierClass;

    constructor(
        private qmsSupplierClassService: QmsSupplierClassService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.qmsSupplierClassService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'qmsSupplierClassListModification',
                content: 'Deleted an qmsSupplierClass'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-qms-supplier-class-delete-popup',
    template: ''
})
export class QmsSupplierClassDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ qmsSupplierClass }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(QmsSupplierClassDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.qmsSupplierClass = qmsSupplierClass;
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
