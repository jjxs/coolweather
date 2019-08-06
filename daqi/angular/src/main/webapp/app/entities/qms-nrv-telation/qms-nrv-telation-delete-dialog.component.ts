import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IQmsNrvTelation } from 'app/shared/model/qms-nrv-telation.model';
import { QmsNrvTelationService } from './qms-nrv-telation.service';

@Component({
    selector: 'jhi-qms-nrv-telation-delete-dialog',
    templateUrl: './qms-nrv-telation-delete-dialog.component.html'
})
export class QmsNrvTelationDeleteDialogComponent {
    qmsNrvTelation: IQmsNrvTelation;

    constructor(
        private qmsNrvTelationService: QmsNrvTelationService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.qmsNrvTelationService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'qmsNrvTelationListModification',
                content: 'Deleted an qmsNrvTelation'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-qms-nrv-telation-delete-popup',
    template: ''
})
export class QmsNrvTelationDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ qmsNrvTelation }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(QmsNrvTelationDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.qmsNrvTelation = qmsNrvTelation;
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
