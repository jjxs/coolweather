import { Component, OnInit } from '@angular/core';
import { ActivatedRoute ,Router} from '@angular/router';
import { QmsProductService} from './qms-product.service'
import { IQmsProduct } from 'app/shared/model/qms-product.model';

@Component({
    selector: 'jhi-qms-product-detail',
    templateUrl: './qms-product-detail.component.html',
    styleUrls: [
        './product.scss'
    ]
})
export class QmsProductDetailComponent implements OnInit {
    qmsProduct: IQmsProduct;
    materielCd:any;
    materielName:any;

    constructor(private activatedRoute: ActivatedRoute,private router: Router,private qmsProductService:QmsProductService) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ qmsProduct }) => {
            this.qmsProduct = qmsProduct;
        });

        //物料数据
        this.qmsProductService.getMaterielList( { data:this.qmsProduct.materielId})
        .subscribe(data => {
            console.log(data);
            this.materielCd = data[0]["materielCd"]
            this.materielName = data[0]["materielName"]
        })
    }

    previousState() {
        this.router.navigate(['/product']);
    }
}
