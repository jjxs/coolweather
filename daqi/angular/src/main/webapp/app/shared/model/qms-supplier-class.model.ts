import { Moment } from 'moment';

export interface IQmsSupplierClass {
    id?: number;
    suppkierClass?: string;
    suppkierClassName?: string;
    remark?: string;
    flagStatus?: string;
    compPkid?: string;
    reserveFirst?: string;
    reserveSecond?: string;
    reserveThird?: string;
    makeUser?: string;
    makeTime?: Moment;
    modifyUser?: string;
    modifyTime?: Moment;
}

export class QmsSupplierClass implements IQmsSupplierClass {
    constructor(
        public id?: number,
        public suppkierClass?: string,
        public suppkierClassName?: string,
        public remark?: string,
        public flagStatus?: string,
        public compPkid?: string,
        public reserveFirst?: string,
        public reserveSecond?: string,
        public reserveThird?: string,
        public makeUser?: string,
        public makeTime?: Moment,
        public modifyUser?: string,
        public modifyTime?: Moment
    ) {}
}
