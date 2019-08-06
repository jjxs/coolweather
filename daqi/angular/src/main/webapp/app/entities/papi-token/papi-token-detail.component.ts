import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IPapiToken } from 'app/shared/model/papi-token.model';

@Component({
    selector: 'jhi-papi-token-detail',
    templateUrl: './papi-token-detail.component.html'
})
export class PapiTokenDetailComponent implements OnInit {
    papiToken: IPapiToken;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ papiToken }) => {
            this.papiToken = papiToken;
        });
    }

    previousState() {
        window.history.back();
    }
}
