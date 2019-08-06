import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IQmsOrganizationInfo } from 'app/shared/model/qms-organization-info.model';
import { QmsOrganizationInfoService } from './qms-organization-info.service';

@Component({
    selector: 'jhi-qms-organization-info-delete-dialog',
    templateUrl: './qms-organization-info-delete-dialog.component.html'
})
export class QmsOrganizationInfoDeleteDialogComponent {
    qmsOrganizationInfo: IQmsOrganizationInfo;

    constructor(
        private qmsOrganizationInfoService: QmsOrganizationInfoService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.qmsOrganizationInfoService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'qmsOrganizationInfoListModification',
                content: 'Deleted an qmsOrganizationInfo'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-qms-organization-info-delete-popup',
    template: ''
})
export class QmsOrganizationInfoDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ qmsOrganizationInfo }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(QmsOrganizationInfoDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.qmsOrganizationInfo = qmsOrganizationInfo;
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
