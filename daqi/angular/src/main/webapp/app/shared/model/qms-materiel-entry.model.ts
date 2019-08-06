import { Moment } from 'moment';

export interface IQmsMaterielEntry {
    id?: number;
    materielEntryCd?: string;
    materielId?: number;
    specificationType?: string;
    figureNumber?: string;
    packingQuantity?: number;
    supplierId?: number;
    entryQuantity?: number;
    entryType?: string;
    purchaseOrderNumber?: string;
    batchNumber?: string;
    isUse?: string;
    madeYmd?: string;
    madeFactoryCd?: string;
    texTure?: string;
    castingNum?: string;
    entryDate?: Moment;
    flagInspect?: string;
    inspectionTime?: Moment;
    inspectionCompletedTime?: Moment;
    inspectionUserId?: number;
    flagStatus?: string;
    compPkid?: string;
    remark?: string;
    reserveFirst?: string;
    reserveSecond?: string;
    reserveThird?: string;
    makeUser?: string;
    makeTime?: Moment;
    modifyUser?: string;
    modifyTime?: Moment;
}

export class QmsMaterielEntry implements IQmsMaterielEntry {
    constructor(
        public id?: number,
        public materielEntryCd?: string,
        public materielId?: number,
        public specificationType?: string,
        public figureNumber?: string,
        public packingQuantity?: number,
        public supplierId?: number,
        public entryQuantity?: number,
        public entryType?: string,
        public purchaseOrderNumber?: string,
        public batchNumber?: string,
        public isUse?: string,
        public madeYmd?: string,
        public madeFactoryCd?: string,
        public texTure?: string,
        public castingNum?: string,
        public entryDate?: Moment,
        public flagInspect?: string,
        public inspectionTime?: Moment,
        public inspectionCompletedTime?: Moment,
        public inspectionUserId?: number,
        public flagStatus?: string,
        public compPkid?: string,
        public remark?: string,
        public reserveFirst?: string,
        public reserveSecond?: string,
        public reserveThird?: string,
        public makeUser?: string,
        public makeTime?: Moment,
        public modifyUser?: string,
        public modifyTime?: Moment
    ) {}
}
