import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IQmsQualityControlDetails } from 'app/shared/model/qms-quality-control-details.model';
import { QmsQualityControlDetailsService } from './qms-quality-control-details.service';

@Component({
    selector: 'jhi-qms-quality-control-details-delete-dialog',
    templateUrl: './qms-quality-control-details-delete-dialog.component.html'
})
export class QmsQualityControlDetailsDeleteDialogComponent {
    qmsQualityControlDetails: IQmsQualityControlDetails;

    constructor(
        private qmsQualityControlDetailsService: QmsQualityControlDetailsService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.qmsQualityControlDetailsService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'qmsQualityControlDetailsListModification',
                content: 'Deleted an qmsQualityControlDetails'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-qms-quality-control-details-delete-popup',
    template: ''
})
export class QmsQualityControlDetailsDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ qmsQualityControlDetails }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(QmsQualityControlDetailsDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.qmsQualityControlDetails = qmsQualityControlDetails;
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
