import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IQmsBogiepressurePositiveTest } from 'app/shared/model/qms-bogiepressure-positive-test.model';
import { QmsBogiepressurePositiveTestService } from './qms-bogiepressure-positive-test.service';

@Component({
    selector: 'jhi-qms-bogiepressure-positive-test-delete-dialog',
    templateUrl: './qms-bogiepressure-positive-test-delete-dialog.component.html'
})
export class QmsBogiepressurePositiveTestDeleteDialogComponent {
    qmsBogiepressurePositiveTest: IQmsBogiepressurePositiveTest;

    constructor(
        private qmsBogiepressurePositiveTestService: QmsBogiepressurePositiveTestService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.qmsBogiepressurePositiveTestService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'qmsBogiepressurePositiveTestListModification',
                content: 'Deleted an qmsBogiepressurePositiveTest'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-qms-bogiepressure-positive-test-delete-popup',
    template: ''
})
export class QmsBogiepressurePositiveTestDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ qmsBogiepressurePositiveTest }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(QmsBogiepressurePositiveTestDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.qmsBogiepressurePositiveTest = qmsBogiepressurePositiveTest;
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
