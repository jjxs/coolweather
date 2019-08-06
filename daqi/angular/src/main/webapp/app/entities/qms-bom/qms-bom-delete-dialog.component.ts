import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IQmsBom } from 'app/shared/model/qms-bom.model';
import { QmsBomService } from './qms-bom.service';

@Component({
    selector: 'jhi-qms-bom-delete-dialog',
    templateUrl: './qms-bom-delete-dialog.component.html'
})
export class QmsBomDeleteDialogComponent {
    qmsBom: IQmsBom;

    constructor(private qmsBomService: QmsBomService, public activeModal: NgbActiveModal, private eventManager: JhiEventManager) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.qmsBomService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'qmsBomListModification',
                content: 'Deleted an qmsBom'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-qms-bom-delete-popup',
    template: ''
})
export class QmsBomDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ qmsBom }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(QmsBomDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
                this.ngbModalRef.componentInstance.qmsBom = qmsBom;
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
