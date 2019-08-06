import { Moment } from 'moment';

export interface IQmsProduct {
    id?: number;
    productBatch?: string;
    productNum?: string;
    materielId?: number;
    productDiff?: string;
    isUse?: string;
    isOk?: string;
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

export class QmsProduct implements IQmsProduct {
    constructor(
        public id?: number,
        public productBatch?: string,
        public productNum?: string,
        public materielId?: number,
        public productDiff?: string,
        public isUse?: string,
        public isOk?: string,
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
