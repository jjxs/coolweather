import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IQmsProcessRoute } from 'app/shared/model/qms-process-route.model';
import { QmsProcessRouteService } from './qms-process-route.service';

@Component({
    selector: 'jhi-qms-process-route-delete-dialog',
    templateUrl: './qms-process-route-delete-dialog.component.html'
})
export class QmsProcessRouteDeleteDialogComponent {
    qmsProcessRoute: IQmsProcessRoute;

    constructor(
        private qmsProcessRouteService: QmsProcessRouteService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.qmsProcessRouteService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'qmsProcessRouteListModification',
                content: 'Deleted an qmsProcessRoute'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-qms-process-route-delete-popup',
    template: ''
})
export class QmsProcessRouteDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ qmsProcessRoute }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(QmsProcessRouteDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.qmsProcessRoute = qmsProcessRoute;
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
