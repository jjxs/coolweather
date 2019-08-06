import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IQmsIntelligentTriggerTest } from 'app/shared/model/qms-intelligent-trigger-test.model';
import { QmsIntelligentTriggerTestService } from './qms-intelligent-trigger-test.service';

@Component({
    selector: 'jhi-qms-intelligent-trigger-test-delete-dialog',
    templateUrl: './qms-intelligent-trigger-test-delete-dialog.component.html'
})
export class QmsIntelligentTriggerTestDeleteDialogComponent {
    qmsIntelligentTriggerTest: IQmsIntelligentTriggerTest;

    constructor(
        private qmsIntelligentTriggerTestService: QmsIntelligentTriggerTestService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.qmsIntelligentTriggerTestService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'qmsIntelligentTriggerTestListModification',
                content: 'Deleted an qmsIntelligentTriggerTest'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-qms-intelligent-trigger-test-delete-popup',
    template: ''
})
export class QmsIntelligentTriggerTestDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ qmsIntelligentTriggerTest }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(QmsIntelligentTriggerTestDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.qmsIntelligentTriggerTest = qmsIntelligentTriggerTest;
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
