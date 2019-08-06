import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { IRbacRole } from 'app/shared/model/rbac-role.model';
import { RbacRoleService } from './rbac-role.service';
import { RbacRight } from 'app/shared/model/rbac-right.model';
import { RbacRightService } from 'app/entities/rbac-right/rbac-right.service';
import { JhiAlertService } from 'ng-jhipster';
import { RbacRoleRightRelation } from 'app/shared/model/rbac-role-right-relation.model';
import { RbacRole } from 'app/shared/model/rbac-role.model';
import { Message } from 'primeng/components/common/api';
import { SelectItem } from 'primeng/api';
import { RbacRoleRightRelationService } from 'app/entities/rbac-role-right-relation/rbac-role-right-relation.service';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';

@Component({
    selector: 'jhi-rbac-role-detail',
    templateUrl: './rbac-role-detail.component.html',
    styleUrls: ['rbac-role.scss']
})
export class RbacRoleDetailComponent implements OnInit {
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
        
        // 权限下拉列表
        this.rbacRoleService.getRightList().subscribe(data => { 
            
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
        this.router.navigateByUrl('/rbacRole');
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
