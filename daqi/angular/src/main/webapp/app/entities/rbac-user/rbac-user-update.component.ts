import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { IRbacUser } from 'app/shared/model/rbac-user.model';
import { RbacUserService } from './rbac-user.service';
import { IRbacRole } from 'app/shared/model/rbac-role.model';
import { RbacRoleService } from '../rbac-role';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';
import { Message } from 'primeng/components/common/api';
import {SelectItem} from 'primeng/api';
import { DatePipe } from '@angular/common';

@Component({
    selector: 'jhi-rbac-user-update',
    templateUrl: './rbac-user-update.component.html',
    styleUrls: ['rbac-user.scss']
})
export class RbacUserUpdateComponent implements OnInit {
    rbacUser: IRbacUser;
    iRbacRoles: IRbacRole[];
    isSaving: boolean;
    userLastLoginTime: string;
    insDateTime: string;
    updDateTime: string;
    delDateTime: string;
    triggerDateTime: string;
    // 新增或编辑的人(登陆者)
    userId: string;
    // 新密码，确认密码初始为空
    passwordNew: { passwordO: string, passwordN: string } = { passwordO: '', passwordN: '' };
    // 确认密码填写标示
    passwordcFlag: boolean;
    msgs: Message[] = [];
    errorMessage: any;
    addfail: any;
    rolesList: SelectItem[] = [];
    selectListVal: any;
    usercoderepeat: any;
    tips: any;
    // 新增返回结果
    flag: any;
    // 确认密码和新密码是否一致
    passwordcCheck: boolean;
    // 新密码格式
    passwordCheck: boolean;
    // 密码长度
    passwordLength: boolean;
    // 权限信息
    roleInfo: any;
    // 手机格式
    telCheck: boolean;
    // 邮箱格式
    mailCheck: boolean;
    // 排他时间
    updateTimes: any;
    updUserf: any;
    addUserf: any;
    Userhasupd: any;

    constructor(private rbacUserService: RbacUserService,
                private activatedRoute: ActivatedRoute,
                private router: Router,
                private translate: TranslateService,
                private rbacRoleService: RbacRoleService,
                private jhiAlertService: JhiAlertService,
                private eventManager: JhiEventManager,
                private datePipe: DatePipe
               ) {
                }

    ngOnInit() {

        this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
            this.usercoderepeat = this.translate.get('rbacUser.message.unsame')['value'];
            this.errorMessage = this.translate.get('rbacUser.message.error')['value'];
        });
        this.translate.get('alertInfo').subscribe(
            value => {
              this.errorMessage = value.error;
              this.usercoderepeat = value.usercoderepeat;
              this.tips = value.tip;
              this.updUserf = value.updUserf;
              this.addUserf = value.addUserf;
              this.Userhasupd = value.Userhasupd;
            }
          );
        this.isSaving = false;
        this.passwordcCheck = true;
        this.passwordCheck = true;
        this.passwordLength = true;
        this.telCheck = true;
        this.mailCheck = true;
        this.userId = sessionStorage.getItem('id');
        this.activatedRoute.data.subscribe(({ rbacUser }) => {
            this.rbacUser = rbacUser;
        });
        // 获取角色信息

        // this.rbacRoleService.getRoleInfo({
        //     page: 0,
        //     size: '',
        //     sort: '',
        //     roleName: ''
        // })
        // .subscribe((res: HttpResponse<IRbacRole[]>) => { this.iRbacRoles = res.body;
        //     this.rolesList.push ({'label': '', 'value': ''});
        //     for (let a = 0; a < res.body.length; a++) {
        //         this.rolesList.push ({'label': res.body[a].roleName, 'value': res.body[a].id });
        //     }

        // }, (res: HttpErrorResponse) => this.onError(res.message));
        // 角色下拉列表
        this.rbacUserService.getRoleList().subscribe(data => {
            this.rolesList.push ({'label': '', 'value': ''});
            for (let a = 0; a < data.length; a++) {
                this.rolesList.push ({'label': data[a].roleName, 'value': data[a].id });
            }
        });
        // 编辑画面,下拉列表赋值
        if ( this.rbacUser.id !== undefined) {
            this.rbacUserService.findUserRole(this.rbacUser.id).subscribe(data => {
                this.selectListVal = data.body[0][0];
                this.updateTimes = data.body[0][2];
            });
         }

    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    previousState() {
        this.router.navigate(['rbac-user']);
    }
    // 保存或者编辑，以rbacUser.id 判断
    save() {
        this.isSaving = true;

        if (this.rbacUser.id !== undefined) {
            this.rbacUser.updDateTime = moment(this.updateTimes);
            this.rbacUser.delFlag = 0;
            if (this.passwordNew.passwordO !== '') {
                if (this.passwordNew.passwordN === '') {
                    this.passwordcFlag = true;
                    this.isSaving = false;
                }
                this.rbacUser.userPassword = this.passwordNew.passwordO;
            }
            // 修改员工信息
                this.rbacUserService.updateUsers(this.selectListVal, this.rbacUser).subscribe(datas => {
                    this.flag = '';
                    this.flag = datas.body;
                    if (this.flag === 1) {
                        this.msgs.push({ severity: 'error', summary: this.errorMessage, detail: this.updUserf });
                        this.isSaving = false;
                    } else if (this.flag === 4) {
                        this.msgs.push({ severity: 'error', summary: this.errorMessage, detail: this.Userhasupd });
                        this.isSaving = false;
                    } else {
                        // 关闭画面
                        this.router.navigate(['rbac-user'], { queryParams: { savaFlag: 2 } });
                    }
                }, error => {
                    this.msgs.push({ severity: 'error', summary: this.errorMessage, detail: this.updUserf });
                    this.isSaving = false;
                });
        } else {

            // 新增员工信息
            this.rbacUserService.createUsers(this.selectListVal, this.rbacUser).subscribe(datas => {
                this.flag = '';
                this.flag = datas.body;
                // 用户名重复
                if (this.flag === 3) {
                    this.msgs.push({ severity: 'error', summary: this.errorMessage, detail: this.usercoderepeat });
                    this.isSaving = false;
                } else if (this.flag === 1) {
                    this.msgs.push({ severity: 'error', summary: this.errorMessage, detail: this.addUserf });
                    this.isSaving = false;
                } else {
                   // 关闭画面
                   this.router.navigate(['rbac-user'], { queryParams: { savaFlag: 1 } });
                }
            }, error => {
                this.msgs.push({ severity: 'error', summary: this.errorMessage, detail: this.addUserf });
                this.isSaving = false;
            });

        }
    }

    /**
     * 管理员密码验证
     */
    password() {
        if (this.rbacUser.id === undefined) {
            if (this.rbacUser.userPassword !== undefined && '' !== this.rbacUser.userPassword && this.rbacUser.userPassword.length < 6) {
                this.passwordCheck = true;
                this.passwordLength = false;
            } else if (this.rbacUser.userPassword !== undefined && '' !== this.rbacUser.userPassword && !/^[A-Za-z0-9]+$/.test(this.rbacUser.userPassword)) {
                this.passwordCheck = false;
                this.passwordLength = true;
            } else {
                this.passwordCheck = true;
                this.passwordLength = true;

            }
        }

        if (this.rbacUser.id !== undefined) {
            if (this.passwordNew.passwordO !== undefined && '' !== this.passwordNew.passwordO && this.passwordNew.passwordO.length < 6) {
                this.passwordCheck = true;
                this.passwordLength = false;
                this.isSaving = true;
                return true;
            } else if (this.passwordNew.passwordO !== undefined && '' !== this.passwordNew.passwordO && !/^[A-Za-z0-9]+$/.test(this.passwordNew.passwordO)) {
                this.passwordCheck = false;
                this.passwordLength = true;
                this.isSaving = true;
                return true;
            } else {
                this.passwordCheck = true;
                this.passwordLength = true;
                this.isSaving = false;
            }

            if ('' !== this.passwordNew.passwordO && '' !== this.passwordNew.passwordN && this.passwordNew.passwordO !== this.passwordNew.passwordN) {
                this.passwordcCheck = false;
            } else {
                this.passwordcCheck = true;
            }
        }
    }
    /**
     * 用户确认密码验证
     */
    passwordes() {
        if ('' !== this.passwordNew.passwordO && '' !== this.passwordNew.passwordN && this.passwordNew.passwordO !== this.passwordNew.passwordN) {
            this.passwordcCheck = false;
            this.isSaving = true;
        } else {
            this.passwordcCheck = true;
            this.isSaving = false;
        }
    }
     /**
     *用户手机号验证
     */
    tel() {
        if (!(/^[1-9]([0-9]{1}|59|58|88|89)[0-9]{8}$/.test(this.rbacUser.userMobile) || /^[1-9]([0-9][0-9]{1}|59|58|88|89)[0-9]{8}$/.test(this.rbacUser.userMobile))) {
            this.telCheck = false;
            this.isSaving = true;
        } else {
            this.telCheck = true;
            this.isSaving = false;
        }
    }

     /**
     *用户邮箱验证
     */
    mail() {
        if (this.rbacUser.userMail !== undefined && this.rbacUser.userMail !== '') {
            if (!/^([0-9a-zA-Z]+[-._+&])*[0-9a-zA-Z]+@([-0-9a-zA-Z]+[.])+[a-zA-Z]{2,6}$/.test(this.rbacUser.userMail)) {
                this.mailCheck = false;
                this.isSaving = true;
            } else {
                this.mailCheck = true;
                this.isSaving = false;
            }
        } else {
            this.mailCheck = true;
            this.isSaving = false;
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IRbacUser>>) {
        result.subscribe((res: HttpResponse<IRbacUser>) =>
            this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }
}
