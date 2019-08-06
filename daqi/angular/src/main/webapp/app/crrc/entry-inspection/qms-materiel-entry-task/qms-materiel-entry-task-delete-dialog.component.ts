import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IQmsMaterielEntry } from 'app/shared/model/qms-materiel-entry.model';
import { QmsMaterielEntryService } from './qms-materiel-entry-task.service';

@Component({
    selector: 'jhi-qms-materiel-entry-delete-dialog',
    templateUrl: './qms-materiel-entry-task-delete-dialog.component.html'
})
export class QmsMaterielEntryTaskDeleteDialogComponent {
    qmsMaterielEntry: IQmsMaterielEntry;

    constructor(
        private qmsMaterielEntryService: QmsMaterielEntryService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager,
        private router: Router
    ) {}

    clear() {
        this.router.navigate(['qms-materiel-entry/']);
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.qmsMaterielEntryService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'qmsMaterielEntryListModification',
                content: 'Deleted an qmsMaterielEntry'
            });
            this.router.navigate(['qms-materiel-entry/']);
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-qms-materiel-entry-delete-popup',
    template: ''
})
export class QmsMaterielEntryTaskDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ qmsMaterielEntry }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(QmsMaterielEntryTaskDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.qmsMaterielEntry = qmsMaterielEntry;
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
