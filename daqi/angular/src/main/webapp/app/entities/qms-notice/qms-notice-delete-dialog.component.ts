import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IQmsNotice } from 'app/shared/model/qms-notice.model';
import { QmsNoticeService } from './qms-notice.service';

@Component({
    selector: 'jhi-qms-notice-delete-dialog',
    templateUrl: './qms-notice-delete-dialog.component.html'
})
export class QmsNoticeDeleteDialogComponent {
    qmsNotice: IQmsNotice;

    constructor(private qmsNoticeService: QmsNoticeService, public activeModal: NgbActiveModal, private eventManager: JhiEventManager) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.qmsNoticeService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'qmsNoticeListModification',
                content: 'Deleted an qmsNotice'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-qms-notice-delete-popup',
    template: ''
})
export class QmsNoticeDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ qmsNotice }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(QmsNoticeDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
                this.ngbModalRef.componentInstance.qmsNotice = qmsNotice;
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
