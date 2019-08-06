import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IPapiToken } from 'app/shared/model/papi-token.model';
import { Principal } from 'app/core';
import { PapiTokenService } from './papi-token.service';

@Component({
    selector: 'jhi-papi-token',
    templateUrl: './papi-token.component.html'
})
export class PapiTokenComponent implements OnInit, OnDestroy {
    papiTokens: IPapiToken[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private papiTokenService: PapiTokenService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.papiTokenService.query().subscribe(
            (res: HttpResponse<IPapiToken[]>) => {
                this.papiTokens = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInPapiTokens();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IPapiToken) {
        return item.id;
    }

    registerChangeInPapiTokens() {
        this.eventSubscriber = this.eventManager.subscribe('papiTokenListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
