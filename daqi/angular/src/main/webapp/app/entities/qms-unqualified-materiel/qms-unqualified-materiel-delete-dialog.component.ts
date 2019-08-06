import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IQmsUnqualifiedMateriel } from 'app/shared/model/qms-unqualified-materiel.model';
import { QmsUnqualifiedMaterielService } from './qms-unqualified-materiel.service';

@Component({
    selector: 'jhi-qms-unqualified-materiel-delete-dialog',
    templateUrl: './qms-unqualified-materiel-delete-dialog.component.html'
})
export class QmsUnqualifiedMaterielDeleteDialogComponent {
    qmsUnqualifiedMateriel: IQmsUnqualifiedMateriel;

    constructor(
        private qmsUnqualifiedMaterielService: QmsUnqualifiedMaterielService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.qmsUnqualifiedMaterielService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'qmsUnqualifiedMaterielListModification',
                content: 'Deleted an qmsUnqualifiedMateriel'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-qms-unqualified-materiel-delete-popup',
    template: ''
})
export class QmsUnqualifiedMaterielDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ qmsUnqualifiedMateriel }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(QmsUnqualifiedMaterielDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.qmsUnqualifiedMateriel = qmsUnqualifiedMateriel;
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
