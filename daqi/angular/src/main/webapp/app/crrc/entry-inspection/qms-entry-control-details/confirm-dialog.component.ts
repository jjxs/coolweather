import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

@Component({
    selector: 'jhi-confirm-dialog',
    templateUrl: './confirm-dialog.component.html'
})
export class ConfirmComponent {
    leave = false;
    constructor(public activeModal: NgbActiveModal) {}

    clear() {
        this.activeModal.close(false);
    }

    confirm() {
        this.activeModal.close(true);
    }
}
