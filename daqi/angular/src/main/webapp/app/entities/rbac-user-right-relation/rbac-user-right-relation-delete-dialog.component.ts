import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IRbacUserRightRelation } from 'app/shared/model/rbac-user-right-relation.model';
import { RbacUserRightRelationService } from './rbac-user-right-relation.service';

@Component({
    selector: 'jhi-rbac-user-right-relation-delete-dialog',
    templateUrl: './rbac-user-right-relation-delete-dialog.component.html'
})
export class RbacUserRightRelationDeleteDialogComponent {
    rbacUserRightRelation: IRbacUserRightRelation;

    constructor(
        private rbacUserRightRelationService: RbacUserRightRelationService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.rbacUserRightRelationService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'rbacUserRightRelationListModification',
                content: 'Deleted an rbacUserRightRelation'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-rbac-user-right-relation-delete-popup',
    template: ''
})
export class RbacUserRightRelationDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ rbacUserRightRelation }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(RbacUserRightRelationDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.rbacUserRightRelation = rbacUserRightRelation;
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
