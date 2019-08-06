import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IQmsQualityControl } from 'app/shared/model/qms-quality-control.model';
import { QmsQualityControlService } from './qms-quality-control.service';

@Component({
    selector: 'jhi-qms-quality-control-delete-dialog',
    templateUrl: './qms-quality-control-delete-dialog.component.html'
})
export class QmsQualityControlDeleteDialogComponent {
    qmsQualityControl: IQmsQualityControl;

    constructor(
        private qmsQualityControlService: QmsQualityControlService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.qmsQualityControlService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'qmsQualityControlListModification',
                content: 'Deleted an qmsQualityControl'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-qms-quality-control-delete-popup',
    template: ''
})
export class QmsQualityControlDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ qmsQualityControl }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(QmsQualityControlDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.qmsQualityControl = qmsQualityControl;
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
