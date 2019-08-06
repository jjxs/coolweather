import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IQmsProductionInspection } from 'app/shared/model/qms-production-inspection.model';
import { QmsProductionInspectionService } from './qms-production-inspection.service';

@Component({
    selector: 'jhi-qms-production-inspection-delete-dialog',
    templateUrl: './qms-production-inspection-delete-dialog.component.html'
})
export class QmsProductionInspectionDeleteDialogComponent {
    qmsProductionInspection: IQmsProductionInspection;

    constructor(
        private qmsProductionInspectionService: QmsProductionInspectionService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.qmsProductionInspectionService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'qmsProductionInspectionListModification',
                content: 'Deleted an qmsProductionInspection'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-qms-production-inspection-delete-popup',
    template: ''
})
export class QmsProductionInspectionDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ qmsProductionInspection }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(QmsProductionInspectionDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.qmsProductionInspection = qmsProductionInspection;
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
