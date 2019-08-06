import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IQmsQualityControlDetailsRelation } from 'app/shared/model/qms-quality-control-details-relation.model';
import { QmsQualityControlDetailsRelationService } from './qms-quality-control-details-relation.service';

@Component({
    selector: 'jhi-qms-quality-control-details-relation-delete-dialog',
    templateUrl: './qms-quality-control-details-relation-delete-dialog.component.html'
})
export class QmsQualityControlDetailsRelationDeleteDialogComponent {
    qmsQualityControlDetailsRelation: IQmsQualityControlDetailsRelation;

    constructor(
        private qmsQualityControlDetailsRelationService: QmsQualityControlDetailsRelationService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.qmsQualityControlDetailsRelationService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'qmsQualityControlDetailsRelationListModification',
                content: 'Deleted an qmsQualityControlDetailsRelation'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-qms-quality-control-details-relation-delete-popup',
    template: ''
})
export class QmsQualityControlDetailsRelationDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ qmsQualityControlDetailsRelation }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(QmsQualityControlDetailsRelationDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.qmsQualityControlDetailsRelation = qmsQualityControlDetailsRelation;
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
