import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IQmsEntryInspectionResult } from 'app/shared/model/qms-entry-inspection-result.model';
import { QmsEntryInspectionResultService } from './qms-entry-inspection-result.service';

@Component({
    selector: 'jhi-qms-entry-inspection-result-delete-dialog',
    templateUrl: './qms-entry-inspection-result-delete-dialog.component.html'
})
export class QmsEntryInspectionResultDeleteDialogComponent {
    qmsEntryInspectionResult: IQmsEntryInspectionResult;

    constructor(
        private qmsEntryInspectionResultService: QmsEntryInspectionResultService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.qmsEntryInspectionResultService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'qmsEntryInspectionResultListModification',
                content: 'Deleted an qmsEntryInspectionResult'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-qms-entry-inspection-result-delete-popup',
    template: ''
})
export class QmsEntryInspectionResultDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ qmsEntryInspectionResult }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(QmsEntryInspectionResultDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.qmsEntryInspectionResult = qmsEntryInspectionResult;
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
