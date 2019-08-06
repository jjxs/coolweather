import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';
import { HttpResponse } from '@angular/common/http';
import { IQmsEntryControlDetails } from 'app/shared/model/qms-entry-control-details.model';
import { IQmsMateriel } from 'app/shared/model/qms-materiel.model';
import { EntryControlDetailsInfoService } from './entry-control-detailsInfo.service';
import { Message } from 'primeng/components/common/api';

@Component({
    selector: 'jhi-entry-control-detailsInfo-delete-dialog',
    templateUrl: './entry-control-detailsInfo-delete-dialog.component.html'
})
export class EntryControlDetailsInfoDeleteDialogComponent {
    qmsEntryControlDetails: IQmsEntryControlDetails;
    // 消息初始化
    msgs: Message[] = [];
    materielName = '';
    constructor(
        private entryControlDetailsInfoService: EntryControlDetailsInfoService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager, private router: Router
    ) { }

    clear() {

        this.router.navigate(['/entry-control-detailsInfo']);
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.msgs = [];
        this.entryControlDetailsInfoService.delete(id).subscribe(data => {
            // 判断是否删除成功
            if (data.body === 1 || data.body === '1') {

                this.msgs.push({ severity: 'error', summary: '提示', detail: '该数据在采购检验结果表中存在，无法删除' });

                return false;
            }else if(data.body === 1 || data.body === '2') {
                this.msgs.push({ severity: 'error', summary: '提示', detail: '删除失败' });

                return false;
            }
            this.eventManager.broadcast({
                name: 'qmsEntryControlDetailsListModification',
                content: 'Deleted an qmsEntryControlDetails'
            });
            this.router.navigate(['/entry-control-detailsInfo']);
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-entry-control-detailsInfo-delete-popup',
    template: ''
})
export class EntryControlDetailsInfoDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router,private entryControlDetailsInfoService: EntryControlDetailsInfoService, private modalService: NgbModal) { }

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ qmsEntryControlDetails }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(EntryControlDetailsInfoDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                if (qmsEntryControlDetails.materielId !== null && qmsEntryControlDetails.materielId !== undefined) {
                    // 取得选中数据
                    this.entryControlDetailsInfoService.findMaterielName(qmsEntryControlDetails.materielId)
                        .subscribe((materielNameInfoBack: HttpResponse<IQmsMateriel>) => {
        
                            qmsEntryControlDetails.reserveFirst = materielNameInfoBack.body.materielName;
                            this.ngbModalRef.componentInstance.qmsEntryControlDetails = qmsEntryControlDetails;
        
                        });
                }
               
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate([{ outlets: { popup: null } }], { replaceUrl: true, queryParamsHandling: 'merge' });
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate([{ outlets: { popup: null } }], { replaceUrl: true, queryParamsHandling: 'merge' });
                        this.ngbModalRef = null;
                    }
                );
            }, 0);
        });
    }

    ngOnDestroy() {
        this.ngbModalRef = null;
    }
}
