import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IHstServerInfoDetails } from 'app/shared/model/hst-server-info-details.model';
import { HstServerInfoDetailsService } from './hst-server-info-details.service';

@Component({
    selector: 'jhi-hst-server-info-details-delete-dialog',
    templateUrl: './hst-server-info-details-delete-dialog.component.html'
})
export class HstServerInfoDetailsDeleteDialogComponent {
    hstServerInfoDetails: IHstServerInfoDetails;

    constructor(
        private hstServerInfoDetailsService: HstServerInfoDetailsService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.hstServerInfoDetailsService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'hstServerInfoDetailsListModification',
                content: 'Deleted an hstServerInfoDetails'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-hst-server-info-details-delete-popup',
    template: ''
})
export class HstServerInfoDetailsDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ hstServerInfoDetails }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(HstServerInfoDetailsDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.hstServerInfoDetails = hstServerInfoDetails;
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
