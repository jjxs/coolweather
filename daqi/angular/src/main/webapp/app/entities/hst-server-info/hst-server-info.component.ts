import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IHstServerInfo } from 'app/shared/model/hst-server-info.model';
import { Principal } from 'app/core';
import { HstServerInfoService } from './hst-server-info.service';

@Component({
    selector: 'jhi-hst-server-info',
    templateUrl: './hst-server-info.component.html'
})
export class HstServerInfoComponent implements OnInit, OnDestroy {
    hstServerInfos: IHstServerInfo[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private hstServerInfoService: HstServerInfoService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.hstServerInfoService.query().subscribe(
            (res: HttpResponse<IHstServerInfo[]>) => {
                this.hstServerInfos = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInHstServerInfos();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IHstServerInfo) {
        return item.id;
    }

    registerChangeInHstServerInfos() {
        this.eventSubscriber = this.eventManager.subscribe('hstServerInfoListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
