import { Component, OnInit } from '@angular/core';
import { ActivatedRoute , Router} from '@angular/router';

import { IQmsSupplier } from 'app/shared/model/qms-supplier.model';
import { IQmsSupplierClass } from 'app/shared/model/qms-supplier-class.model'
import { QmsSupplierService} from './qms-supplier.service'
import { from } from 'rxjs';
@Component({
    selector: 'jhi-qms-supplier-detail',
    templateUrl: './qms-supplier-detail.component.html',
    styleUrls: ['./supplierInformation.scss']
})
export class QmsSupplierDetailComponent implements OnInit {
    qmsSupplier: IQmsSupplier;
    qmsSupplierClass:IQmsSupplierClass;
    suppkierClass:any;
    suppkierClassName:any;

    constructor(private activatedRoute: ActivatedRoute,private router: Router,private qmsSupplierService:QmsSupplierService) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ qmsSupplier }) => {
            this.qmsSupplier = qmsSupplier;
        });
        //生产方式
        this.qmsSupplierService.getSupplierList( { data:this.qmsSupplier.supplierClassId})
        .subscribe(data => {
            this.suppkierClass = data[0]["suppkierClass"]
            this.suppkierClassName = data[0]["suppkierClassName"]
        })
        
        
    }

    previousState() {
        this.router.navigate(['/supplier']);
    }
}
