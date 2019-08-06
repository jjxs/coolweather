import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IQmsEntryControlCriterion } from 'app/shared/model/qms-entry-control-criterion.model';
import { QmsEntryControlCriterionService } from './qms-entry-control-criterion.service';

@Component({
    selector: 'jhi-qms-entry-control-criterion-delete-dialog',
    templateUrl: './qms-entry-control-criterion-delete-dialog.component.html'
})
export class QmsEntryControlCriterionDeleteDialogComponent {
    qmsEntryControlCriterion: IQmsEntryControlCriterion;

    constructor(
        private qmsEntryControlCriterionService: QmsEntryControlCriterionService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.qmsEntryControlCriterionService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'qmsEntryControlCriterionListModification',
                content: 'Deleted an qmsEntryControlCriterion'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-qms-entry-control-criterion-delete-popup',
    template: ''
})
export class QmsEntryControlCriterionDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ qmsEntryControlCriterion }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(QmsEntryControlCriterionDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.qmsEntryControlCriterion = qmsEntryControlCriterion;
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
