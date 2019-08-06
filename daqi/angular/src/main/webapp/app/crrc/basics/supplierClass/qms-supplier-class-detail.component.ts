import { Component, OnInit } from '@angular/core';
import { ActivatedRoute ,Router} from '@angular/router';

import { IQmsSupplierClass } from 'app/shared/model/qms-supplier-class.model';

@Component({
    selector: 'jhi-qms-supplier-class-detail',
    templateUrl: './qms-supplier-class-detail.component.html',
    styleUrls: [
        './supplierClass.scss'
    ]
})
export class QmsSupplierClassDetailComponent implements OnInit {
    qmsSupplierClass: IQmsSupplierClass;

    constructor(private activatedRoute: ActivatedRoute,private router:Router) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ qmsSupplierClass }) => {
            this.qmsSupplierClass = qmsSupplierClass;
        });
    }

    previousState() {
        this.router.navigate(['/supplierClass']);
    }
}
