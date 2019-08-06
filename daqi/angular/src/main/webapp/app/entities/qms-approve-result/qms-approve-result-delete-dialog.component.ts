import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IQmsApproveResult } from 'app/shared/model/qms-approve-result.model';
import { QmsApproveResultService } from './qms-approve-result.service';

@Component({
    selector: 'jhi-qms-approve-result-delete-dialog',
    templateUrl: './qms-approve-result-delete-dialog.component.html'
})
export class QmsApproveResultDeleteDialogComponent {
    qmsApproveResult: IQmsApproveResult;

    constructor(
        private qmsApproveResultService: QmsApproveResultService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.qmsApproveResultService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'qmsApproveResultListModification',
                content: 'Deleted an qmsApproveResult'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-qms-approve-result-delete-popup',
    template: ''
})
export class QmsApproveResultDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ qmsApproveResult }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(QmsApproveResultDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.qmsApproveResult = qmsApproveResult;
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
