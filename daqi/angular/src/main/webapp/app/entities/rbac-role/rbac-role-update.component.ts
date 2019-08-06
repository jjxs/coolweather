import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { IRbacRole } from 'app/shared/model/rbac-role.model';
import { RbacRoleService } from './rbac-role.service';
import { RbacRight } from 'app/shared/model/rbac-right.model';
import { RbacRightService } from '../rbac-right';
import { JhiAlertService } from 'ng-jhipster';
import { RbacRoleRightRelation } from 'app/shared/model/rbac-role-right-relation.model';
import { RbacRole } from 'app/shared/model/rbac-role.model';
import { Message } from 'primeng/components/common/api';
import { SelectItem } from 'primeng/api';
import { RbacRoleRightRelationService } from '../rbac-role-right-relation';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';

@Component({
    selector: 'jhi-rbac-role-update',
    templateUrl: './rbac-role-update.component.html',
    styleUrls: ['rbac-role.scss']
})
export class RbacRoleUpdateComponent implements OnInit {
    rbacRole: RbacRole;
    rbacRights: any;
    rbacRoleRightRelation: RbacRoleRightRelation;
    isSaving: boolean;
    insDateTime: string;
    updDateTime: string;
    delDateTime: string;
    triggerDateTime: string;
    selectListVal: any;
    msgs: Message[] = [];
    rightsList: SelectItem[] = [];
    resultList: Object[] = [];
    // 排他时间
    updateTimes: any;
    errorMessage: any;
    tips: any;
    updRolef: any;
    addRolef: any;
    Rolehasupd: any;

    constructor(private rbacRoleService: RbacRoleService, private activatedRoute: ActivatedRoute, private rbacRightService: RbacRightService,
        private jhiAlertService: JhiAlertService, private router: Router,
        private rbacRoleRightRelationService: RbacRoleRightRelationService, private translate: TranslateService) {}

    ngOnInit() {

        this.translate.get('alertInfo').subscribe(
            value => {
              this.errorMessage = value.error;
              this.tips = value.tip;
              this.updRolef = value.updRolef;
              this.addRolef = value.addRolef;
              this.Rolehasupd = value.Rolehasupd;
            }
          );
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ rbacRole }) => {
            this.rbacRole = rbacRole;

        });
        // 获取权限信息
        // this.rbacRightService.getRightInfos({
        //     page: 0,
        //     size: '',
        //     sort: '',
        //     rightName: '',
        // })
        // .subscribe((res: HttpResponse<RbacRight[]>) => {
        //     this.rightsList.push ({'label': '', 'value': ''});
        //     for (let a = 0; a < res.body.length; a++) {
        //         this.rightsList.push ({'label': res.body[a].rightName, 'value': res.body[a].id });
        //     }
        // }, (res: HttpErrorResponse) => this.onError(res.message));
        // 权限下拉列表
        this.rbacRoleService.getRightList().subscribe(data => { 
            this.rightsList.push ({'label': '', 'value': ''});
            for (let a = 0; a < data.length; a++) {
                this.rightsList.push ({'label': data[a].rightName, 'value': data[a].id });
            }
        });
         // 编辑画面,下拉列表赋值
         if (this.rbacRole.id !== undefined) {
            this.rbacRoleRightRelationService.findRoleRight(this.rbacRole.id).subscribe(data => {
                this.selectListVal = data.body[0][2];
                this.updateTimes = data.body[0][4];
            });
         }
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    previousState() {
        this.router.navigateByUrl('/rbac-role');
    }

    save() {
        this.isSaving = true;

        if (this.rbacRole.id !== undefined) {
            this.rbacRole.updDateTime = moment(this.updateTimes);
            this.rbacRoleService.updateRole(this.selectListVal, this.rbacRole).subscribe(data => {
                if (data.body === 0) {
                    // 关闭画面
                    this.router.navigate(['rbac-role'], { queryParams: { savaFlag: 2 } });
                } else if (data.body === 1) {
                    this.msgs.push({ severity: this.errorMessage, summary: this.tips, detail: this.updRolef });
                    this.isSaving = false;
                } else if (data.body === 5 || data.body === '5') {
                    this.msgs.push({ severity: this.errorMessage, summary: this.tips, detail: this.Rolehasupd });
                    this.isSaving = false;
                }
            });
        } else {
            this.rbacRoleService.createRole(this.selectListVal, this.rbacRole).subscribe(data => {
                if ( data.body === 0) {
                    // 关闭画面
                    this.router.navigate(['rbac-role'], { queryParams: { savaFlag: 1 } });
                } else if (data.body === 1) {
                    this.msgs.push({ severity: this.errorMessage, summary: this.tips, detail: this.addRolef });
                } else {
                    this.msgs.push({ severity: this.errorMessage, summary: this.tips, detail: this.addRolef });
                }
            });
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IRbacRole>>) {
        result.subscribe((res: HttpResponse<IRbacRole>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }
}
