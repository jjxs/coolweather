import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';
import * as moment from 'moment';
import { IRbacRole } from 'app/shared/model/rbac-role.model';
import { RbacRoleService } from './rbac-role.service';
import { RbacRoleRightRelationService } from 'app/entities/rbac-role-right-relation/rbac-role-right-relation.service';
import { Message } from 'primeng/components/common/api';
@Component({
    selector: 'jhi-rbac-role-delete-dialog',
    templateUrl: './rbac-role-delete-dialog.component.html'
})
export class RbacRoleDeleteDialogComponent {
    rbacRole: IRbacRole;
    selectListVal: any;
    // 排他时间
    updateTimes: any;
    msgs: Message[] = [];

    constructor(private rbacRoleService: RbacRoleService, public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager, private rbacRoleRightRelationService: RbacRoleRightRelationService, private router: Router) {
    }

    clear() {
        this.router.navigate(['/rbacRole']);
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        // this.rbacRole.delFlag = 1;
        // this.rbacRole.updDateTime = moment(this.updateTimes);
        // this.rbacRoleService.updateRole(this.selectListVal, this.rbacRole).subscribe(data => {
        //     if (data.body === 5 || data.body === '5' ) {
        //         this.msgs.push({ severity: 'error', summary: '提示', detail: '该角色已被更新' });
        //     } else {
        //         this.eventManager.broadcast({
        //         name: 'rbacRoleListModification',
        //         content: 'Deleted an rbacRole'
        //         });
        //         this.router.navigate(['/rbacRole']);
        //         this.activeModal.dismiss(true);
        //     }

        // });
        this.rbacRoleService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'rbacRoleListModification',
                content: 'Deleted an rbacRole'
            });
            this.router.navigate(['/rbacRole']);
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-rbac-role-delete-popup',
    template: ''
})
export class RbacRoleDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;
    rbacRoles: IRbacRole;
    updateTimes: any;
    constructor(private activatedRoute: ActivatedRoute, private router: Router,
        private modalService: NgbModal, private rbacRoleRightRelationService: RbacRoleRightRelationService) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ rbacRole }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(RbacRoleDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
                this.ngbModalRef.componentInstance.rbacRole = rbacRole;
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
