import { Moment } from 'moment';

export interface IQmsBom {
    id?: number;
    vehicleId?: number;
    materielId?: number;
    parentMaterielID?: number;
    rootMaterielId?: number;
    sequence?: number;
    quantity?: number;
    isMust?: string;
    supplyType?: string;
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

export class QmsBom implements IQmsBom {
    constructor(
        public id?: number,
        public vehicleId?: number,
        public materielId?: number,
        public parentMaterielID?: number,
        public rootMaterielId?: number,
        public sequence?: number,
        public quantity?: number,
        public isMust?: string,
        public supplyType?: string,
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
