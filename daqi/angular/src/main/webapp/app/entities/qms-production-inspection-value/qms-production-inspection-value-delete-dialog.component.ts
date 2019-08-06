import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IQmsProductionInspectionValue } from 'app/shared/model/qms-production-inspection-value.model';
import { QmsProductionInspectionValueService } from './qms-production-inspection-value.service';

@Component({
    selector: 'jhi-qms-production-inspection-value-delete-dialog',
    templateUrl: './qms-production-inspection-value-delete-dialog.component.html'
})
export class QmsProductionInspectionValueDeleteDialogComponent {
    qmsProductionInspectionValue: IQmsProductionInspectionValue;

    constructor(
        private qmsProductionInspectionValueService: QmsProductionInspectionValueService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.qmsProductionInspectionValueService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'qmsProductionInspectionValueListModification',
                content: 'Deleted an qmsProductionInspectionValue'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-qms-production-inspection-value-delete-popup',
    template: ''
})
export class QmsProductionInspectionValueDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ qmsProductionInspectionValue }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(QmsProductionInspectionValueDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.qmsProductionInspectionValue = qmsProductionInspectionValue;
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
