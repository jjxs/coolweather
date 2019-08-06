import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IQmsProduct } from 'app/shared/model/qms-product.model';
import { QmsProductService } from './qms-product.service';

@Component({
    selector: 'jhi-qms-product-delete-dialog',
    templateUrl: './qms-product-delete-dialog.component.html'
})
export class QmsProductDeleteDialogComponent {
    qmsProduct: IQmsProduct;

    constructor(private qmsProductService: QmsProductService, public activeModal: NgbActiveModal, private eventManager: JhiEventManager,private router: Router) {}

    clear() {
        this.router.navigate(['/product']);
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.qmsProductService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'qmsProductListModification',
                content: 'Deleted an qmsProduct'
            });
            this.router.navigate(['/product']);
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-qms-product-delete-popup',
    template: ''
})
export class QmsProductDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ qmsProduct }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(QmsProductDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
                this.ngbModalRef.componentInstance.qmsProduct = qmsProduct;
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
