import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IQmsInspectionDetails } from 'app/shared/model/qms-inspection-details.model';
import { QmsInspectionDetailsService } from './qms-inspection-details.service';

@Component({
    selector: 'jhi-qms-inspection-details-delete-dialog',
    templateUrl: './qms-inspection-details-delete-dialog.component.html'
})
export class QmsInspectionDetailsDeleteDialogComponent {
    qmsInspectionDetails: IQmsInspectionDetails;

    constructor(
        private qmsInspectionDetailsService: QmsInspectionDetailsService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.qmsInspectionDetailsService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'qmsInspectionDetailsListModification',
                content: 'Deleted an qmsInspectionDetails'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-qms-inspection-details-delete-popup',
    template: ''
})
export class QmsInspectionDetailsDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ qmsInspectionDetails }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(QmsInspectionDetailsDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.qmsInspectionDetails = qmsInspectionDetails;
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
