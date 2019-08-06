import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';
import * as moment from 'moment';
import { IRbacRight } from 'app/shared/model/rbac-right.model';
import { RbacRightService } from './rbac-right.service';
import { Message } from 'primeng/components/common/api';
import { RbacMenuRightRelationService } from 'app/entities/rbac-menu-right-relation/rbac-menu-right-relation.service';

@Component({
    selector: 'jhi-rbac-right-delete-dialog',
    templateUrl: './rbac-right-delete-dialog.component.html'
})
export class RbacRightDeleteDialogComponent {
    rbacRight: IRbacRight;
    menuList: string[] = [];
     // 排他时间
     updateTimes: any;
     msgs: Message[] = [];

    constructor(private rbacRightService: RbacRightService, public activeModal: NgbActiveModal, private eventManager: JhiEventManager,  private router: Router) {}

    clear() {
        this.router.navigate(['/rbacRight']);
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
       
        this.rbacRightService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'rbacRightListModification',
                content: 'Deleted an rbacRight'
            });
            this.router.navigate(['/rbacRight']);
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-rbac-right-delete-popup',
    template: ''
})
export class RbacRightDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;
    asd: Object[] = [];
    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal,
        private rbacMenuRightRelationService: RbacMenuRightRelationService) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ rbacRight }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(RbacRightDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
                this.ngbModalRef.componentInstance.rbacRight = rbacRight;
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
