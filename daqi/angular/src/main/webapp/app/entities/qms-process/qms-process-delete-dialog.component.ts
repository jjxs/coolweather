import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IQmsProcess } from 'app/shared/model/qms-process.model';
import { QmsProcessService } from './qms-process.service';

@Component({
    selector: 'jhi-qms-process-delete-dialog',
    templateUrl: './qms-process-delete-dialog.component.html'
})
export class QmsProcessDeleteDialogComponent {
    qmsProcess: IQmsProcess;

    constructor(private qmsProcessService: QmsProcessService, public activeModal: NgbActiveModal, private eventManager: JhiEventManager) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.qmsProcessService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'qmsProcessListModification',
                content: 'Deleted an qmsProcess'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-qms-process-delete-popup',
    template: ''
})
export class QmsProcessDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ qmsProcess }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(QmsProcessDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
                this.ngbModalRef.componentInstance.qmsProcess = qmsProcess;
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
