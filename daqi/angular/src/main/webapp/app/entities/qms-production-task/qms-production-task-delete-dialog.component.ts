import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IQmsProductionTask } from 'app/shared/model/qms-production-task.model';
import { QmsProductionTaskService } from './qms-production-task.service';

@Component({
    selector: 'jhi-qms-production-task-delete-dialog',
    templateUrl: './qms-production-task-delete-dialog.component.html'
})
export class QmsProductionTaskDeleteDialogComponent {
    qmsProductionTask: IQmsProductionTask;

    constructor(
        private qmsProductionTaskService: QmsProductionTaskService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.qmsProductionTaskService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'qmsProductionTaskListModification',
                content: 'Deleted an qmsProductionTask'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-qms-production-task-delete-popup',
    template: ''
})
export class QmsProductionTaskDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ qmsProductionTask }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(QmsProductionTaskDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.qmsProductionTask = qmsProductionTask;
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
