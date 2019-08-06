import { Moment } from 'moment';

export interface IQmsMaterielDetailsPopup {
    id?: number;
    entryId?: number;
    goodsCd?: string;
    madeFactoryCd?: string;
    madeYMD?: string;
    entryQuantity?: number;
    entryType?: string;
    materielCd?: string;
    materielName?: string;
    supplierCd?: string;
    supplierName?: string;
    makeUser?: string;
    makeTime?: Moment;
    modifyUser?: string;
    modifyTime?: Moment;
}

export class QmsMaterielDetailsPopup implements IQmsMaterielDetailsPopup {
    constructor(
        public id?: number,
        public entryId?: number,
        public goodsCd?: string,
        public madeFactoryCd?: string,
        public madeYMD?: string,
        public entryQuantity?: number,
        public entryType?: string,
        public materielCd?: string,
        public materielName?: string,
        public supplierCd?: string,
        public supplierName?: string,
        public makeUser?: string,
        public makeTime?: Moment,
        public modifyUser?: string,
        public modifyTime?: Moment
    ) {}
}
