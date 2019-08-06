import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IQmsBreathingSafetyTest } from 'app/shared/model/qms-breathing-safety-test.model';
import { QmsBreathingSafetyTestService } from './qms-breathing-safety-test.service';

@Component({
    selector: 'jhi-qms-breathing-safety-test-delete-dialog',
    templateUrl: './qms-breathing-safety-test-delete-dialog.component.html'
})
export class QmsBreathingSafetyTestDeleteDialogComponent {
    qmsBreathingSafetyTest: IQmsBreathingSafetyTest;

    constructor(
        private qmsBreathingSafetyTestService: QmsBreathingSafetyTestService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.qmsBreathingSafetyTestService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'qmsBreathingSafetyTestListModification',
                content: 'Deleted an qmsBreathingSafetyTest'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-qms-breathing-safety-test-delete-popup',
    template: ''
})
export class QmsBreathingSafetyTestDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ qmsBreathingSafetyTest }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(QmsBreathingSafetyTestDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.qmsBreathingSafetyTest = qmsBreathingSafetyTest;
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
