import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';
import * as moment from 'moment';
import { IRbacUser } from 'app/shared/model/rbac-user.model';
import { RbacUserService } from './rbac-user.service';
import { Message } from 'primeng/components/common/api';
@Component({
    selector: 'jhi-rbac-user-delete-dialog',
    templateUrl: './rbac-user-delete-dialog.component.html'
})
export class RbacUserDeleteDialogComponent {
    rbacUser: IRbacUser;
    userId: String;
    selectListVal: any;
    // 排他时间
    updateTimes: any;
    msgs: Message[] = [];

    constructor(private rbacUserService: RbacUserService, public activeModal: NgbActiveModal, private eventManager: JhiEventManager, private router: Router) {}

    clear() {
        this.router.navigate(['/rbac-user']);
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.rbacUser.delFlag = 1;
        this.rbacUser.updDateTime = moment(this.updateTimes);
        this.rbacUserService.updateUsers(this.selectListVal, this.rbacUser).subscribe(data => {
            if (data.body === 4 || data.body ==='4' ) {
                this.msgs.push({ severity: 'error', summary: '提示', detail: '该员工已被更新' });
            } else {
                this.eventManager.broadcast({
                    name: 'rbacUserListModification',
                    content: 'Deleted an rbacUser'
                });
                this.activeModal.dismiss(true);

                this.router.navigate(['/rbac-user']);
            }
            
        });
    }
}

@Component({
    selector: 'jhi-rbac-user-delete-popup',
    template: ''
})
export class RbacUserDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;
    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal, private rbacUserService: RbacUserService) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ rbacUser }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(RbacUserDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
                this.ngbModalRef.componentInstance.rbacUser = rbacUser;
                // 编辑画面,下拉列表赋值
                    this.rbacUserService.findUserRole(rbacUser.id).subscribe(data => {
                        this.ngbModalRef.componentInstance.updateTimes = data.body[0][2];
                    });
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
