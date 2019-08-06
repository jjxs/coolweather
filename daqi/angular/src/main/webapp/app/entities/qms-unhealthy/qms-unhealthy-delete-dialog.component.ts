import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IQmsUnhealthy } from 'app/shared/model/qms-unhealthy.model';
import { QmsUnhealthyService } from './qms-unhealthy.service';

@Component({
    selector: 'jhi-qms-unhealthy-delete-dialog',
    templateUrl: './qms-unhealthy-delete-dialog.component.html'
})
export class QmsUnhealthyDeleteDialogComponent {
    qmsUnhealthy: IQmsUnhealthy;

    constructor(
        private qmsUnhealthyService: QmsUnhealthyService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.qmsUnhealthyService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'qmsUnhealthyListModification',
                content: 'Deleted an qmsUnhealthy'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-qms-unhealthy-delete-popup',
    template: ''
})
export class QmsUnhealthyDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ qmsUnhealthy }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(QmsUnhealthyDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.qmsUnhealthy = qmsUnhealthy;
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
