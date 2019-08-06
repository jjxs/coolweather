import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IQmsMicSwicthRegulattoTest } from 'app/shared/model/qms-mic-swicth-regulatto-test.model';
import { QmsMicSwicthRegulattoTestService } from './qms-mic-swicth-regulatto-test.service';

@Component({
    selector: 'jhi-qms-mic-swicth-regulatto-test-delete-dialog',
    templateUrl: './qms-mic-swicth-regulatto-test-delete-dialog.component.html'
})
export class QmsMicSwicthRegulattoTestDeleteDialogComponent {
    qmsMicSwicthRegulattoTest: IQmsMicSwicthRegulattoTest;

    constructor(
        private qmsMicSwicthRegulattoTestService: QmsMicSwicthRegulattoTestService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.qmsMicSwicthRegulattoTestService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'qmsMicSwicthRegulattoTestListModification',
                content: 'Deleted an qmsMicSwicthRegulattoTest'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-qms-mic-swicth-regulatto-test-delete-popup',
    template: ''
})
export class QmsMicSwicthRegulattoTestDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ qmsMicSwicthRegulattoTest }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(QmsMicSwicthRegulattoTestDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.qmsMicSwicthRegulattoTest = qmsMicSwicthRegulattoTest;
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
