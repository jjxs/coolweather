import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IQmsUnqualifiedProductDetails } from 'app/shared/model/qms-unqualified-product-details.model';
import { QmsUnqualifiedProductDetailsService } from './qms-unqualified-product-details.service';

@Component({
    selector: 'jhi-qms-unqualified-product-details-delete-dialog',
    templateUrl: './qms-unqualified-product-details-delete-dialog.component.html'
})
export class QmsUnqualifiedProductDetailsDeleteDialogComponent {
    qmsUnqualifiedProductDetails: IQmsUnqualifiedProductDetails;

    constructor(
        private qmsUnqualifiedProductDetailsService: QmsUnqualifiedProductDetailsService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.qmsUnqualifiedProductDetailsService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'qmsUnqualifiedProductDetailsListModification',
                content: 'Deleted an qmsUnqualifiedProductDetails'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-qms-unqualified-product-details-delete-popup',
    template: ''
})
export class QmsUnqualifiedProductDetailsDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ qmsUnqualifiedProductDetails }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(QmsUnqualifiedProductDetailsDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.qmsUnqualifiedProductDetails = qmsUnqualifiedProductDetails;
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
