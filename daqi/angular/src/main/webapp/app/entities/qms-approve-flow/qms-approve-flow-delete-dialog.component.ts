import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IQmsApproveFlow } from 'app/shared/model/qms-approve-flow.model';
import { QmsApproveFlowService } from './qms-approve-flow.service';

@Component({
    selector: 'jhi-qms-approve-flow-delete-dialog',
    templateUrl: './qms-approve-flow-delete-dialog.component.html'
})
export class QmsApproveFlowDeleteDialogComponent {
    qmsApproveFlow: IQmsApproveFlow;

    constructor(
        private qmsApproveFlowService: QmsApproveFlowService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.qmsApproveFlowService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'qmsApproveFlowListModification',
                content: 'Deleted an qmsApproveFlow'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-qms-approve-flow-delete-popup',
    template: ''
})
export class QmsApproveFlowDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ qmsApproveFlow }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(QmsApproveFlowDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.qmsApproveFlow = qmsApproveFlow;
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
