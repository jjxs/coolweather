import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IQmsBogiepressureTonTest } from 'app/shared/model/qms-bogiepressure-ton-test.model';
import { QmsBogiepressureTonTestService } from './qms-bogiepressure-ton-test.service';

@Component({
    selector: 'jhi-qms-bogiepressure-ton-test-delete-dialog',
    templateUrl: './qms-bogiepressure-ton-test-delete-dialog.component.html'
})
export class QmsBogiepressureTonTestDeleteDialogComponent {
    qmsBogiepressureTonTest: IQmsBogiepressureTonTest;

    constructor(
        private qmsBogiepressureTonTestService: QmsBogiepressureTonTestService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.qmsBogiepressureTonTestService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'qmsBogiepressureTonTestListModification',
                content: 'Deleted an qmsBogiepressureTonTest'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-qms-bogiepressure-ton-test-delete-popup',
    template: ''
})
export class QmsBogiepressureTonTestDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ qmsBogiepressureTonTest }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(QmsBogiepressureTonTestDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.qmsBogiepressureTonTest = qmsBogiepressureTonTest;
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
