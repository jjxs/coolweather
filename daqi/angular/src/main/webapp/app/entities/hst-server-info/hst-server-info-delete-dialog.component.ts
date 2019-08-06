import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IHstServerInfo } from 'app/shared/model/hst-server-info.model';
import { HstServerInfoService } from './hst-server-info.service';

@Component({
    selector: 'jhi-hst-server-info-delete-dialog',
    templateUrl: './hst-server-info-delete-dialog.component.html'
})
export class HstServerInfoDeleteDialogComponent {
    hstServerInfo: IHstServerInfo;

    constructor(
        private hstServerInfoService: HstServerInfoService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.hstServerInfoService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'hstServerInfoListModification',
                content: 'Deleted an hstServerInfo'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-hst-server-info-delete-popup',
    template: ''
})
export class HstServerInfoDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ hstServerInfo }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(HstServerInfoDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.hstServerInfo = hstServerInfo;
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
