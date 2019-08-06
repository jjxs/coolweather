import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IQmsMaster } from 'app/shared/model/qms-master.model';
import { QmsMasterService } from './qms-master.service';

@Component({
    selector: 'jhi-qms-master-delete-dialog',
    templateUrl: './qms-master-delete-dialog.component.html'
})
export class QmsMasterDeleteDialogComponent {
    qmsMaster: IQmsMaster;

    constructor(private qmsMasterService: QmsMasterService, public activeModal: NgbActiveModal, private eventManager: JhiEventManager) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.qmsMasterService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'qmsMasterListModification',
                content: 'Deleted an qmsMaster'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-qms-master-delete-popup',
    template: ''
})
export class QmsMasterDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ qmsMaster }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(QmsMasterDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
                this.ngbModalRef.componentInstance.qmsMaster = qmsMaster;
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
