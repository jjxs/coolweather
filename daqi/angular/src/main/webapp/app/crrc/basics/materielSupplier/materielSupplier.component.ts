import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiParseLinks, JhiAlertService } from 'ng-jhipster';

import { IQmsMaterielSupplier } from 'app/shared/model/qms-materiel-supplier.model';
import { Principal } from 'app/core';

import { ITEMS_PER_PAGE } from 'app/shared';
import { QmsMaterielSupplierService } from './materielSupplier.service';

@Component({
    selector: 'jhi-qms-materiel-supplier',
    templateUrl: './materielSupplier.component.html',
    styleUrls: [
        './materielSupplier.scss'
    ]
})
export class QmsMaterielSupplierComponent implements OnInit, OnDestroy {
    currentAccount: any;
    qmsMaterielSuppliers: IQmsMaterielSupplier[];
    error: any;
    success: any;
    eventSubscriber: Subscription;
    routeData: any;
    links: any;
    totalItems: any;
    queryCount: any;
    itemsPerPage: any;
    page: any;
    predicate: any;
    previousPage: any;
    reverse: any;
    materielCd = '';
    materielName = '';
    supplierCd = '';
    supplierName = '';
    materielCdCache = '';
    materielNameCache = '';
    supplierCdCache = '';
    supplierNameCache = '';
    ischange = false;
    constructor(
        private qmsMaterielSupplierService: QmsMaterielSupplierService,
        private parseLinks: JhiParseLinks,
        private jhiAlertService: JhiAlertService,
        private principal: Principal,
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private eventManager: JhiEventManager
    ) {
        this.itemsPerPage = ITEMS_PER_PAGE;
        this.routeData = this.activatedRoute.data.subscribe(data => {
            this.page = data.pagingParams.page;
            this.previousPage = data.pagingParams.page;
            this.reverse = data.pagingParams.ascending;
            this.predicate = data.pagingParams.predicate;
        });
    }

    loadAll() {
        this.qmsMaterielSupplierService
            .query({
                materielCd: this.materielCd,
                materielName: this.materielName,
                supplierCd: this.supplierCd,
                supplierName: this.supplierName,
                page: this.page - 1,
                size: this.itemsPerPage,
                sort: this.sort()
            })
            .subscribe(
                (res: HttpResponse<IQmsMaterielSupplier[]>) => this.paginateQmsMaterielSuppliers(res.body, res.headers),
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }

    loadPage(page: number) {
        if (page !== this.previousPage) {
            this.previousPage = page;
            this.transition();
        }
    }

    transition() {
        this.router.navigate(['/qms-materiel-supplier'], {
            queryParams: {
                page: this.page,
                size: this.itemsPerPage,
                sort: this.predicate + ',' + (this.reverse ? 'asc' : 'desc')
            }
        });
        this.loadAll();
    }

    clear() {
        this.page = 0;
        this.router.navigate([
            '/qms-materiel-supplier',
            {
                page: this.page,
                sort: this.predicate + ',' + (this.reverse ? 'asc' : 'desc')
            }
        ]);
        this.loadAll();
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInQmsMaterielSuppliers();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IQmsMaterielSupplier) {
        return item.id;
    }

    registerChangeInQmsMaterielSuppliers() {
        this.eventSubscriber = this.eventManager.subscribe('qmsMaterielSupplierListModification', response => this.loadAll());
    }

    sort() {
        const result = [this.predicate + ',' + (this.reverse ? 'asc' : 'desc')];
        if (this.predicate !== 'id') {
            result.push('id');
        }
        return result;
    }

    private paginateQmsMaterielSuppliers(data: IQmsMaterielSupplier[], headers: HttpHeaders) {
        this.links = this.parseLinks.parse(headers.get('link'));
        this.totalItems = parseInt(headers.get('X-Total-Count'), 10);
        this.queryCount = this.totalItems;
        this.qmsMaterielSuppliers = data;
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
    
    loadCarsLazy(event) {
        this.page = event.first / this.itemsPerPage + 1;
        this.loadAll();
    }

    emptyInfo() {
        this.materielCd = '';
        this.materielName = '';
        this.supplierCd = '';
        this.supplierName = '';
        this.loadAll();
    }
}
