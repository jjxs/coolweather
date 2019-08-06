import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { VehicleTypeInfoService } from './vehicle-type-info.service';
import { IQmsVehicleTypeInfo } from 'app/shared/model/qms-vehicle-type-info.model';

@Component({
    selector: 'jhi-vehicle-type-info-detail',
    templateUrl: './vehicle-type-info-detail.component.html',
    styleUrls: ['./vehicle-type-info.css']
})
export class VehicleTypeInfoDetailComponent implements OnInit {
    qmsVehicleTypeInfo: IQmsVehicleTypeInfo;
    vehicleClass: any = '';
    vehicleClassName: any = '';
    constructor(private qmsVehicleTypeInfoService: VehicleTypeInfoService,private activatedRoute: ActivatedRoute, private router: Router) { }

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ qmsVehicleTypeInfo }) => {
            this.qmsVehicleTypeInfo = qmsVehicleTypeInfo;
            this.qmsVehicleTypeInfoService.findClass(this.qmsVehicleTypeInfo.vehicleClassId).subscribe(datas => {
                this.vehicleClass = datas.body.vehicleClass;
                this.vehicleClassName = datas.body.vehicleClassName;
            })
        });
    }
    /**
     * 返回一览页面
     */
    previousState() {
        // window.history.back();
        this.router.navigate(['/vehicle-type-info']);
    }
}
