import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IRbacMenu } from 'app/shared/model/rbac-menu.model';
import { RbacMenuService } from './rbac-menu.service';

@Component({
    selector: 'jhi-rbac-menu-delete-dialog',
    templateUrl: './rbac-menu-delete-dialog.component.html'
})
export class RbacMenuDeleteDialogComponent implements AfterViewInit {
    rbacMenu: IRbacMenu;

    constructor(private rbacMenuService: RbacMenuService, public activeModal: NgbActiveModal, private eventManager: JhiEventManager) {}

    ngAfterViewInit() {
        // this.el.nativeElement.focus();
        document.getElementById('divError').focus();
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.rbacMenuService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'rbacMenuListModification',
                content: 'Deleted an rbacMenu'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-rbac-menu-delete-popup',
    template: ''
})
export class RbacMenuDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ rbacMenu }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(RbacMenuDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
                this.ngbModalRef.componentInstance.rbacMenu = rbacMenu;
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
