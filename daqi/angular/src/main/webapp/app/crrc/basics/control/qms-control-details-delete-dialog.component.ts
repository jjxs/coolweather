import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IQmsControlDetails } from 'app/shared/model/qms-control-details.model';
import { QmsControlDetailsService } from './qms-control-details.service';

@Component({
    selector: 'jhi-qms-control-details-delete-dialog',
    templateUrl: './qms-control-details-delete-dialog.component.html'
})
export class QmsControlDetailsDeleteDialogComponent {
    qmsControlDetails: IQmsControlDetails;

    constructor(
        private qmsControlDetailsService: QmsControlDetailsService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager,
        private router: Router,
    ) {}

    clear() {
        this.router.navigate(['/control']);
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.qmsControlDetailsService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'qmsControlDetailsListModification',
                content: 'Deleted an qmsControlDetails'
            });
            this.router.navigate(['/control']);
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-qms-control-details-delete-popup',
    template: ''
})
export class QmsControlDetailsDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ qmsControlDetails }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(QmsControlDetailsDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.qmsControlDetails = qmsControlDetails;
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
