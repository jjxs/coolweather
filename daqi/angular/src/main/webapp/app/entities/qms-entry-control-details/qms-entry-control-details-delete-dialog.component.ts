import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IQmsEntryControlDetails } from 'app/shared/model/qms-entry-control-details.model';
import { QmsEntryControlDetailsService } from './qms-entry-control-details.service';

@Component({
    selector: 'jhi-qms-entry-control-details-delete-dialog',
    templateUrl: './qms-entry-control-details-delete-dialog.component.html'
})
export class QmsEntryControlDetailsDeleteDialogComponent {
    qmsEntryControlDetails: IQmsEntryControlDetails;

    constructor(
        private qmsEntryControlDetailsService: QmsEntryControlDetailsService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.qmsEntryControlDetailsService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'qmsEntryControlDetailsListModification',
                content: 'Deleted an qmsEntryControlDetails'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-qms-entry-control-details-delete-popup',
    template: ''
})
export class QmsEntryControlDetailsDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ qmsEntryControlDetails }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(QmsEntryControlDetailsDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.qmsEntryControlDetails = qmsEntryControlDetails;
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
