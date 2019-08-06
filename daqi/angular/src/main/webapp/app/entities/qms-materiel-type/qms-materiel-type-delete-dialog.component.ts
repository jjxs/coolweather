import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IQmsMaterielType } from 'app/shared/model/qms-materiel-type.model';
import { QmsMaterielTypeService } from './qms-materiel-type.service';

@Component({
    selector: 'jhi-qms-materiel-type-delete-dialog',
    templateUrl: './qms-materiel-type-delete-dialog.component.html'
})
export class QmsMaterielTypeDeleteDialogComponent {
    qmsMaterielType: IQmsMaterielType;

    constructor(
        private qmsMaterielTypeService: QmsMaterielTypeService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.qmsMaterielTypeService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'qmsMaterielTypeListModification',
                content: 'Deleted an qmsMaterielType'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-qms-materiel-type-delete-popup',
    template: ''
})
export class QmsMaterielTypeDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ qmsMaterielType }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(QmsMaterielTypeDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.qmsMaterielType = qmsMaterielType;
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
