import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IHstServerInfoDetails } from 'app/shared/model/hst-server-info-details.model';
import { Principal } from 'app/core';
import { HstServerInfoDetailsService } from './hst-server-info-details.service';

@Component({
    selector: 'jhi-hst-server-info-details',
    templateUrl: './hst-server-info-details.component.html'
})
export class HstServerInfoDetailsComponent implements OnInit, OnDestroy {
    hstServerInfoDetails: IHstServerInfoDetails[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private hstServerInfoDetailsService: HstServerInfoDetailsService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.hstServerInfoDetailsService.query().subscribe(
            (res: HttpResponse<IHstServerInfoDetails[]>) => {
                this.hstServerInfoDetails = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInHstServerInfoDetails();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IHstServerInfoDetails) {
        return item.id;
    }

    registerChangeInHstServerInfoDetails() {
        this.eventSubscriber = this.eventManager.subscribe('hstServerInfoDetailsListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
