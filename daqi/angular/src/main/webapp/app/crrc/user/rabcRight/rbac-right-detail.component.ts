import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { IRbacRight } from 'app/shared/model/rbac-right.model';
import { RbacRightService } from './rbac-right.service';
import { TreeNode } from 'primeng/primeng';
import { RbacMenuService } from 'app/entities/rbac-menu/rbac-menu.service';
import { Message } from 'primeng/components/common/api';
import { JhiAlertService } from 'ng-jhipster';
import { RbacMenuRightRelationService } from 'app/entities/rbac-menu-right-relation/rbac-menu-right-relation.service';
import { IRbacMenuRightRelation } from 'app/shared/model/rbac-menu-right-relation.model';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';

@Component({
    selector: 'jhi-rbac-right-detail',
    templateUrl: './rbac-right-detail.component.html',
    styleUrls: ['rbac-right.scss']

})
export class RbacRightDetailComponent implements OnInit {
    rbacRight: IRbacRight;
    iRbacMenuRightRelation: IRbacMenuRightRelation;
    isSaving: boolean;
    insDateTime: string;
    updDateTime: string;
    delDateTime: string;
    triggerDateTime: string;
    files: TreeNode[] = [];
    selectedFiles: TreeNode[] = [];
    selectedFilesBack: TreeNode[] = [];
    dataArray: string[] = [];
    adminActions: any;
    adminAction: any = [];
    msgs: Message[] = [];
    menuList: string[] = [];
    asd: Object[] = [];
    tips: any;
    selectMenuRight: any;
    addfail: any;
    error: any;
    Righthasupd: any;
    updRightf: any;
    flag: any;
    // 排他时间
    updateTimes: any;
    constructor(private rbacRightService: RbacRightService, private activatedRoute: ActivatedRoute,
        private rbacMenuService: RbacMenuService, private jhiAlertService: JhiAlertService,
        private router: Router, private rbacMenuRightRelationService: RbacMenuRightRelationService, private translate: TranslateService) { }

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ rbacRight }) => {
            this.rbacRight = rbacRight;
            // 如果是添加页面，则flag为0
            if (this.rbacRight.rightCode == null) {
                this.flag = 0;
            } else {
                this.flag = 1;
            }
            this.insDateTime = this.rbacRight.insDateTime != null ? this.rbacRight.insDateTime.format(DATE_TIME_FORMAT) : null;
            this.updDateTime = this.rbacRight.updDateTime != null ? this.rbacRight.updDateTime.format(DATE_TIME_FORMAT) : null;
            this.delDateTime = this.rbacRight.delDateTime != null ? this.rbacRight.delDateTime.format(DATE_TIME_FORMAT) : null;
            this.triggerDateTime = this.rbacRight.triggerDateTime != null ? this.rbacRight.triggerDateTime.format(DATE_TIME_FORMAT) : null;
        });
        this.translate.get('alertInfo').subscribe(
            value => {
                this.tips = value.tip;
                this.selectMenuRight = value.selectMenuRight;
                this.addfail = value.addfail;
                this.error = value.error;
                this.Righthasupd = value.Righthasupd;
                this.updRightf = value.updRightf;
            }
        );
        // 获取角色信息

        this.rbacRightService.getRightInfo().subscribe(data => {
            this.adminActions = data;
            if (!this.adminActions) {
                return;
            } else {
                this.adminActions.forEach(menuList => {
                    if (menuList.pMenuId === 0) {
                        this.files.push({ 'label': menuList.menuName, 'data': menuList.id, 'leaf': false, 'children': [] });
                    }

                });
                this.adminActions.forEach(menuList => {
                    this.files.forEach(file => {
                        if (menuList.pMenuId === file.data) {
                            file.children.push({ 'label': menuList.menuName, 'data': menuList.id });
                        }
                    });
                });
                // 编辑权限
                if (this.rbacRight.id !== undefined) {
                    // 获取权限组
                    this.rbacMenuRightRelationService.findRightMenu(this.rbacRight.id).subscribe(datas => {

                        for (let a = 0; a < datas.body.length; a++) {

                            this.asd.push(datas.body[a]);

                        }
                        this.updateTimes = this.asd[0][5];
                        for (let i = 0; i < this.asd.length; i++) {
                            this.files.forEach(file => {

                                if (file.children.length > 0) {
                                    file.children.forEach(filec => {
                                        if (filec.data === this.asd[i][3]) {
                                            this.selectedFiles.push(filec);
                                            this.selectedFilesBack = this.selectedFiles
                                            if (file.data === this.asd[i][0]) {
                                                this.selectedFiles.push(file);
                                                this.selectedFilesBack = this.selectedFiles
                                            }
                                        }
                                    });
                                }

                            });

                        }

                    });

                }

            }
        }, error => console.error(error));

    }

    // 查询失败时候的回调
    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    nodeSelect() {
        this.selectedFiles = [];
        for (let y = 0; y < this.selectedFilesBack.length; y++) {
            this.selectedFiles.push(this.selectedFilesBack[y])
        }
    }
    nodeUnselect() {
        this.selectedFiles = [];
        for (let y = 0; y < this.selectedFilesBack.length; y++) {
            this.selectedFiles.push(this.selectedFilesBack[y])
        }
    }

    previousState() {
        this.router.navigateByUrl('/rbacRight');
    }



    private subscribeToSaveResponse(result: Observable<HttpResponse<IRbacRight>>) {
        result.subscribe((res: HttpResponse<IRbacRight>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        // false
        this.isSaving = true;
    }
}
