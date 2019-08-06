import { Moment } from 'moment';

export interface IQmsMaterielSupplier {
    id?: number;
    materielId?: number;
    supplierId?: number;
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

export class QmsMaterielSupplier implements IQmsMaterielSupplier {
    constructor(
        public id?: number,
        public materielId?: number,
        public supplierId?: number,
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
