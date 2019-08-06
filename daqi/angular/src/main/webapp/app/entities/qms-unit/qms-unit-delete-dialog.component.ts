import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IQmsUnit } from 'app/shared/model/qms-unit.model';
import { QmsUnitService } from './qms-unit.service';

@Component({
    selector: 'jhi-qms-unit-delete-dialog',
    templateUrl: './qms-unit-delete-dialog.component.html'
})
export class QmsUnitDeleteDialogComponent {
    qmsUnit: IQmsUnit;

    constructor(private qmsUnitService: QmsUnitService, public activeModal: NgbActiveModal, private eventManager: JhiEventManager) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.qmsUnitService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'qmsUnitListModification',
                content: 'Deleted an qmsUnit'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-qms-unit-delete-popup',
    template: ''
})
export class QmsUnitDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ qmsUnit }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(QmsUnitDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
                this.ngbModalRef.componentInstance.qmsUnit = qmsUnit;
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
