import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IQmsInspectionInfo } from 'app/shared/model/qms-inspection-info.model';
import { QmsInspectionInfoService } from './qms-inspection-info.service';

@Component({
    selector: 'jhi-qms-inspection-info-delete-dialog',
    templateUrl: './qms-inspection-info-delete-dialog.component.html'
})
export class QmsInspectionInfoDeleteDialogComponent {
    qmsInspectionInfo: IQmsInspectionInfo;

    constructor(
        private qmsInspectionInfoService: QmsInspectionInfoService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.qmsInspectionInfoService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'qmsInspectionInfoListModification',
                content: 'Deleted an qmsInspectionInfo'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-qms-inspection-info-delete-popup',
    template: ''
})
export class QmsInspectionInfoDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ qmsInspectionInfo }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(QmsInspectionInfoDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.qmsInspectionInfo = qmsInspectionInfo;
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
