import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IQmsMateriel } from 'app/shared/model/qms-materiel.model';
import { QmsMaterielService } from './qms-materiel.service';

@Component({
    selector: 'jhi-qms-materiel-delete-dialog',
    templateUrl: './qms-materiel-delete-dialog.component.html'
})
export class QmsMaterielDeleteDialogComponent {
    qmsMateriel: IQmsMateriel;

    constructor(
        private qmsMaterielService: QmsMaterielService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager,
        private router: Router
    ) {}

    clear() {
        this.router.navigate(['/materiel']);
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.qmsMaterielService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'qmsMaterielListModification',
                content: 'Deleted an qmsMateriel'
            });
            this.router.navigate(['/materiel']);
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-qms-materiel-delete-popup',
    template: ''
})
export class QmsMaterielDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ qmsMateriel }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(QmsMaterielDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.qmsMateriel = qmsMateriel;
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
