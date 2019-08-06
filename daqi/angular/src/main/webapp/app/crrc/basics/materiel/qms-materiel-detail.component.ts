import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { IQmsMateriel } from 'app/shared/model/qms-materiel.model';
// import { QmsEntryInspectionService } from 'app/nrv';
import { QmsMaterielService } from './qms-materiel.service'
@Component({
    selector: 'jhi-qms-materiel-detail',
    templateUrl: './qms-materiel-detail.component.html',
    styleUrls: [
        './materiel.scss'
    ]
})
export class QmsMaterielDetailComponent implements OnInit {
    qmsMateriel: IQmsMateriel;
    //生产方式

    sheng = [];
    //物料属性

    shuxing = [];
    //八防
    eight = [];

    //质检关键
    zhijian = [];
    //供应商
    gongyingshang = [];
    //单位
    danwei = [];
    //角色
    role = [];
    //物料分类
    materielType = [];
    //抽检类型
    checkType = [];
    //是否试验
    isCheck = [];
    //单位三个值
    unitId: any;
    unitCd: any;
    unitName: any;
    //物料员三个值
    roleId: any;
    roleCode: any;
    roleName: any;
    //物料分类三个值
    materTypeId: any;
    materTypeCd: any;
    materTypeName: any;

    constructor(private activatedRoute: ActivatedRoute,
        // private qmsEntryInspectionService: QmsEntryInspectionService,
        private router: Router,
        private qmsMaterielService: QmsMaterielService,
    ) { }

    ngOnInit() {
        //进入到查看页面，首先需要取得下拉框的值
        //供应商
        this.qmsMaterielService.getSupplierList()
            .subscribe(data => {
                this.gongyingshang = data
            })
        //单位
        this.qmsMaterielService.getUnitList()
            .subscribe(data => {
                this.danwei = data
            })
        //角色
        this.qmsMaterielService.getRoleList()
            .subscribe(data => {
                this.role = data
            })
        //物料分类
        this.qmsMaterielService.getMaterielTypeList()
            .subscribe(data => {
                this.materielType = data
            })
        //检验类型
        this.qmsMaterielService.getMasterList({ kbnCd: 'M15' })
            .subscribe(data => {
                this.checkType = data
            })
        //是否试验
        this.qmsMaterielService.getMasterList({ kbnCd: 'M04' })
            .subscribe(data => {
                this.isCheck = data
            })
        //生产方式
        this.qmsMaterielService.getMasterList({ kbnCd: 'M01' })
            .subscribe(data => {
                this.sheng = data
            })
        //物料属性
        this.qmsMaterielService.getMasterList({ kbnCd: 'M02' })
            .subscribe(data => {
                this.shuxing = data
            })
        //八防
        this.qmsMaterielService.getMasterList({ kbnCd: 'M03' })
            .subscribe(data => {
                this.eight = data
            })
        //质检关键
        this.qmsMaterielService.getMasterList({ kbnCd: 'M04' })
            .subscribe(data => {
                this.zhijian = data
            })

        this.activatedRoute.data.subscribe(({ qmsMateriel }) => {
            this.qmsMateriel = qmsMateriel;
            //单位一览
            if(this.qmsMateriel.useUnitId!=null&& this.qmsMateriel.useUnitId != 0){
            this.qmsMaterielService.getUnitPopupList({ data: this.qmsMateriel.useUnitId })
                .subscribe(data => {
                    this.unitId = data[0]["id"]
                    this.unitCd = data[0]["unitCd"]
                    this.unitName = data[0]["unitName"]
                })
            }
            //角色一览
            if(this.qmsMateriel.mhandlerRoleId!=null&& this.qmsMateriel.mhandlerRoleId != 0){
                this.qmsMaterielService.getRolePopupList({ data: this.qmsMateriel.mhandlerRoleId })
                .subscribe(data => {
                    console.log();
                    this.roleId = data[0]["id"]
                    this.roleCode = data[0]["roleCode"]
                    this.roleName = data[0]["roleName"]
                })
            }
            
            //物料分类一览
            if(this.qmsMateriel.materielTypeId!=null&& this.qmsMateriel.materielTypeId != 0){
                this.qmsMaterielService.getMarPopupList({ data: this.qmsMateriel.materielTypeId })
                .subscribe(data => {
                    console.log();
                    this.materTypeId = data[0]["id"]
                    this.materTypeCd = data[0]["materielTypeCd"]
                    this.materTypeName = data[0]["materielTypeName"]
                })
            }
            
        });
        
    }

    previousState() {
        this.router.navigate(['/materiel']);
    }
}
