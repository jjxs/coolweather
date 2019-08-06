import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IQmsUnqualifiedProduct } from 'app/shared/model/qms-unqualified-product.model';
import { QmsUnqualifiedProductService } from './qms-unqualified-product.service';

@Component({
    selector: 'jhi-qms-unqualified-product-delete-dialog',
    templateUrl: './qms-unqualified-product-delete-dialog.component.html'
})
export class QmsUnqualifiedProductDeleteDialogComponent {
    qmsUnqualifiedProduct: IQmsUnqualifiedProduct;

    constructor(
        private qmsUnqualifiedProductService: QmsUnqualifiedProductService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.qmsUnqualifiedProductService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'qmsUnqualifiedProductListModification',
                content: 'Deleted an qmsUnqualifiedProduct'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-qms-unqualified-product-delete-popup',
    template: ''
})
export class QmsUnqualifiedProductDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ qmsUnqualifiedProduct }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(QmsUnqualifiedProductDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.qmsUnqualifiedProduct = qmsUnqualifiedProduct;
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
