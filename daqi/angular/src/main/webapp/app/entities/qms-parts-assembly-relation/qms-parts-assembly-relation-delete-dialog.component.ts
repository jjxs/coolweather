import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IQmsPartsAssemblyRelation } from 'app/shared/model/qms-parts-assembly-relation.model';
import { QmsPartsAssemblyRelationService } from './qms-parts-assembly-relation.service';

@Component({
    selector: 'jhi-qms-parts-assembly-relation-delete-dialog',
    templateUrl: './qms-parts-assembly-relation-delete-dialog.component.html'
})
export class QmsPartsAssemblyRelationDeleteDialogComponent {
    qmsPartsAssemblyRelation: IQmsPartsAssemblyRelation;

    constructor(
        private qmsPartsAssemblyRelationService: QmsPartsAssemblyRelationService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.qmsPartsAssemblyRelationService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'qmsPartsAssemblyRelationListModification',
                content: 'Deleted an qmsPartsAssemblyRelation'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-qms-parts-assembly-relation-delete-popup',
    template: ''
})
export class QmsPartsAssemblyRelationDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ qmsPartsAssemblyRelation }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(QmsPartsAssemblyRelationDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.qmsPartsAssemblyRelation = qmsPartsAssemblyRelation;
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
