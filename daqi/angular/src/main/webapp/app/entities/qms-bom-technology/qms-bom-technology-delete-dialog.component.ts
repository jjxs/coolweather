import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IQmsBomTechnology } from 'app/shared/model/qms-bom-technology.model';
import { QmsBomTechnologyService } from './qms-bom-technology.service';

@Component({
    selector: 'jhi-qms-bom-technology-delete-dialog',
    templateUrl: './qms-bom-technology-delete-dialog.component.html'
})
export class QmsBomTechnologyDeleteDialogComponent {
    qmsBomTechnology: IQmsBomTechnology;

    constructor(
        private qmsBomTechnologyService: QmsBomTechnologyService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.qmsBomTechnologyService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'qmsBomTechnologyListModification',
                content: 'Deleted an qmsBomTechnology'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-qms-bom-technology-delete-popup',
    template: ''
})
export class QmsBomTechnologyDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ qmsBomTechnology }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(QmsBomTechnologyDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.qmsBomTechnology = qmsBomTechnology;
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
