import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';
import * as moment from 'moment';
import { IRbacRight } from 'app/shared/model/rbac-right.model';
import { RbacRightService } from './rbac-right.service';
import { Message } from 'primeng/components/common/api';
import { RbacMenuRightRelationService } from '../rbac-menu-right-relation';

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
        this.router.navigate(['/rbac-right']);
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.rbacRight.delFlag = 1;
        this.rbacRight.updDateTime = moment(this.updateTimes);
        this.rbacRightService.updateRight(this.rbacRight, this.menuList).subscribe(data => {
            if (data.body === 4 || data.body === '4' ) {
                this.msgs.push({ severity: 'error', summary: '提示', detail: '该权限已被更新' });
            } else {
                this.eventManager.broadcast({
                    name: 'rbacRightListModification',
                    content: 'Deleted an rbacRight'
                });
                this.router.navigate(['/rbac-right']);
                this.activeModal.dismiss(true);
            }
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
                // 获取权限组
                this.rbacMenuRightRelationService.findRightMenu(rbacRight.id).subscribe(datas => {
                    for ( let a = 0; a < datas.body.length; a++) {

                        this.asd.push(datas.body[a]);

                    }
                    this.ngbModalRef.componentInstance.updateTimes = this.asd[0][5];
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
