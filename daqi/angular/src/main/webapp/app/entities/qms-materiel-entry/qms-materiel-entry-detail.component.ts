import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IQmsMaterielEntry } from 'app/shared/model/qms-materiel-entry.model';

@Component({
    selector: 'jhi-qms-materiel-entry-detail',
    templateUrl: './qms-materiel-entry-detail.component.html'
})
export class QmsMaterielEntryDetailComponent implements OnInit {
    qmsMaterielEntry: IQmsMaterielEntry;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ qmsMaterielEntry }) => {
            this.qmsMaterielEntry = qmsMaterielEntry;
        });
    }

    previousState() {
        window.history.back();
    }
}
