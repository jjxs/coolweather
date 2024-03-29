import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IQmsDefect } from 'app/shared/model/qms-defect.model';
import { QmsDefectService } from './qms-defect.service';

@Component({
    selector: 'jhi-qms-defect-delete-dialog',
    templateUrl: './qms-defect-delete-dialog.component.html'
})
export class QmsDefectDeleteDialogComponent {
    qmsDefect: IQmsDefect;

    constructor(private qmsDefectService: QmsDefectService, public activeModal: NgbActiveModal, private eventManager: JhiEventManager) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.qmsDefectService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'qmsDefectListModification',
                content: 'Deleted an qmsDefect'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-qms-defect-delete-popup',
    template: ''
})
export class QmsDefectDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ qmsDefect }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(QmsDefectDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
                this.ngbModalRef.componentInstance.qmsDefect = qmsDefect;
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
