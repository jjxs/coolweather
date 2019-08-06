import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IQmsEnclosure } from 'app/shared/model/qms-enclosure.model';
import { QmsEnclosureService } from './qms-enclosure.service';

@Component({
    selector: 'jhi-qms-enclosure-delete-dialog',
    templateUrl: './qms-enclosure-delete-dialog.component.html'
})
export class QmsEnclosureDeleteDialogComponent {
    qmsEnclosure: IQmsEnclosure;

    constructor(
        private qmsEnclosureService: QmsEnclosureService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.qmsEnclosureService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'qmsEnclosureListModification',
                content: 'Deleted an qmsEnclosure'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-qms-enclosure-delete-popup',
    template: ''
})
export class QmsEnclosureDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ qmsEnclosure }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(QmsEnclosureDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.qmsEnclosure = qmsEnclosure;
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
