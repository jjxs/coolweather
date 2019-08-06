import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IQmsEnclosure } from 'app/shared/model/qms-enclosure.model';

@Component({
    selector: 'jhi-qms-enclosure-detail',
    templateUrl: './qms-enclosure-detail.component.html'
})
export class QmsEnclosureDetailComponent implements OnInit {
    qmsEnclosure: IQmsEnclosure;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ qmsEnclosure }) => {
            this.qmsEnclosure = qmsEnclosure;
        });
    }

    previousState() {
        window.history.back();
    }
}
