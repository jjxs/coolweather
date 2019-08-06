import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { IQmsDefect, QmsDefect } from 'app/shared/model/qms-defect.model';
import { IQmsUnhealthy, QmsUnhealthy } from 'app/shared/model/qms-unhealthy.model';
import { Principal } from 'app/core';

import { ITEMS_PER_PAGE } from 'app/shared';
import { DefectInformationService } from './defect-information.service';
import { TreeNode } from 'primeng/api';
import { Observable } from 'rxjs';
import { Message } from 'primeng/components/common/api';
import { SelectItem } from 'primeng/api';
import { MessageService } from 'primeng/api';

@Component({
    selector: 'jhi-defect-information',
    templateUrl: './defect-information.component.html',
    styleUrls: ['defect-information.scss'],
    providers: [MessageService]
})
export class DefectInformationComponent implements OnInit, OnDestroy {
    currentAccount: any;
    qmsOrganizationInfos: IQmsDefect;
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
    qmsOrganizationInfo: QmsDefect;
    // 模糊查询缺陷编码
    vagueOrganizationCd: String = '';
    // 模糊查询缺陷名称
    vagueOrganizationName: String = '';
    // 上级现象
    parentCd = '';
    // 上级现象名称
    parentName = '';
    // 缺陷编码
    defectCd = '';
    // 缺陷名称
    defectName = '';
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
    // 缺陷属性下拉框值
    organAttri: SelectItem[];
    // 判断点击添加
    addJudge: String = '0';
    // 遮盖层
    maskingLayer: any = false;
    constructor(
        private defectInformationService: DefectInformationService,
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
        this.defectInformationService
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
            { field: 'organizationName', header: '缺陷名称' }
        ];
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInQmsOrganizationInfos();
    }
    registerChangeInQmsOrganizationInfos() {
        this.eventSubscriber = this.eventManager.subscribe('qmsDefectListModification', response => this.loadAll());
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: QmsDefect) {
        return item.id;
    }

    /**
     * 选中行
     * @param event
     */
    nodeSelect(event) {
        // 取得选中数据
        this.defectInformationService.find(event.node.data.id)
            .subscribe((organizationResponse: HttpResponse<IQmsDefect>) => {
                // 详细信息返回
                this.qmsOrganizationInfos = organizationResponse.body;
                // 上级缺陷赋值
                this.parentCd = this.qmsOrganizationInfos.parentCd;
                // 上级缺陷名称赋值
                this.parentName = this.qmsOrganizationInfos.compPkid;
                // 缺陷编码
                this.defectCd = this.qmsOrganizationInfos.defectCd;
                // 缺陷名称
                this.defectName = this.qmsOrganizationInfos.defectName;

                // 生效
                if (this.qmsOrganizationInfos.isUse === '1') {
                    this.isUse = true;
                } else {
                    this.isUse = false;
                }
                // 备注
                this.remark = this.qmsOrganizationInfos.remark;
                // 判断缺陷编码是否可编辑
                if (this.defectCd !== '') {
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
        // alert(event.node.data.name);
        // 数据清空
        this.parentCd = '';
        this.parentName = '';
        this.defectCd = '';
        this.isUse = false;
        this.defectName = '';
        this.remark = '';
        // 判断缺陷编码是否可以编辑
        if (this.defectCd === '') {
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

        if (this.addJudge === '0' && this.defectCd !== '' && this.defectName !== '') {
            // 缺陷编码赋给上级缺陷
            this.parentCd = this.defectCd;
            this.parentName = this.defectName;
            this.addJudge = '1';
        }
        // 其余赋控制
        this.defectCd = '';
        this.isUse = false;
        this.defectName = '';
        this.remark = '';
        // 新增和编辑区分 1：新增 0：编辑
        this.qfCreaUpda = '1';
        if (this.defectCd === '') {
            this.organizationCdQF = '';
        }
    }
    /**
     * 保存
     */
    save() {
        // alert(this.parentCd + '+' + this.organizationCd + '+' + this.organizationName + '+' + this.attribute + '+' + this.remark)
        this.msgs = [];
        // 判断现象ID不能为空
        if (this.defectCd === '') {
            this.msgs.push({ severity: 'error', summary: '提示', detail: '现象编码不能为空' });
            return false;
        }
        // 判断现象名称不能为空
        if (this.defectName === '') {
            this.msgs.push({ severity: 'error', summary: '提示', detail: '缺陷名称不能为空' });
            return false;
        }
        // this.qmsOrganizationInfo = this.qmsOrganizationInfos
        this.qmsOrganizationInfo = new QmsUnhealthy;
        // 赋值给数据集合
        this.qmsOrganizationInfo.parentCd = this.parentCd;
        this.qmsOrganizationInfo.defectCd = this.defectCd;
        this.qmsOrganizationInfo.defectName = this.defectName;
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
            this.subscribeToSaveResponse(this.defectInformationService.update(this.qmsOrganizationInfo));
        } else {
            this.qmsOrganizationInfo.id = null;
            this.subscribeToSaveResponse(this.defectInformationService.create(this.qmsOrganizationInfo));
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
            this.msgs.push({ severity: 'error', summary: '提示', detail: '缺陷编码已存在请重新输入' });
        } else if (res.error.title === 'noParentInfo') {
            // 打印错误信息
            this.msgs.push({ severity: 'error', summary: '提示', detail: '上级缺陷不存在' });
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
        if (this.defectCd === '') {
            this.msgs.push({ severity: 'error', summary: '提示', detail: '请选中需要删除的数据' });
            return false;
        }

        this.maskingLayer = true;
        this.messageService.clear();
        this.messageService.add({ key: 'c', sticky: true, severity: 'shibai', summary: '删除提示', detail: '你确定要删除缺陷 ' + this.defectName + '吗？' });
    }

    /**
    * 删除确认
    */
    onConfirm() {
        this.messageService.clear('c');
        // 删除执行
        this.defectInformationService.updateCarType(this.defectCd).subscribe(data => {
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
        // 缺陷编码付给上级缺陷
        this.parentCd = '';
        this.parentName = '';
        // 其余赋控制
        this.defectCd = '';
        this.defectName = '';
        this.remark = '';
        // 新增和编辑区分 1：新增 0：编辑
        this.qfCreaUpda = '1';
        if (this.defectCd === '') {
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
