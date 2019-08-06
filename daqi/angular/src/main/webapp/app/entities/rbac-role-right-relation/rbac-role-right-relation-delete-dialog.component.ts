import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IRbacRoleRightRelation } from 'app/shared/model/rbac-role-right-relation.model';
import { RbacRoleRightRelationService } from './rbac-role-right-relation.service';

@Component({
    selector: 'jhi-rbac-role-right-relation-delete-dialog',
    templateUrl: './rbac-role-right-relation-delete-dialog.component.html'
})
export class RbacRoleRightRelationDeleteDialogComponent {
    rbacRoleRightRelation: IRbacRoleRightRelation;

    constructor(
        private rbacRoleRightRelationService: RbacRoleRightRelationService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.rbacRoleRightRelationService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'rbacRoleRightRelationListModification',
                content: 'Deleted an rbacRoleRightRelation'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-rbac-role-right-relation-delete-popup',
    template: ''
})
export class RbacRoleRightRelationDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ rbacRoleRightRelation }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(RbacRoleRightRelationDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.rbacRoleRightRelation = rbacRoleRightRelation;
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
