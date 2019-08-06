import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IRbacElement } from 'app/shared/model/rbac-element.model';
import { RbacElementService } from './rbac-element.service';

@Component({
    selector: 'jhi-rbac-element-delete-dialog',
    templateUrl: './rbac-element-delete-dialog.component.html'
})
export class RbacElementDeleteDialogComponent {
    rbacElement: IRbacElement;

    constructor(
        private rbacElementService: RbacElementService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.rbacElementService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'rbacElementListModification',
                content: 'Deleted an rbacElement'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-rbac-element-delete-popup',
    template: ''
})
export class RbacElementDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ rbacElement }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(RbacElementDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.rbacElement = rbacElement;
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
