import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IQmsProductionInspectionResult } from 'app/shared/model/qms-production-inspection-result.model';
import { QmsProductionInspectionResultService } from './qms-production-inspection-result.service';

@Component({
    selector: 'jhi-qms-production-inspection-result-delete-dialog',
    templateUrl: './qms-production-inspection-result-delete-dialog.component.html'
})
export class QmsProductionInspectionResultDeleteDialogComponent {
    qmsProductionInspectionResult: IQmsProductionInspectionResult;

    constructor(
        private qmsProductionInspectionResultService: QmsProductionInspectionResultService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.qmsProductionInspectionResultService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'qmsProductionInspectionResultListModification',
                content: 'Deleted an qmsProductionInspectionResult'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-qms-production-inspection-result-delete-popup',
    template: ''
})
export class QmsProductionInspectionResultDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ qmsProductionInspectionResult }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(QmsProductionInspectionResultDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.qmsProductionInspectionResult = qmsProductionInspectionResult;
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
