import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IQmsProductionTask } from 'app/shared/model/qms-production-task.model';

@Component({
    selector: 'jhi-qms-production-task-detail',
    templateUrl: './qms-production-task-detail.component.html'
})
export class QmsProductionTaskDetailComponent implements OnInit {
    qmsProductionTask: IQmsProductionTask;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ qmsProductionTask }) => {
            this.qmsProductionTask = qmsProductionTask;
        });
    }

    previousState() {
        window.history.back();
    }
}
