import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IQmsEntryInspection } from 'app/shared/model/qms-entry-inspection.model';
import { QmsEntryInspectionService } from './qms-entry-inspection.service';

@Component({
    selector: 'jhi-qms-entry-inspection-delete-dialog',
    templateUrl: './qms-entry-inspection-delete-dialog.component.html'
})
export class QmsEntryInspectionDeleteDialogComponent {
    qmsEntryInspection: IQmsEntryInspection;

    constructor(
        private qmsEntryInspectionService: QmsEntryInspectionService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.qmsEntryInspectionService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'qmsEntryInspectionListModification',
                content: 'Deleted an qmsEntryInspection'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-qms-entry-inspection-delete-popup',
    template: ''
})
export class QmsEntryInspectionDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ qmsEntryInspection }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(QmsEntryInspectionDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.qmsEntryInspection = qmsEntryInspection;
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
