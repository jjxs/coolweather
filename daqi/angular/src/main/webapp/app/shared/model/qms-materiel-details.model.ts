import { Moment } from 'moment';

export interface IQmsMaterielDetails {
    id?: number;
    entryId?: number;
    goodsCd?: string;
    flagInspect?: string;
    isCheckOk?: string;
    goodsQuantity?: number;
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

export class QmsMaterielDetails implements IQmsMaterielDetails {
    constructor(
        public id?: number,
        public entryId?: number,
        public goodsCd?: string,
        public flagInspect?: string,
        public isCheckOk?: string,
        public goodsQuantity?: number,
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
