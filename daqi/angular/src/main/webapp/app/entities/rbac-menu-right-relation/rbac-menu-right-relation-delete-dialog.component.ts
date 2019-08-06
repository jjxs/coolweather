import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IRbacMenuRightRelation } from 'app/shared/model/rbac-menu-right-relation.model';
import { RbacMenuRightRelationService } from './rbac-menu-right-relation.service';

@Component({
    selector: 'jhi-rbac-menu-right-relation-delete-dialog',
    templateUrl: './rbac-menu-right-relation-delete-dialog.component.html'
})
export class RbacMenuRightRelationDeleteDialogComponent {
    rbacMenuRightRelation: IRbacMenuRightRelation;

    constructor(
        private rbacMenuRightRelationService: RbacMenuRightRelationService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.rbacMenuRightRelationService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'rbacMenuRightRelationListModification',
                content: 'Deleted an rbacMenuRightRelation'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-rbac-menu-right-relation-delete-popup',
    template: ''
})
export class RbacMenuRightRelationDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ rbacMenuRightRelation }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(RbacMenuRightRelationDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.rbacMenuRightRelation = rbacMenuRightRelation;
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
