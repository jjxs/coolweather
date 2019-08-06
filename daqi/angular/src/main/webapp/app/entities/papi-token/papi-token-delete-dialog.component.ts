import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IPapiToken } from 'app/shared/model/papi-token.model';
import { PapiTokenService } from './papi-token.service';

@Component({
    selector: 'jhi-papi-token-delete-dialog',
    templateUrl: './papi-token-delete-dialog.component.html'
})
export class PapiTokenDeleteDialogComponent {
    papiToken: IPapiToken;

    constructor(private papiTokenService: PapiTokenService, public activeModal: NgbActiveModal, private eventManager: JhiEventManager) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.papiTokenService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'papiTokenListModification',
                content: 'Deleted an papiToken'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-papi-token-delete-popup',
    template: ''
})
export class PapiTokenDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ papiToken }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(PapiTokenDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
                this.ngbModalRef.componentInstance.papiToken = papiToken;
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
