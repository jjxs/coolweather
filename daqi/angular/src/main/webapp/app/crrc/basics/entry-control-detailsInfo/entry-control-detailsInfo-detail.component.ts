import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { IQmsEntryControlDetails } from 'app/shared/model/qms-entry-control-details.model';
import { IQmsMateriel } from 'app/shared/model/qms-materiel.model';
import { EntryControlDetailsInfoService } from './entry-control-detailsInfo.service';

@Component({
    selector: 'jhi-entry-control-detailsInfo-detail',
    templateUrl: './entry-control-detailsInfo-detail.component.html',
    styleUrls: ['./entry-control-detailsInfo.scss']
})
export class EntryControlDetailsDetailInfoComponent implements OnInit {
    qmsEntryControlDetails: IQmsEntryControlDetails;
    materielName: string = '';

    constructor(private activatedRoute: ActivatedRoute, private entryControlDetailsInfoService: EntryControlDetailsInfoService, private router: Router) { }

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ qmsEntryControlDetails }) => {
            this.qmsEntryControlDetails = qmsEntryControlDetails;
            // 取得物料名称
            this.getMaterielNameInfo();
        });
    }

    /**
    * 物料编码焦点离开取得物料名称
    */
    getMaterielNameInfo() {
        if (this.qmsEntryControlDetails.materielId !== null && this.qmsEntryControlDetails.materielId !== undefined) {
            // 取得选中数据
            this.entryControlDetailsInfoService.findMaterielName(this.qmsEntryControlDetails.materielId)
                .subscribe((materielNameInfoBack: HttpResponse<IQmsMateriel>) => {

                    this.materielName = materielNameInfoBack.body.materielName;

                });
        }

    }
    /**
     * 返回一览页面
     */
    previousState() {
        this.router.navigate(['/entry-control-detailsInfo']);
    }
}
