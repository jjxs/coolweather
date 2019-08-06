import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable, from } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { Message } from 'primeng/components/common/api';
import { IQmsMateriel } from 'app/shared/model/qms-materiel.model';
import { QmsMaterielService } from './qms-materiel.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { QmsUnitComponent } from 'app/popup/unitSelection/qms-unit.component'
import { QmsMaterielTypeComponent } from 'app/popup/materialTypeSelection/qms-materiel-type.component';
import { RbacRoleSelectionComponent } from 'app/popup/rbacRoleSelection/rbacRoleSelection.component';
@Component({
    selector: 'jhi-qms-materiel-update',
    templateUrl: './qms-materiel-update.component.html',
    styleUrls: [
        './materiel.scss'
    ]
})
export class QmsMaterielUpdateComponent implements OnInit {
    qmsMateriel: IQmsMateriel;
    isSaving: boolean;
    makeTime: string;
    modifyTime: string;
    flag: any;
    flagStatus: any;
    msgs: Message[] = [];
    //生产方式
    sheng = [];
    // sheng = [
    //     { label: '自制', value: 'M' },
    //     { label: '外购', value: 'P' },
    //     { label: '外协', value: 'O' }
    // ];
    //物料属性

    shuxing = [
        // { label: '虚拟件', value: 'V' },
        // { label: '产品', value: 'P' }
    ];
    //八防
    eight = [];

    //质检关键
    zhijian = [];
    //是否试验
    isCheck = [];
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
    materTypeCd = "";
    materTypeName = "";
    constructor(private qmsMaterielService: QmsMaterielService,
        private activatedRoute: ActivatedRoute, private modalService: NgbModal,
        // private qmsEntryInspectionService: QmsEntryInspectionService,
        private router: Router
    ) { }

    ngOnInit() {
        //进入到查看页面，首先需要取得下拉框的值
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
        //质检关键
        this.qmsMaterielService.getMasterList({ kbnCd: 'M04' })
            .subscribe(data => {
                this.zhijian = data
            })
        //是否试验
        this.qmsMaterielService.getMasterList({ kbnCd: 'M04' })
            .subscribe(data => {
                this.isCheck = data
            })
        //八防
        this.qmsMaterielService.getMasterList({ kbnCd: 'M03' })
            .subscribe(data => {
                this.eight = data
            })
        //检验类型
        this.qmsMaterielService.getMasterList({ kbnCd: 'M15' })
            .subscribe(data => {
                this.checkType = data
            })


        //物料分类
        this.qmsMaterielService.getMaterielTypeList()
            .subscribe(data => {
                this.materielType = data
            })

        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ qmsMateriel }) => {
            this.qmsMateriel = qmsMateriel;
            // 如果是添加页面，则flag为0
            if (this.qmsMateriel.materielCd == null) {
                this.flag = 0;
                this.flagStatus = '0';
                this.qmsMateriel.flagStatus = '0';
            } else {
                this.flag = 1;
                this.flagStatus = '0';
            }
            if (this.qmsMateriel.id !== undefined) {
                //单位一览
                if (this.qmsMateriel.useUnitId == null || this.qmsMateriel.useUnitId == 0) {
                    this.qmsMateriel.useUnitId = 0
                } else {
                    this.qmsMaterielService.getUnitPopupList({ data: this.qmsMateriel.useUnitId })
                        .subscribe(data => {
                            this.unitId = data[0]["id"]
                            this.unitCd = data[0]["unitCd"]
                            this.unitName = data[0]["unitName"]
                        })
                }
                //角色一览
                if (this.qmsMateriel.mhandlerRoleId == null || this.qmsMateriel.mhandlerRoleId == 0) {
                    this.qmsMateriel.mhandlerRoleId = 0
                } else {
                    this.qmsMaterielService.getRolePopupList({ data: this.qmsMateriel.mhandlerRoleId })
                        .subscribe(data => {
                            console.log();
                            this.roleId = data[0]["id"]
                            this.roleCode = data[0]["roleCode"]
                            this.roleName = data[0]["roleName"]
                        })
                }
                //物料分类一览
                if (this.qmsMateriel.materielTypeId == null || this.qmsMateriel.materielTypeId == 0) {
                    this.qmsMateriel.materielTypeId == 0
                } else {
                    this.qmsMaterielService.getMarPopupList({ data: this.qmsMateriel.materielTypeId })
                        .subscribe(data => {
                            console.log();
                            this.materTypeId = data[0]["id"]
                            this.materTypeCd = data[0]["materielTypeCd"]
                            this.materTypeName = data[0]["materielTypeName"]
                        })
                }


            }
            this.makeTime = this.qmsMateriel.makeTime != null ? this.qmsMateriel.makeTime.format(DATE_TIME_FORMAT) : null;
            this.modifyTime = this.qmsMateriel.modifyTime != null ? this.qmsMateriel.modifyTime.format(DATE_TIME_FORMAT) : null;
        });
    }

    // 打开单位选择
    goToUnit() {
        this.modalService.open(QmsUnitComponent as Component, { backdrop: 'static', keyboard: false, size: 'lg' }).result.then(
            (result) => {
                if (result !== undefined) {
                    this.unitId = result["id"]
                    this.unitCd = result["unitCd"];
                    this.unitName = result["unitName"]
                }
            }
        );
    }
    //单位焦点离开
    blurUnit() {
        this.qmsMaterielService.getUniteKeyUpList({ unitCd: this.unitCd })
            .subscribe(data => {
                if (this.unitCd != "") {
                    if (data.length == 0) {
                        this.msgs.push({ severity: 'error', summary: '提示', detail: '该单位不存在!' });
                        this.unitCd = ""
                        this.unitName = "";
                        this.unitId = 0
                    } else {
                        this.unitId = data[0]["id"];
                        this.unitName = data[0]["unitName"]
                    }
                } else {
                    this.unitName = "";
                }

            });
    }
    searchUnit() {
        this.qmsMaterielService.getUniteKeyUpList({ unitCd: this.unitCd })
            .subscribe(data => {

                if (data.length == 0) {
                    this.unitName = "";
                } else {
                    this.unitId = data[0]["id"];
                    this.unitName = data[0]["unitName"]
                }
            });
    }
    // 打开物料分类选择
    goToMaterialType() {
        this.modalService.open(QmsMaterielTypeComponent as Component, { backdrop: 'static', keyboard: false, size: 'lg' }).result.then(
            (result) => {
                if (result !== undefined) {
                    this.materTypeId = result["id"]
                    this.materTypeCd = result["materielTypeCd"];
                    this.materTypeName = result["materielTypeName"]

                }
            }
        );
    }
    //物料分类数据输入事件
    searchMar() {
        this.qmsMaterielService.getMarKeyUpList({ materTypeCd: this.materTypeCd })
            .subscribe(data => {

                if (data.length == 0) {
                    this.materTypeName = "";
                } else {
                    this.materTypeId = data[0]["id"];
                    this.materTypeName = data[0]["materielTypeName"]
                }
            });
    }
    //物料分类离开焦点事件
    blurMar() {

        this.qmsMaterielService.getMarKeyUpList({ materTypeCd: this.materTypeCd })
            .subscribe(data => {
                if (this.materTypeCd != "") {
                    if (data.length == 0) {
                        this.msgs.push({ severity: 'error', summary: '提示', detail: '该物料分类不存在!' });
                        this.materTypeCd = ""
                        this.materTypeName = "";
                        this.materTypeId = 0
                    } else {
                        this.materTypeId = data[0]["id"];
                        this.materTypeName = data[0]["materielTypeName"]
                    }
                } else {
                    this.materTypeName = "";
                }

            });


    }
    //打开物料员角色
    goToRabcUser() {
        this.modalService.open(RbacRoleSelectionComponent as Component, { backdrop: 'static', keyboard: false, size: 'lg' }).result.then(
            (result) => {
                if (result !== undefined) {
                    this.roleId = result["id"]
                    this.roleCode = result["roleCode"];
                    this.roleName = result["roleName"]

                }
            }
        );
    }
    //角色查新的键盘按下事件
    searchRole() {
        this.qmsMaterielService.getRoleKeyUpList({ roleCode: this.roleCode })
            .subscribe(data => {
                if (data.length == 0) {
                    this.roleName = "";
                } else {
                    this.roleId = data[0]["id"];
                    this.roleName = data[0]["roleName"]
                }
            });
    }

    blurRole() {
        this.qmsMaterielService.getRoleKeyUpList({ roleCode: this.roleCode })
            .subscribe(data => {
                if (this.roleCode != "") {
                    if (data.length == 0) {
                        this.msgs.push({ severity: 'error', summary: '提示', detail: '该物料员角色不存在!' });
                        this.roleCode = ""
                        this.roleName = "";
                        this.roleId = 0
                    } else {
                        this.roleId = data[0]["id"];
                        this.roleName = data[0]["roleName"]
                    }
                } else {
                    this.roleName = "";
                }

            });
    }

    changeValue() {

        if (this.qmsMateriel.checkType != "2") {
            this.qmsMateriel.checkRate = null;
        }
    }

    previousState() {
        this.router.navigate(['/materiel']);
    }

    save() {
        // var pattint = /^\d+$/;            //int类型的正则
        // var pattdouble = /^\d+\.\d+$/;    //double类型的正则

        if (this.qmsMateriel.id !== undefined) {
            //从更新进入
            if (this.unitCd == "" || this.unitCd == null) {
                this.qmsMateriel.useUnitId = 0;
            } else {
                this.qmsMateriel.useUnitId = this.unitId;
            }
            if (this.materTypeCd == "" || this.materTypeCd == null) {
                this.qmsMateriel.materielTypeId = 0;
            } else {
                this.qmsMateriel.materielTypeId = this.materTypeId;
            }
            if (this.roleCode == "" || this.roleCode == null) {
                this.qmsMateriel.mhandlerRoleId = 0;
            } else {
                this.qmsMateriel.mhandlerRoleId = this.roleId;
            }
            //抽检比例的check
            var checkRate = this.checkRate(this.qmsMateriel.checkRate);
            if (checkRate == true) {
                //质量的check
                var weight = this.checkWeight(this.qmsMateriel.weight);
                if (weight == true) {
                    var density = this.checkDensity(this.qmsMateriel.density);
                    if (density == true) {
                        if(this.qmsMateriel.productMode==null||this.qmsMateriel.productMode==''){
                            this.msgs.push({ severity: 'error', summary: '提示', detail: '生产方式不能为空!' });
                            this.isSaving = false;
                        }else{
                            this.subscribeToSaveResponse(this.qmsMaterielService.update(this.qmsMateriel));
                        }
                        
                    }
                }
            }



            //     this.subscribeToSaveResponse(this.qmsMaterielService.update(this.qmsMateriel));

        } else {
            //从新增进入
            //物料编码重复的Check
            this.qmsMaterielService.sameCheck({ samecheck: this.qmsMateriel.materielCd }).subscribe(data => {
                if (data.body === 1) {
                    this.msgs.push({ severity: 'error', summary: '提示', detail: '该物料已存在!' });
                } else {

                    this.qmsMateriel.useUnitId = this.unitId;
                    this.qmsMateriel.mhandlerRoleId = this.roleId;
                    this.qmsMateriel.materielTypeId = this.materTypeId;
                    this.isSaving = true;
                    this.qmsMateriel.makeTime = this.makeTime != null ? moment(this.makeTime, DATE_TIME_FORMAT) : null;
                    this.qmsMateriel.modifyTime = this.modifyTime != null ? moment(this.modifyTime, DATE_TIME_FORMAT) : null;
                    //抽检比例的check
                    var checkRate = this.checkRate(this.qmsMateriel.checkRate);
                    if (checkRate == true) {
                        //质量的check
                        var weight = this.checkWeight(this.qmsMateriel.weight);
                        if (weight == true) {
                            var density = this.checkDensity(this.qmsMateriel.density);
                            if (density == true) {
                                if(this.qmsMateriel.productMode==null||this.qmsMateriel.productMode==''){
                                    this.msgs.push({ severity: 'error', summary: '提示', detail: '生产方式不能为空!' });
                                    this.isSaving = false;
                                }else{
                                    this.subscribeToSaveResponse(this.qmsMaterielService.create(this.qmsMateriel));
                                }
                            }
                        }
                    }
                    // this.subscribeToSaveResponse(this.qmsMaterielService.create(this.qmsMateriel));
                }
            });
        }
    }
    //抽检比例
    checkRate(checkRate) {

        if (checkRate != null) {
            if (isNaN(checkRate) == true) {
                
                this.msgs.push({ severity: 'error', summary: '提示', detail: '抽检比例只能输入1到100的整数!' });
                this.isSaving = false;
                return false;
            } else {
                if(checkRate==""){
                    checkRate=null;
                    return true;
                }
                var reg = new RegExp("^([1-9]|[1-9]\\d|100)$");
                if (!reg.test(checkRate.toString())) {
                    
                    this.msgs.push({ severity: 'error', summary: '提示', detail: '抽检比例只能输入1到100的整数!' });
                    this.isSaving = false;
                    return false;
                } else {
                    return true;
                }
            }
        } else {
            
            return true;
        }
    }
    ////质量的check
    checkDensity(density) {

        if (density != null) {
            if (isNaN(density) == true) {
                this.msgs.push({ severity: 'error', summary: '提示', detail: '密度最多四位整数,三位小数!' });
                this.isSaving = false;
                return false;
            } else {
                var checkDensity = density.toString().split(".")

                if (checkDensity.length == 1) {
                    if (checkDensity[0].length > 4) {
                        this.msgs.push({ severity: 'error', summary: '提示', detail: '密度最多四位整数,三位小数!' });
                        this.isSaving = false;
                        return false;
                    } else {
                        return true;
                    }
                } else {
                    if (checkDensity[0].length > 4 || checkDensity[1].length > 3) {
                        this.msgs.push({ severity: 'error', summary: '提示', detail: '密度最多四位整数,三位小数!' });
                        this.isSaving = false;
                        return false;
                    } else {
                        return true;
                    }
                }
            }
        } else {
            return true;
        }
    }

    //密度check
    checkWeight(weight) {

        if (weight != null) {
            if (isNaN(weight) == true) {
                this.msgs.push({ severity: 'error', summary: '提示', detail: '重量最多四位整数,三位小数!' });
                this.isSaving = false;
                return false;
            } else {
                var checkWeight = weight.toString().split(".")

                if (checkWeight.length == 1) {
                    if (checkWeight[0].length > 4) {
                        this.msgs.push({ severity: 'error', summary: '提示', detail: '重量最多四位整数,三位小数!' });
                        this.isSaving = false;
                        return false;
                    } else {
                        return true;
                    }
                } else {
                    if (checkWeight[0].length > 4 || checkWeight[1].length > 3) {
                        this.msgs.push({ severity: 'error', summary: '提示', detail: '重量最多四位整数,三位小数!' });
                        this.isSaving = false;
                        return false;
                    } else {
                        return true;
                    }
                }
            }
        } else {
            return true;
        }
    }


    private subscribeToSaveResponse(result: Observable<HttpResponse<IQmsMateriel>>) {
        result.subscribe((res: HttpResponse<IQmsMateriel>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }
}
