import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, } from 'ng-jhipster';

import { IQmsUnhealthy, QmsUnhealthy } from 'app/shared/model/qms-unhealthy.model';
import { Principal } from 'app/core';

import { ITEMS_PER_PAGE } from 'app/shared';
import { AdverseReactionInformationService } from './adverse-reaction-information.service';
import { TreeNode } from 'primeng/api';
import { Observable } from 'rxjs';
import { Message } from 'primeng/components/common/api';
import { SelectItem } from 'primeng/api';
import { MessageService } from 'primeng/api';

@Component({
    selector: 'jhi-adverse-reaction-information',
    templateUrl: './adverse-reaction-information.component.html',
    styleUrls: ['adverse-reaction-information.scss'],
    providers: [MessageService]
})
export class AdverseReactionInformationComponent implements OnInit, OnDestroy {
    currentAccount: any;
    qmsOrganizationInfos: IQmsUnhealthy;
    error: any;
    success: any;
    eventSubscriber: Subscription;
    routeData: any;
    links: any;
    totalItems: any;
    queryCount: any;
    itemsPerPage: any;
    page: any;
    predicate: any;
    previousPage: any;
    reverse: any;
    // 测试数据
    files4: TreeNode[];
    selectedNode2: TreeNode;
    cols: any[];
    qmsOrganizationInfo: QmsUnhealthy;
    // 模糊查询现象编码
    vagueOrganizationCd: String = '';
    // 模糊查询现象名称
    vagueOrganizationName: String = '';
    // 上级现象
    parentCd = '';
    // 上级现象名称
    parentName = '';
    // 现象编码
    unhealthyCd = '';
    // 现象名称
    unhealthyName = '';
    // 现象名称
    isUse: boolean = false;
    // 备注
    remark = '';
    // 区分
    organizationCdQF: String = '';
    // 区分增加修改
    qfCreaUpda: String = '1';
    // 消息初始化
    msgs: Message[] = [];
    // 现象属性下拉框值
    organAttri: SelectItem[];
    // 判断点击添加
    addJudge: String = '0'
    // 遮盖层
    maskingLayer: any = false;
    constructor(
        private organizationInfoService: AdverseReactionInformationService,
        private principal: Principal,
        private messageService: MessageService,
        private eventManager: JhiEventManager
    ) {
        this.itemsPerPage = ITEMS_PER_PAGE;
    }
    /**
     * 数据查询
     */
    loadAll() {

        const param: any = {
            'organizationCd': this.vagueOrganizationCd, 'organizationName': this.vagueOrganizationName
        };
        this.organizationInfoService
            .selectInfo(param)
            .subscribe(data => {
                this.files4 = data.qmsOrganization;
            });
    }
    /**
     * 页面初始化
     */
    ngOnInit() {
        this.cols = [
            { field: 'organizationName', header: '现象名称' }
        ];
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInQmsOrganizationInfos();
    }
    registerChangeInQmsOrganizationInfos() {
        this.eventSubscriber = this.eventManager.subscribe('qmsOrganizationInfoListModification', response => this.loadAll());
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: QmsUnhealthy) {
        return item.id;
    }

    /**
     * 选中行
     * @param event
     */
    nodeSelect(event) {
        // 取得选中数据
        this.organizationInfoService.find(event.node.data.id)
            .subscribe((organizationResponse: HttpResponse<IQmsUnhealthy>) => {
                // 详细信息返回
                this.qmsOrganizationInfos = organizationResponse.body;
                // 上级现象赋值
                this.parentCd = this.qmsOrganizationInfos.parentCd;
                // 上级现象名称赋值
                this.parentName = this.qmsOrganizationInfos.compPkid;
                // 现象编码
                this.unhealthyCd = this.qmsOrganizationInfos.unhealthyCd;
                // 现象名称
                this.unhealthyName = this.qmsOrganizationInfos.unhealthyName;
                if (this.qmsOrganizationInfos.isUse === '1') {
                    this.isUse = true;
                } else {
                    this.isUse = false;
                }
                // 备注
                this.remark = this.qmsOrganizationInfos.remark;
                // 判断现象编码是否可编辑
                if (this.unhealthyCd !== '') {
                    this.organizationCdQF = '0';
                }
                // 区分新增还是编辑 1：新增 0：编辑
                this.qfCreaUpda = '0';

                // 复原添加判断
                this.addJudge = '0';
            });
    }

    /**
     * 去掉选中
     * @param event
     */
    nodeUnselect(event) {
        // 数据清空
        this.parentCd = '';
        this.parentName = '';
        this.unhealthyCd = '';
        this.unhealthyName = '';
        this.isUse = false;
        this.remark = '';
        // 判断现象编码是否可以编辑
        if (this.unhealthyCd === '') {
            this.organizationCdQF = '';
        }
        // 新增和编辑区分 1：新增 0：编辑
        this.qfCreaUpda = '1';
        // 复原添加判断
        this.addJudge = '0';
    }

    /**
     * 点击添加按钮
     */
    addInfo() {
        if (this.addJudge === '0' && this.unhealthyCd !== '' && this.unhealthyName !== '') {
            // 现象编码赋给上级现象
            this.parentCd = this.unhealthyCd;
            this.parentName = this.unhealthyName;
            this.addJudge = '1';
        }
        // 其余赋控制
        this.unhealthyCd = '';
        this.unhealthyName = '';
        this.isUse = false;
        this.remark = '';
        // 新增和编辑区分 1：新增 0：编辑
        this.qfCreaUpda = '1';
        if (this.unhealthyCd === '') {
            this.organizationCdQF = '';
        }
        this.selectedNode2 = null;
    }
    /**
     * 保存
     */
    save() {
        // alert(this.parentCd + '+' + this.organizationCd + '+' + this.organizationName + '+' + this.attribute + '+' + this.remark)
        this.msgs = [];
        // 判断现象ID不能为空
        if (this.unhealthyCd === '') {
            this.msgs.push({ severity: 'error', summary: '提示', detail: '现象编码不能为空' });
            return false;
        }
        // 判断现象名称不能为空
        if (this.unhealthyName === '') {
            this.msgs.push({ severity: 'error', summary: '提示', detail: '现象名称不能为空' });
            return false;
        }
        // this.qmsOrganizationInfo = this.qmsOrganizationInfos
        this.qmsOrganizationInfo = new QmsUnhealthy;
        // 赋值给数据集合
        this.qmsOrganizationInfo.parentCd = this.parentCd;
        this.qmsOrganizationInfo.unhealthyCd = this.unhealthyCd;
        this.qmsOrganizationInfo.unhealthyName = this.unhealthyName;
        this.qmsOrganizationInfo.remark = this.remark;
        this.qmsOrganizationInfo.compPkid = '';
        if (this.isUse) {
            this.qmsOrganizationInfo.isUse = '1';
        } else {
            this.qmsOrganizationInfo.isUse = '0';
        }

        // 判断是新增还是编辑  1：新增 0：编辑
        if (this.qfCreaUpda === '0') {
            this.qmsOrganizationInfo.id = this.qmsOrganizationInfos.id;
            this.qmsOrganizationInfo.makeTime = this.qmsOrganizationInfos.makeTime;
            this.qmsOrganizationInfo.makeUser = this.qmsOrganizationInfos.makeUser;
            this.subscribeToSaveResponse(this.organizationInfoService.update(this.qmsOrganizationInfo));
        } else {
            this.qmsOrganizationInfo.id = null;
            this.subscribeToSaveResponse(this.organizationInfoService.create(this.qmsOrganizationInfo));
        }

    }
    // 新增和编辑返回信息
    private subscribeToSaveResponse(result: Observable<HttpResponse<IQmsUnhealthy>>) {
        result.subscribe((res: HttpResponse<IQmsUnhealthy>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError(res));
    }
    /**
     * 更新或新增成功
     */
    private onSaveSuccess() {
        // this.router.navigate(['/']);
        this.clearInfo();
    }

    /**
     * 更新或新增失败
     */
    private onSaveError(res) {
        // 错误信息赋空
        this.msgs = [];
        // 判断返回错误信息
        if (res.error.title === 'codingDuplication') {
            // 打印错误信息
            this.msgs.push({ severity: 'error', summary: '提示', detail: '现象编码已存在请重新输入' });
        } else if (res.error.title === 'noParentInfo') {
            // 打印错误信息
            this.msgs.push({ severity: 'error', summary: '提示', detail: '上级现象不存在' });
        } else if (res.error.title === 'subordinateIsUser') {
            // 打印错误信息
            this.msgs.push({ severity: 'error', summary: '提示', detail: '下级存在有效条目，请先修改下级数据' });
        }

    }
    /**
     * 删除节点
     */
    deleteNode() {
        this.msgs = [];
        // 判断现象ID不能为空
        if (this.unhealthyCd === '') {
            this.msgs.push({ severity: 'error', summary: '提示', detail: '请选中需要删除的数据' });
            return false;
        }
        this.maskingLayer = true;
        this.messageService.clear();
        this.messageService.add({ key: 'c', sticky: true, severity: 'shibai', summary: '确认删除', detail: '你确定要删除不良现象' + this.unhealthyName + '吗？' });
    }

    /**
    * 删除确认
    */
    onConfirm() {
        this.messageService.clear('c');
        // 删除执行
        this.organizationInfoService.updateCarType(this.unhealthyCd).subscribe(data => {
            if (data === '0' || data === 0) {
                this.msgs.push({ severity: 'success', summary: '成功', detail: '删除成功' });
                this.clearInfo();
            } else if (data === '2' || data === 2) {
                this.msgs.push({ severity: 'error', summary: '失败', detail: '子节点存在生效信息，请先删除。' });
            } else {
                this.msgs.push({ severity: 'error', summary: '失败', detail: '删除失败' });
            }
            this.maskingLayer = false;

        })

    }
    /**
    * 删除取消
    */
    onReject() {
        this.maskingLayer = false;
        this.messageService.clear('c');
    }
    // 数据清空
    clearInfo() {
        // 现象编码付给上级现象
        this.parentCd = '';
        this.parentName = '';
        // 其余赋控制
        this.unhealthyCd = '';
        this.unhealthyName = '';
        this.remark = '';
        // 新增和编辑区分 1：新增 0：编辑
        this.qfCreaUpda = '1';
        if (this.unhealthyCd === '') {
            this.organizationCdQF = '';
        }
        // 清空选中
        this.selectedNode2 = null;
        this.isUse = false;
        // 复原添加判断
        this.addJudge = '0';
        this.loadAll();
    }
}
