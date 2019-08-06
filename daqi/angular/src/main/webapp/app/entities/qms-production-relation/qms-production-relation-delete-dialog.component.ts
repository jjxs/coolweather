import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IQmsProductionRelation } from 'app/shared/model/qms-production-relation.model';
import { QmsProductionRelationService } from './qms-production-relation.service';

@Component({
    selector: 'jhi-qms-production-relation-delete-dialog',
    templateUrl: './qms-production-relation-delete-dialog.component.html'
})
export class QmsProductionRelationDeleteDialogComponent {
    qmsProductionRelation: IQmsProductionRelation;

    constructor(
        private qmsProductionRelationService: QmsProductionRelationService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.qmsProductionRelationService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'qmsProductionRelationListModification',
                content: 'Deleted an qmsProductionRelation'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-qms-production-relation-delete-popup',
    template: ''
})
export class QmsProductionRelationDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ qmsProductionRelation }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(QmsProductionRelationDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.qmsProductionRelation = qmsProductionRelation;
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
