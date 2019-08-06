import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IQmsMaterielDetails } from 'app/shared/model/qms-materiel-details.model';
import { QmsMaterielDetailsService } from './qms-materiel-details.service';

@Component({
    selector: 'jhi-qms-materiel-details-delete-dialog',
    templateUrl: './qms-materiel-details-delete-dialog.component.html'
})
export class QmsMaterielDetailsDeleteDialogComponent {
    qmsMaterielDetails: IQmsMaterielDetails;

    constructor(
        private qmsMaterielDetailsService: QmsMaterielDetailsService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.qmsMaterielDetailsService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'qmsMaterielDetailsListModification',
                content: 'Deleted an qmsMaterielDetails'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-qms-materiel-details-delete-popup',
    template: ''
})
export class QmsMaterielDetailsDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ qmsMaterielDetails }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(QmsMaterielDetailsDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.qmsMaterielDetails = qmsMaterielDetails;
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
