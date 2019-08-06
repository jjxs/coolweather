import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { IQmsMaterielType, QmsMaterielType } from 'app/shared/model/qms-materiel-type.model';
import { Principal } from 'app/core';

import { ITEMS_PER_PAGE } from 'app/shared';
import { MaterielTypeInfoService } from './materiel-type-info.service';
import { TreeNode } from 'primeng/api';
import { Observable } from 'rxjs';
import { Message } from 'primeng/components/common/api';
import { SelectItem } from 'primeng/api';
import { MessageService } from 'primeng/api';
@Component({
    selector: 'jhi-materiel-type-info',
    templateUrl: './materiel-type-info.component.html',
    styleUrls: ['materiel-type-info.scss'],
    providers: [MessageService]
})
export class MaterielTypeInfoComponent implements OnInit, OnDestroy {
    currentAccount: any;
    qmsOrganizationInfos: IQmsMaterielType;
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
    qmsOrganizationInfo: QmsMaterielType;
    // 模糊查询物料分类编码
    vagueOrganizationCd: String = '';
    // 模糊查询物料分类名称
    vagueOrganizationName: String = '';
    // 上级物料分类
    parentCd = '';
    // 上级物料分类名称
    parentName = '';
    // 物料分类编码
    materielTypeCd = '';
    // 物料分类名称
    materielTypeName = '';
    // 备注
    remark = '';
    // 区分
    organizationCdQF: String = '';
    // 区分增加修改
    qfCreaUpda: String = '1';
    // 消息初始化
    msgs: Message[] = [];
    // 物料分类属性下拉框值
    organAttri: SelectItem[];
    // 判断点击添加
    addJudge: String = '0';
    // 遮盖层
    maskingLayer: any = false;
    constructor(
        private materielTypeInfoService: MaterielTypeInfoService,
        private principal: Principal,
        private messageService: MessageService,
        private eventManager: JhiEventManager
    ) {
        this.itemsPerPage = ITEMS_PER_PAGE;
    }

    /**
     * 一览数据获取
     */
    loadAll() {

        const param: any = {
            'organizationCd': this.vagueOrganizationCd, 'organizationName': this.vagueOrganizationName
        };
        this.materielTypeInfoService
            .selectAllInfo(param)
            .subscribe(data => {
                this.files4 = data.qmsOrganization;
            });
    }

    /**
     * 初始化方法
     */
    ngOnInit() {
        this.cols = [
            { field: 'organizationName', header: '分类名称' }
        ];
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInQmsOrganizationInfos();
    }
    registerChangeInQmsOrganizationInfos() {
        this.eventSubscriber = this.eventManager.subscribe('MaterielTypeInfoListModification', response => this.loadAll());
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IQmsMaterielType) {
        return item.id;
    }

    /**
     * 选中行
     * @param event
     */
    nodeSelect(event) {
        // 取得选中数据
        this.materielTypeInfoService.find(event.node.data.id)
            .subscribe((organizationResponse: HttpResponse<IQmsMaterielType>) => {
                // 详细信息返回
                this.qmsOrganizationInfos = organizationResponse.body;
                // 上级物料分类赋值
                this.parentCd = this.qmsOrganizationInfos.parentCd;
                // 上级物料分类名称赋值
                this.parentName = this.qmsOrganizationInfos.compPkid;
                // 物料分类编码
                this.materielTypeCd = this.qmsOrganizationInfos.materielTypeCd;
                // 物料分类名称
                this.materielTypeName = this.qmsOrganizationInfos.materielTypeName;
                // 备注
                this.remark = this.qmsOrganizationInfos.remark;
                // 判断物料分类编码是否可编辑
                if (this.materielTypeCd !== '') {
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
        this.materielTypeCd = '';
        this.materielTypeName = '';
        this.remark = '';
        // 判断物料分类编码是否可以编辑
        if (this.materielTypeCd === '') {
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
        if (this.addJudge === '0' && this.materielTypeCd !== '' && this.materielTypeName !== '') {
            // 物料分类编码赋给上级物料分类
            this.parentCd = this.materielTypeCd;
            this.parentName = this.materielTypeName;
            this.addJudge = '1';
        }
        // 其余赋控制
        this.materielTypeCd = '';
        this.materielTypeName = '';
        this.remark = '';
        // 新增和编辑区分 1：新增 0：编辑
        this.qfCreaUpda = '1';
        if (this.materielTypeCd === '') {
            this.organizationCdQF = '';
        }
    }
    /**
     * 保存
     */
    save() {
        // alert(this.parentCd + '+' + this.organizationCd + '+' + this.organizationName + '+' + this.attribute + '+' + this.remark)
        this.msgs = [];
        // 判断物料分类ID不能为空
        if (this.materielTypeCd === '') {
            this.msgs.push({ severity: 'error', summary: '提示', detail: '物料分类编码不能为空' });
            return false;
        }
        // 判断物料分类名称不能为空
        if (this.materielTypeName === '') {
            this.msgs.push({ severity: 'error', summary: '提示', detail: '物料分类名称不能为空' });
            return false;
        }

        // this.qmsOrganizationInfo = this.qmsOrganizationInfos
        this.qmsOrganizationInfo = new QmsMaterielType;
        // 赋值给数据集合
        this.qmsOrganizationInfo.parentCd = this.parentCd;
        this.qmsOrganizationInfo.materielTypeCd = this.materielTypeCd;
        this.qmsOrganizationInfo.materielTypeName = this.materielTypeName;
        this.qmsOrganizationInfo.remark = this.remark;
        this.qmsOrganizationInfo.compPkid = '';

        // 判断是新增还是编辑  1：新增 0：编辑
        if (this.qfCreaUpda === '0') {
            this.qmsOrganizationInfo.id = this.qmsOrganizationInfos.id;
            this.qmsOrganizationInfo.makeTime = this.qmsOrganizationInfos.makeTime;
            this.qmsOrganizationInfo.makeUser = this.qmsOrganizationInfos.makeUser;
            this.subscribeToSaveResponse(this.materielTypeInfoService.update(this.qmsOrganizationInfo));
        } else {
            this.qmsOrganizationInfo.id = null;
            this.subscribeToSaveResponse(this.materielTypeInfoService.create(this.qmsOrganizationInfo));
        }

    }
    // 新增和编辑返回信息
    private subscribeToSaveResponse(result: Observable<HttpResponse<IQmsMaterielType>>) {
        result.subscribe((res: HttpResponse<IQmsMaterielType>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError(res));
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
            this.msgs.push({ severity: 'error', summary: '提示', detail: '物料分类编码已存在请重新输入' });
        } else if (res.error.title === 'noParentInfo') {
            // 打印错误信息
            this.msgs.push({ severity: 'error', summary: '提示', detail: '上级分类不存在' });
        }

    }
    /**
     * 删除节点
     */
    deleteNode() {

        this.msgs = [];
        // 判断现象ID不能为空
        if (this.materielTypeCd === '') {
            this.msgs.push({ severity: 'error', summary: '提示', detail: '请选中需要删除的数据' });
            return false;
        }
        this.maskingLayer = true;
        this.messageService.clear();
        this.messageService.add({ key: 'c', sticky: true, severity: 'shibai', summary: '删除提示', detail: '你确定要删除物料分类' + this.materielTypeName + '吗？' });
       
    }

    /**
    * 删除确认
    */
    onConfirm() {
        this.messageService.clear('c');
        this.materielTypeInfoService.updateCarType(this.materielTypeCd).subscribe(data => {
            if (data === '0' || data === 0) {
                this.msgs.push({ severity: 'success', summary: '成功', detail: '删除成功' });
            } else {
                this.msgs.push({ severity: 'error', summary: '失败', detail: '删除失败' });
            }
            this.maskingLayer = false;
            this.clearInfo();
        })
    }
    /**
     * 删除取消
     */
    onReject() {
        this.maskingLayer = false;
        this.messageService.clear('c');
    }

    /**
     * 导入
     */
    ImportCSV() {
        document.getElementById('file').click();
    }
    /**
     * 文件上传
     * @param event 
     */
    upload(event: any) {
        // 如果没有文件上传则返回
        if (event.target.files.length === 0) {

            return;
        } else {
            this.materielTypeInfoService.importExcelFile('/upload', event.target.files).subscribe(
                data => {
                    if (data.status === 'success') {
                        if (data.flag === '0') {
                            this.msgs.push({ severity: 'success', summary: '成功', detail: data.message });
                        } else {
                            this.msgs.push({ severity: 'success', summary: '成功', detail: data.message });
                            for (let f = 0; f < data.message.length; f++) {
                                this.msgs.push({ severity: 'error', summary: '', detail: data.message[f] });
                            }
                        }

                    } else {
                        this.msgs.push({ severity: 'error', summary: 'error', detail: data.message });
                    }
                    // 清空excel
                    event.target.value = '';
                    this.clearInfo();
                },
                error => {
                    // 清空excel
                    event.target.value = '';
                }
            );
        }
    }
    // 数据清空
    clearInfo() {
        // 物料分类编码付给上级物料分类
        this.parentCd = '';
        this.parentName = '';
        // 其余赋控制
        this.materielTypeCd = '';
        this.materielTypeName = '';
        this.remark = '';
        // 新增和编辑区分 1：新增 0：编辑
        this.qfCreaUpda = '1';
        if (this.materielTypeCd === '') {
            this.organizationCdQF = '';
        }
        // 清空选中
        this.selectedNode2 = null;
        // 复原添加判断
        this.addJudge = '0';
        this.loadAll();
    }
}
