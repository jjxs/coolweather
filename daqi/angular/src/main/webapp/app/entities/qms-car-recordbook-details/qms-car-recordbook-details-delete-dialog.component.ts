import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IQmsCarRecordbookDetails } from 'app/shared/model/qms-car-recordbook-details.model';
import { QmsCarRecordbookDetailsService } from './qms-car-recordbook-details.service';

@Component({
    selector: 'jhi-qms-car-recordbook-details-delete-dialog',
    templateUrl: './qms-car-recordbook-details-delete-dialog.component.html'
})
export class QmsCarRecordbookDetailsDeleteDialogComponent {
    qmsCarRecordbookDetails: IQmsCarRecordbookDetails;

    constructor(
        private qmsCarRecordbookDetailsService: QmsCarRecordbookDetailsService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.qmsCarRecordbookDetailsService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'qmsCarRecordbookDetailsListModification',
                content: 'Deleted an qmsCarRecordbookDetails'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-qms-car-recordbook-details-delete-popup',
    template: ''
})
export class QmsCarRecordbookDetailsDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ qmsCarRecordbookDetails }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(QmsCarRecordbookDetailsDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.qmsCarRecordbookDetails = qmsCarRecordbookDetails;
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
