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
import { RbacRoleService } from 'app/entities/rbac-role/rbac-role.service';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';
import { Message } from 'primeng/components/common/api';
import { SelectItem } from 'primeng/api';
import { DatePipe } from '@angular/common';

@Component({
    selector: 'jhi-rbac-user-detail',
    templateUrl: './rbac-user-detail.component.html',
    styleUrls: ['rbac-user.scss']
})
export class RbacUserDetailComponent implements OnInit {
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
     //组织信息
     orzList = [];

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

        //组织信息
        this.rbacUserService.getorzList()
        .subscribe(data => {
            this.orzList = data
        })
        
        this.activatedRoute.data.subscribe(({ rbacUser }) => {
            this.rbacUser = rbacUser;
        });
        // 获取角色信息

        // 角色下拉列表
        this.rbacUserService.getRoleList().subscribe(data => {
            // this.rolesList.push ({'label': '', 'value': ''});
            for (let a = 0; a < data.length; a++) {
                this.rolesList.push({ 'label': data[a].roleName, 'value': data[a].id });
            }
        });
        // 编辑画面,下拉列表赋值
        if (this.rbacUser.id !== undefined) {
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
        this.router.navigate(['rbacUser']);
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
            //修改之前要进行相应的判断
            var password = this.passwordCheckYl(this.rbacUser.userPassword);
            if (password == true) {
                var role = this.roleCheckYl(this.selectListVal);
                if (role == true) {
                    var tel = this.telCheckYl(this.rbacUser.userMobile)
                    if (tel == true) {
                        var mail = this.mailCheckYl(this.rbacUser.userMail);
                        if (mail == true) {
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
                                    this.router.navigate(['rbacUser'], { queryParams: { savaFlag: 2 } });
                                }
                            }, error => {
                                this.msgs.push({ severity: 'error', summary: this.errorMessage, detail: this.updUserf });
                                this.isSaving = false;
                            });
                        }

                    }
                }
            }
        } else {
            var password = this.passwordCheckYl(this.rbacUser.userPassword);
            if (password == true) {
                var role = this.roleCheckYl(this.selectListVal);
                if (role == true) {
                    var tel = this.telCheckYl(this.rbacUser.userMobile)
                    if (tel == true) {
                        var mail = this.mailCheckYl(this.rbacUser.userMail);
                        if (mail == true) {
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
                                    this.router.navigate(['rbacUser'], { queryParams: { savaFlag: 1 } });
                                }
                            }, error => {
                                this.msgs.push({ severity: 'error', summary: this.errorMessage, detail: this.addUserf });
                                this.isSaving = false;
                            });

                        }

                    }
                }
            }

        }
    }

    //用户密码验证
    passwordCheckYl(password) {
        if (password.length < 6) {
            this.msgs.push({ severity: 'error', summary: '提示', detail: '密码位数不能少于6位!' });
            this.isSaving = false;
            return false;
        } else if (!/^[A-Za-z0-9]+$/.test(password)) {
            this.msgs.push({ severity: 'error', summary: '提示', detail: '密码只能包含数字或字母!' });
            this.isSaving = false;
            return false;
        } else {
            return true;
        }
    }

    //角色check
    roleCheckYl(role) {
        if (role == null || role == '') {
            this.msgs.push({ severity: 'error', summary: '提示', detail: '角色不能为空!' });
            this.isSaving = false;
            return false;
        } else {
            return true;
        }
    }

    //电话check
    telCheckYl(tel) {
        if (tel == null || tel == '') {
            return true;
        } else if (!(/^[1-9]([0-9]{1}|59|58|88|89)[0-9]{8}$/.test(tel) || /^[1-9]([0-9][0-9]{1}|59|58|88|89)[0-9]{8}$/.test(tel))) {
            this.msgs.push({ severity: 'error', summary: '提示', detail: '电话格式输入有误!' });
            this.isSaving = false;
            return false;
        } else {
            return true;
        }
    }

    //邮箱check
    mailCheckYl(mail) {
        if (mail == null || mail == '') {
            return true;
        } else if (!/^([0-9a-zA-Z]+[-._+&])*[0-9a-zA-Z]+@([-0-9a-zA-Z]+[.])+[a-zA-Z]{2,6}$/.test(mail)) {
            this.msgs.push({ severity: 'error', summary: '提示', detail: '邮箱格式输入有误!' });
            this.isSaving = false;
            return false;
        } else {
            return true;
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
